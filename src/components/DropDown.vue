<template>
    <div id="DropDown">
        <div id="choose-btn" class="dropdown-btn" @click="toggleOptions"> <span>{{ chosenOption }}</span> <svg :class= "[arrowDirection, 'triangle', 'arrow']"></svg></div>
        <div class="options-container" v-show="showOptions">
            <div class="disabled option" v-show="placeholder"> {{ placeholder }}</div>
            <div v-for="(value, key) in optionList" :key="key" @click="choosenOption" class="option" :data-proper-name="key"> {{ value }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "dropdown",
    data() {
        return {
            showOptions: false,
            chosenOption: this.placeholder,
            arrowDirection: "down-triangle"
        }
    },
    props: {
        // list of all the options as array or object when the key is the what we want to return and the value is what is appears on screen.
        "optionList": 
                {type: [Array, Object],
                    required: true,
                },
            "placeholder": String,
        },
    methods: {
        toggleOptions () {
            this.showOptions = !this.showOptions;
            this.arrowDirection === "down-triangle" ? this.arrowDirection = "up-triangle" : this.arrowDirection = "down-triangle";
        },
        choosenOption (event) {
            this.toggleOptions();
            this.chosenOption = event.currentTarget.innerHTML;
            this.$emit("choice", typeof(this.optionList) === "object" ? event.currentTarget.dataset.properName: event.currentTarget.innerHTML)
        }
    },
    emits: ["choice"]
}
</script>

<style scoped>
#choose-btn {
    border: solid black 2px;
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding-right: 1rem;
    padding-left: 1rem;
    border-radius: 0.7rem;
}

#choose-btn span{
    /* truncate */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.dropdown-btn {
    width: 15rem;
    min-height: 3rem;
}

.options-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 0.7rem;
    position: absolute;
    background-color: white;
    border: solid black 2px;
    border-radius: 0.7rem;
    margin-top: 0.5rem;
    padding: 0.4rem 0;
}

.option {
    color: rgb(59, 58, 58);
    font-size: 0.9em;
    height: fit-content;
    width: 17rem;
    cursor: pointer;
}

.triangle {
    --triangle-size: 0.5rem;
    width: 0;
    height: 0;
}
.down-triangle {
    border-top: solid black calc(var(--triangle-size) * 49.4/28.5);
    border-left: solid transparent var(--triangle-size);
    border-bottom: solid transparent 0;
    border-right: solid transparent var(--triangle-size);
    line-height: 0px;
}
.up-triangle {
    border-top: solid transparent 0;
    border-left: solid transparent var(--triangle-size);
    border-bottom: solid black calc(var(--triangle-size) * 49.4/28.5);
    border-right: solid transparent var(--triangle-size);
    line-height: 0px;
}

.arrow {
    margin-right: auto;
}
</style>