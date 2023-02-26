<template>
  <div id="Secondary">
    <span class="arrow">></span>
    <CustomInput class="secondary-name" placeholder="הכניסו תת-נושא" v-model="secondary" :placeholderStyle="{color: '#ffffffC7'}"></CustomInput>
    <!-- <input class="secondary-name" type="text" placeholder="הכניסו תת-נושא" @focus="inputFocus" @focusout="inputFocus"
      @input="checkValidity" v-model="secondary"> -->

    <!-- <div :class="['error-message', 'error-message-position', showErrorMessage ? '' : 'none']" ref="errorMessage">
      <div class="up-error-triangle triangle-position"></div>
      <div class="message">
        <img src="@/assets/colorNeutralAssets/triangle-warning.svg" alt="warning symbol" class="warning" />
        <span class="text">יש למלא את השדה</span>
      </div>
    </div> -->

    <div class="overflow-container scrollStyle" v-touch:swipe="handleSwipe" ref="overflowContainer">
      <div class="cards-container">
        <card v-for="(pageArray, topic) in secondaryData" :key="topic" :cardTopic="topic" :pageArray="pageArray"
          :isQuestion="false" :theme="theme"></card>
        <div>
          <DropDownCard :theme="theme" @add-page="addCard" :key="reRenderCounter"></DropDownCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardSvg from "./svg/CardSvg.vue";
import DropDownCard from "./DropDownCard.vue";
import card from "./Card.vue";
import CustomInput from "./CustomInput.vue";

export default {
  components: { CardSvg, DropDownCard, card, CustomInput },
  name: "Secondary",
  data() {
    return {
      secondary: this.secondaryName.includes("secondary") ? "" : this.secondaryName,
      showErrorMessage: false,
      reRenderCounter: 0
    }
  },
  props: ["secondaryName", "secondaryData", "theme"],
  methods: {
    inputFocus(event) {
      if (event.currentTarget.getAttribute('placeholder')) {
        event.currentTarget.setAttribute('placeholder', '');
      } else {
        event.currentTarget.setAttribute('placeholder', "הכניסו תת-נושא");
        if (!event.currentTarget.value) {
          this.showErrorMessage = true;
        }
      }
    },
    addCard(choice) {
      this.secondaryData[`card${Object.keys(this.secondaryData).length}`] = [{
        cardType: choice,
        content: ""
      }];
      this.reRenderCounter++;
      this.scrollToHorizontalEnd();
    },
    checkValidity(event) {
      if (event.currentTarget.value) {
        this.showErrorMessage = false;
      }
    },
    async scrollToHorizontalEnd() {
      await this.$nextTick()
      this.$refs.overflowContainer.scrollLeft = -this.$refs.overflowContainer.scrollWidth;
    },
    handleSwipe(direction, event) {
      let pixelsToMove = direction === "right" ? 600 : -600;
      event.currentTarget.scrollLeft = event.currentTarget.scrollLeft - pixelsToMove;
    },
  }
} 
</script>
<style scoped>
.arrow,
.secondary-name {
  color: white;
  font-size: 1.4rem;
  width: 17rem;
}

.secondary-name {
  background-color: transparent;
  border: none;
  box-sizing: border-box;
  margin-right: 1rem;
  padding: 0.2rem;
  display: inline-block;
}

.secondary-name:focus-within {
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


.error-message-position {
  right: 11.5rem;
}

.triangle-position {
  right: 5.5rem;
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