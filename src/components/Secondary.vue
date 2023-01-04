<template>
  <div>
    <span class="arrow">></span>
    <input class="secondary-name" type="text" placeholder="הכניסו תת-נושא" @focus="inputFocus" @focusout="inputFocus" @input="checkValidity" v-model="secondary">
      <div class="error-message error-message-position" ref="errorMessage">
        <div class="up-error-triangle triangle-position"></div>
        <div class="message">
          <img src="@/assets/colorNeutralAssets/triangle-warning.svg" alt = "warning symbol" class="warning"/>
          <span class="text">יש למלא את השדה</span>
        </div>
      </div>
      <div class="overflow-container scrollStyle" @mousedown="detectSwipe" ref="overflowContainer" @wheel="wheel">
        <div class="cards-container">
          <!-- <div v-for="(cardsArray, topic) in secondaryData" :key="topic"> -->
            <card v-for="(pageArray, topic) in secondaryData" :key="topic" :topic="topic" :pageArray="pageArray" :isQuestion="false" :theme = "theme"></card>
          <!-- </div> -->
          <div class="add-card-button">
            <CardSvg :color="theme.secondaryColor" class="svg learningCard"></CardSvg>
            <div class="text bold">איזו כרטיסיה תרצו להוסיף?</div>
            <dropDown @choice="saveChoice" :optionList = "{'video': 'וידיאו מהמחשב', 'youtube': 'וידיאו מהיוטיוב', 'text': 'טקסט', 'pic-and-text': 'תמונה וכיתוב'}" :key="reRenderCounter"></dropDown>
            <div :class="['button', choice ? '' : 'invisible']" @click="addCard">הוספת כרטיסיה</div>
          </div>
        </div>
      </div>
    <!-- <div class="flex-container"></div> -->
  </div>
</template>

<script>
import CardSvg from "./svg/CardSvg.vue";
import dropDown from "./DropDown.vue";
import card from "./Card.vue";

export default {
  components: { CardSvg, dropDown, card },
  name: "Secondary",
  data() {
    return {
      secondary: this.secondaryName.includes("secondary") ? "" : this.secondaryName,
      choice: "",
      reRenderCounter: 0
    }
  },
  props: ["secondaryName", "secondaryData", "theme"],
  methods: {
    inputFocus(event) {
      if (event.currentTarget.getAttribute('placeholder')) {
          event.currentTarget.setAttribute('placeholder', '') ;
      } else {
        event.currentTarget.setAttribute('placeholder', "הכניסו תת-נושא");
        if (!event.currentTarget.value) {
          console.log(document.querySelector(".error-message"));
          this.$refs.errorMessage.style.display = "block";
        }
      }
    },
    saveChoice(cardType) {
      this.choice = cardType;
    },
    addCard() {
      console.log("add card");
      this.$set(this.secondaryData, `card${Object.keys(this.secondaryData).length}`, [{
        cardType: this.choice,
        content: ""
      }]);
      this.choice = "";
      this.reRenderCounter++;
      this.scrollToHorizontalEnd();
    },
    checkValidity(event) {
      if (event.currentTarget.value) {
        this.$refs.errorMessage.style.display = "none";
      }
    },
    async scrollToHorizontalEnd () {
      await this.$nextTick() 
      this.$refs.overflowContainer.scrollLeft = -this.$refs.overflowContainer.scrollWidth;
      console.log(this.$refs.overflowContainer.scrollWidth);
    },
    detectSwipe (event) {

    },
    wheel (event) {
      console.log(event.currentTarget.clientWidth)
      if (event.currentTarget.scrollWidth > event.currentTarget.clientWidth) {
        event.preventDefault()
        event.currentTarget.scrollLeft = event.currentTarget.scrollLeft - 5 * event.deltaY;
      }
    },
    scroll () {
      console.log("scroll")
    }
  },
  mounted () {
    document.addEventListener("keydown", this.shiftListener);
  }
}
</script>
<style scoped>
.arrow, .secondary-name {
  color: white;
  font-size: 1.4rem;
}

.secondary-name {
  background-color: transparent;
  border: none;
  box-sizing: border-box;
  margin-right: 1rem;
  padding: 0.2rem;
}

.secondary-name::placeholder {
  color: rgba(255, 255, 255, 0.781)
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: rgba(255, 255, 255, 0.781)
}

input.secondary-name:focus {
  border-radius: 0.2rem;
  outline: none;
  outline: white solid 1px;
}

.cards-container {
  display: flex;
  flex-direction: row;
  margin-bottom: 2rem;
  gap: 1.5rem;
  width: fit-content;
  height: fit-content;
}

.add-card-button {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;  
  align-items: center;
  gap: 1rem;
  height: 27.2rem;
  width: 20rem;
  font-size: 1.6rem;
  text-align: center;
}

.add-card-button select {
  width: 50%;
}

.learningCard {
  height: 100%;
  width: 100%;
  right: 0.4rem;
}

.button {
  color: black;
    border: black solid 0.1rem;
    border-radius: 0.7rem;
    padding: 0.5rem 1rem;
    margin: 1rem 1rem;
    cursor: pointer;
}

.invisible {
  visibility: hidden;
  pointer-events: none;
}

.error-message-position {
  right: 12.5rem;
}

.triangle-position {
  right: 2.5rem;
}

.overflow-container {
  width: 80vw;
  overflow-x: auto;
  overflow-y: hidden;
  height: 29rem;
  margin-bottom: 1rem;
  scroll-behavior: smooth;
}

::-webkit-scrollbar:horizontal {
  height: 7px;
}
</style>