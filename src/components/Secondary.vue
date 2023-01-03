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
    <div class="cards-container">
      <card v-for="(topic, data) in subjData" :key="topic" :topic="topic" :cardData="data" :isQuestion="false"></card>
      <div class="add-card-button">
        <CardSvg :color="theme.secondaryColor" class="svg learningCard"></CardSvg>
        <div class="text bold">איזו כרטיסיה תרצו להוסיף?</div>
        <dropDown @choice="saveChoice" :optionList = "{'video': 'וידיאו מהמחשב', 'youtube': 'וידיאו מהיוטיוב', 'text': 'טקסט', 'pic-and-text': 'תמונה וכיתוב'}"></dropDown>
        <div :class="['button', choice ? '' : 'invisible']" @click="addCard">הוספת כרטיסיה</div>
      </div>
    </div>
    <div class="flex-container"></div>
  </div>
</template>

<script>
import CardSvg from "./svg/CardSvg.vue"
import dropDown from "./DropDown.vue"
export default {
  components: { CardSvg, dropDown },
  name: "Secondary",
  data() {
    return {
      secondary: this.secondaryName.includes("secondary") ? "" : this.secondaryName,
      data: this.secondaryData,
      choice: ""
    }
  },
  props: ["subjData", "secondaryName", "secondaryData", "theme"],
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
      this.secondaryData[""] = []
    },
    checkValidity(event) {
      if (event.currentTarget.value) {
        this.$refs.errorMessage.style.display = "none";
      }
    }
  },
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
</style>