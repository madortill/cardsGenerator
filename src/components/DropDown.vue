<template>
    <div>
        <div id="choose-btn" class="dropdown-btn" @click="toggleOptions"> {{ chosenOption }} <svg :class= "[arrowDirection, 'triangle', 'arrow']"> <!-- Add arrow --></svg></div>
        <div class="options-container" v-show="showOptions">
            <div class="disabled dropdown-btn option" v-show="placeholder"> {{ placeholder }}</div>
            <div v-for="(value, key) in optionList" :key="key" @click="choosenOption" class="option dropdown-btn" :data-proper-name="key"> {{ value }}</div>
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
            arrowDirection: "up-triangle"
        }
    },
    props: {
        // list of all the options as array or object when the key is the what we want to return and the value is what is appears on screen.
        "optionList": 
                {type: [Array, Object],
                    required: true,
                },
            "placeholder": String
        },
    methods: {
        toggleOptions () {
            this.showOptions = !this.showOptions;
            this.arrowDirection === "up-triangle" ? this.arrowDirection = "down-triangle" : this.arrowDirection = "up-triangle";
        },
        choosenOption (event) {
            this.toggleOptions();
            this.chosenOption = event.currentTarget.innerHTML;
            console.log(typeof(this.optionList))
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
}

.dropdown-btn {
    min-width: 16rem;
    min-height: 3rem;
    border-radius: 0.7rem;
}

.options-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: absolute;
    background-color: white;
}

.option {
    background-color: white;
}

.triangle {
    --triangle-size: 0.5rem;
    width: 0;
    height: 0;
}
.up-triangle {
    border-top: solid black calc(var(--triangle-size) * 49.4/28.5);
    border-left: solid transparent var(--triangle-size);
    border-bottom: solid transparent 0;
    border-right: solid transparent var(--triangle-size);
    line-height: 0px;
}
.down-triangle {
    border-top: solid transparent 0;
    border-left: solid transparent var(--triangle-size);
    border-bottom: solid black calc(var(--triangle-size) * 49.4/28.5);
    border-right: solid transparent var(--triangle-size);
    line-height: 0px;
}

.arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 01rem;
}
</style>