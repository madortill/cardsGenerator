<template>
  <div id="Secondary">
    <div class="flex">
      <span class="minus" @click="deleteSecondary(pathArray)" title="מחק תת-נושא"></span>
      <CustomInput class="secondary-name" placeholder="הכניסו תת-נושא" :placeholderStyle="{ color: '#ffffffC7' }"
      :path-array="pathArray"></CustomInput>
    </div>
        <DragToOrder
          :modelValue="topicArr"
          @update:modelValue="onDrop"
          dragClass="dragged"
          handle=".drag"
          class="overflow-container scrollStyle"
          dragCursor="grabbing"
          ref="overflowContainer"
          isHorizontal
          :key="'dragDrop' + dragNDropRender"
          >
          <template #item="{index, item}">
            <card :pathArray="[...pathArray, 'topics', item.id]" @card-deleted="reRenderDrag()"/>
          </template>

        <template #footer>
          <DropDownCard @add-page="createNewCard" :key="'dropdown' + reRenderCounter" btnText="הוספת כרטיסיה"></DropDownCard>
        </template>
        </DragToOrder>
      <!-- <card v-for="(topicObj, index) in topicArr" :key="index" :pathArray="[...pathArray, 'topics', index]"
        :isQuestion="false" @delete-card="deleteCard(topicObj)"/> -->
  </div>
</template>

<script>
import CardSvg from "./svg/CardSvg.vue";
import DropDownCard from "./DropDownCard.vue";
import card from "./Card.vue";
import CustomInput from "./CustomInput.vue";
import DragToOrder from "./DragToOrder.vue"
import { useDataStore } from '../stores/data';
import { mapActions, mapState } from 'pinia';

export default {
  components: { CardSvg, DropDownCard, card, CustomInput, DragToOrder},
  name: "Secondary",
  data() {
    return {
      showErrorMessage: false,
      dragNDropRender: 0,
      reRenderCounter: 0,
      smoothScroll: false,
      list: [
      { "name": "4", "error": "", "pageArray": [{ "cardType": "text", "content": "fsad" }] }, 
      { "name": "3", "error": "", "pageArray": [{ "cardType": "picAndText", "content": "", "pic": "" }] },
      { "name": "23", "error": "", "pageArray": [{ "cardType": "picAndText", "content": "", "pic": "" }] }
      ]
    }
  },
  props: ["pathArray"],
  methods: {
    ...mapActions(useDataStore, ["deleteItem", "getNestedItem","setNestedItem" ,"addItem"]),
    createNewCard(choice) {
      let newCard = {
        "name": "",
        "error": "",
        "pageArray": [
          {
            cardType: choice,
            content: "",
          }
        ]
      }

      switch (choice) {
        case ("youtube"): {
          newCard.pageArray[0].youtube = "";
          break;
        } case ("videoAndText"): {
          newCard.pageArray[0].video = "";
          break;
        } case ("picAndText"): {
          newCard.pageArray[0].pic = "";
          break;
        }
      }
      this.addItem([...this.pathArray, 'topics'], newCard)
      this.reRenderCounter++;
      this.scrollToHorizontalEnd();
    },
    /* swipes and scrolls */
    async scrollToHorizontalEnd() {
      await this.reRenderDrag();
      this.smoothScroll = true;
      await this.$nextTick();
      this.$refs.overflowContainer.$el.scrollLeft = -this.$refs.overflowContainer.$el.scrollWidth;
      this.smoothScroll = false;
    },
    handleSwipe(direction, event) {
      let pixelsToMove = direction === "right" ? 600 : -600;
      event.currentTarget.scrollLeft = event.currentTarget.scrollLeft - pixelsToMove;
    },
    /* shows delete popup and if the user says yes, deletes the secondary */
    deleteSecondary() {
      swal({
        icon: "warning",
        title: `בטוחים שאתם רוצים למחוק? כל מה שכתבתם בתת הנושא "${this.getNestedItem([...this.pathArray, "name"])}" יימחק!`,
        buttons: { cancel: "לבטל", confirm: "למחוק" },
        dangerMode: true,
        className: "swal-font",
      })
        .then((willDelete) => {
          if (willDelete) {
            this.deleteItem(this.pathArray);
          }
        });
    },
    onDrop(value) {
      this.setNestedItem(value, [...this.pathArray,'topics']); 
      this.reRenderDrag();

    },
    async reRenderDrag() {
      const scrolled = this.$refs.overflowContainer.$el.scrollLeft;
      this.dragNDropRender++;
      await this.$nextTick();
      this.$refs.overflowContainer.$el.scrollLeft = scrolled;
    }
  },
  computed: {
    topicArr() {
        return this.getNestedItem([...this.pathArray, "topics"]);  
    },
    ...mapState(useDataStore, {theme: "THEME"}),
  },
} 
</script>
<style scoped>
.flex {
  display: flex;
  width: 19rem;
  align-items: center;
  gap: 0.5rem;
}

.minus,
.secondary-name {
  color: white;
  font-size: 1.4rem;
  width: 17rem;
  outline: none;
  border: white solid 1px;
}

.minus {
  border-radius: 50%;
  position: relative;
  /* padding: 0.1rem 1rem; */
  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
}

.minus::before {
  content: '';
  width: 0.2rem;
  position: absolute;
  background: #fff;
  border-radius: 2px;
  height: 50%;
  transform: rotate(90deg);
  outline: none;
  top: 29%;
  left: 45%;
}

.secondary-name {
  background-color: transparent;
  /* border: none; */
  box-sizing: border-box;
  padding: 0.2rem;
  display: inline-block;
  border-radius: 0.3rem;
  flex-grow: 1;
}

.error-message-position {
  right: 11.5rem;
}

.triangle-position {
  right: 5.5rem;
}

.overflow-container {
  width: 80vw;
  /* overflow-x: auto; */
  overflow-y: hidden;
  height: 31rem;
  margin-bottom: 1rem;
  scroll-behavior: v-bind("smoothScroll ? 'smooth' : 'auto'");
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
}


::-webkit-scrollbar:horizontal {
  height: 7px;
}

.ignore {
  display: contents;
}

/* DO NOT DELETE! This is the styles you want to apply to the elemnet while it's being dragged.
class. If you want costume name for dragClass replace styledDragging with the class name. */
div:deep(.dragged) {
  position: relative;
  bottom: 0.5rem;
}
</style>