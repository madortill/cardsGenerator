<template>
    <div id="DropDownCard">
        <div class="black-screen" v-if="cancelable"></div>
        <div :class="['card', cancelable ? 'dropdown': '']">
            <CloseBtnSvg :color="theme.themeColor.textColor" class="close-btn" @click="$emit('cancel')" v-if="cancelable"></CloseBtnSvg>
            <CardSvg :color="theme.themeColor.secondaryColor"></CardSvg>
            <div>איזו כרטיסיה תרצו להוסיף?</div>
            <DropDown @choice="saveChoice"
                :optionList="{ 'videoAndText': 'וידיאו מהמחשב', 'youtube': 'וידיאו מהיוטיוב', 'text': 'טקסט', 'picAndText': 'תמונה וכיתוב' }"></DropDown>
            <div>
                <div :class="['button', 'btn-bg', choice ? '' : 'disabled']" @click="$emit('add-page', choice)" id="add-page" v-show="choice || cancelable">{{ btnText }}</div>
                <div class="button" @click="$emit('cancel')" id="cancel" v-if="cancelable">ביטול הוספה</div>
            </div>
        </div>
    </div>
</template>

<script>
import DropDown from "./DropDown.vue";
import CardSvg from "./svg/CardSvg.vue";
import CloseBtnSvg from "./svg/CloseBtnSvg.vue";
import { theme } from '../store.js';

export default {
    name: "DropDownCard",
    components: { DropDown, CardSvg, CloseBtnSvg },
    props: {"cancelable": Boolean, btnText: {type: String, default: "הוספת עמוד"}},
    emits: ['cancel', 'add-page'],
    data() {
        return {
            theme,
            choice: ""
        }
    },
    methods: {
        saveChoice(cardType) {
            this.choice = cardType;
        },
    }
}
</script>

<style scoped>
.card {
  box-sizing: border-box;
  position: relative;
  display: grid;
  align-content: center;
  justify-content: center;  
  align-items: center;
  gap: 1rem;
  height: 29.2rem;
  width: 20rem;
  font-size: 1.6rem;
  text-align: center;
  padding-left: 4%;
  padding-top: 6%;
}


.button {
  color: black;
    border: black solid 0.1rem;
    border-radius: 0.7rem;
    padding: 0.5rem 1.5rem;
    margin: 1rem 1rem;
    cursor: pointer;
}

.black-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.767);
  z-index: 2;
  /* pointer-events: none; */
  cursor: default;
}

.btn-bg {
  background: v-bind("theme.themeColor.secondaryColor");
}

.dropdown {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
}

.disabled {
    background-color: #a6a6a6;
    cursor: default;
    pointer-events: none;
}

.close-btn {
  max-width: 7%;
  position: relative;
  margin: 0;
  top: -6%;
  left: 38%;
  cursor: pointer;
  z-index: 99;
}
</style>