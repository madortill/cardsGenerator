

<template>
    <component :is="tag" class="list" ref="list">
        <slot name="header"></slot>
        <div v-for="(item, index) in items" :key="item.id" class="draggable" :data-index="index" @mousedown="dragStart" @mouseover="dragOver">
            <slot name="item" :item="item" :index="index">
                {{ item.name }}
            </slot>
        </div>
        <slot name="footer"></slot>
    </component>
</template>

<script>
export default {
    data() {
        return {
            draggedEl: null,
            startPos: {},
            maxScroll: null,
            items: this.modelValue.map((item, index) => ({ "name": item, "id": index }))
        }
    },
    props: {
        "modelValue": Array,
        "tag": {
            type: String,
            default: "div",
            validator(value, props) {
                // The value must match one of these strings
                return value
            }
        },
        //  CSS selector for the handle
        "handle": {
            type: String,
            default: null,
        },
        "isHorizontal": Boolean,
        "blockOutOfBoundery": Boolean,
        "dragClass": {
            type: String,
            default: 'styledDragging'
        },
        "dragCursor": String
    },
    emits: ['update:modelValue'],
    methods: {
        /* mousedown */
        dragStart(event) {
            if ((this.handle && event.target.matches(this.handle)) || !this.handle) {
                this.draggedEl = event.currentTarget;
                this.draggedEl.classList.add('dragging');
                // Selecting the child because the child of draggedEl is the first element we get in the slot 
                // (from the father component)
                this.draggedEl.querySelector(':first-child').classList.add(this.dragClass);
                this.startPos.x = event.clientX;
                this.startPos.y = event.clientY;
                this.maxScroll = this.isHorizontal ? this.$refs.list.scrollWidth : this.$refs.list.scrollHeight;
                console.log(this.$refs.list);
                document.addEventListener('mousemove', this.drag);
                document.addEventListener('mouseup', this.drop);
            }
        },
        /* mousemove */
        dragOver(event) {
            if (this.draggedEl && event.currentTarget.classList.contains('draggable') && !event.currentTarget.classList.contains('.dragging')) {
                const old_index = this.draggedEl.dataset.index;
                const new_index = event.currentTarget.dataset.index;
                let boundingEl;
                if (event.currentTarget.querySelector(this.handle)) {
                    boundingEl = event.currentTarget.querySelector(this.handle);
                } else {
                    boundingEl = event.currentTarget;
                }
                const targetElRect = boundingEl.getBoundingClientRect()
                if (old_index !== new_index) {
                    this.startPos.x = targetElRect.left + 0.5 * targetElRect.width;
                    this.startPos.y = targetElRect.top + 0.5 * targetElRect.height;
                    /* splice returns the items it removes, so we remove the item at the old index and use the
                     returned value to insert it in the new index */
                    this.items.splice(new_index, 0, this.items.splice(old_index, 1)[0]);
                }
            }

        },
        drag(event) {
            this.emulateMouseOver(event);

            const listBoundaries = this.$refs.list.getBoundingClientRect();
            const dragElBounderies = this.draggedEl.getBoundingClientRect();

            // scroll the parent element if the mouse is out of the parent element
            if (this.isHorizontal) {
                if (event.clientX < listBoundaries.left) {
                    this.startPos.x = listBoundaries.left - 2; 
                    this.$refs.list.scrollLeft = Math.max(this.$refs.list.scrollLeft + event.clientX - listBoundaries.left, -this.maxScroll);
                } else if (event.clientX > listBoundaries.right) {
                    this.$refs.list.scrollLeft = Math.min(this.$refs.list.scrollLeft + (event.clientX - listBoundaries.right), 0);
                }
            } else {
                console.warn('scrolling out of bounds does not work on vertical mode yet')
            }
            
            // if draggedEl is out of bounderies, don't let it move
            // checking that both the mouse and the element are out of .list
            console.log(event.clientX - this.startPos.x)
            if (this.isHorizontal) {
                if (dragElBounderies.left <= listBoundaries.left && event.clientX < listBoundaries.left) {
                    return
                } else if (dragElBounderies.right >= listBoundaries.right && this.$refs.list.scrollLeft === 0 && event.clientX > dragElBounderies.right){
                    return
                }
            }
            
            // move the draaged element to the position of the mouse in the axis of the list
            
            if (this.isHorizontal) {
                this.draggedEl.style.transform = `translateX(${this.clamp(this.startPos.x - listBoundaries.left, event.clientX - this.startPos.x, this.startPos.x - listBoundaries.right)}px)`;
                this.draggedEl.style.transform = `translateX(${event.clientX - this.startPos.x}px)`;
            } else {
                this.draggedEl.style.transform = `translateY(${event.clientY - this.startPos.y}px)`;
            }
        },
        /* called by drag() */
        /* emulate mouseOver event over draggable elements (in case the mouse is outside of .list) */
        emulateMouseOver(event) {
            //  if the mouse in over .list, no need to emulate event
            if (this.$refs.list.matches(':hover')) {
                return
            }

            let yValue;
            let xValue;
            if (this.isHorizontal) {
                yValue = document.querySelector('.draggable:not(.dragging)').getBoundingClientRect().top;
                xValue = event.clientX;
            } else {
                yValue = event.clientY;
                xValue = document.querySelector('.draggable:not(.dragging)').getBoundingClientRect().left;
            }
            // dispatch the newEvent on the element in the right place
            if (document.elementFromPoint(xValue, yValue)) {
                const mouseOverEvent = new MouseEvent("mouseover", {
                    clientX: xValue,
                    clientY: yValue,
                    bubbles: true
                });
                document.elementFromPoint(xValue, yValue).dispatchEvent(mouseOverEvent);
            }
        },
        /* mouseup */
        // resets all necessary variables
        drop() {
            if (this.draggedEl) {
                this.draggedEl.classList.remove('dragging');
                this.draggedEl.querySelector(':first-child').classList.remove(this.dragClass);
                this.draggedEl.style.transform = '';
                this.draggedEl = null;
                this.startPos.x = null;
                this.startPos.y = null;
                this.maxScroll = null;
                document.removeEventListener('mousemove', this.drag);
                document.removeEventListener('mouseup', this.drop);
                // return items back to array of items and not array of objects
                const updatedArr = this.items.map((item) => item.name);
                this.$emit('update:modelValue', updatedArr);
            }
        },
        clamp(min, val, max) {
            if (val > max) {
                return max;
            } else if (val < min) {
                return min;
            } else if (val > min && val < max) {
                return val
            }
        }
    },
    mounted() {
        if (this.$slots["item"] === undefined) {
            throw new Error(`could not find template that matches 'item' slot in DragToOrder.vue`);
        }
    },
}
</script>

<style scoped>

/* styles on dragging */
.dragging {
    position: relative;
    z-index: 10;
    pointer-events: none;
}

/* dragging has pointer-events none so we change the cursor on the list, 
if it has element with the class dragging inside */
.list:has(.dragging) {
    cursor: v-bind("dragCursor || 'default'");
}

/*  defualt style when dragging */
.styledDragging {
    bottom: v-bind("isHorizontal ? '0.3rem' : '0'");
    left: v-bind("!isHorizontal ? '0.3rem' : '0'");
}
</style>
