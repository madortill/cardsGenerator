<template>
  <div id="Secondary">
    <span class="arrow">></span>
    <CustomInput class="secondary-name" placeholder="הכניסו תת-נושא" v-model="secondary" :placeholderStyle="{color: '#ffffffC7'}"></CustomInput>
    <div class="overflow-container scrollStyle" v-touch:swipe="handleSwipe" ref="overflowContainer">
      <div class="cards-container">
        <card v-for="(topic, index) in indexedKeys" :key="index" :cardTopic="topic" :pageArray="secondaryData[topic]"
          :isQuestion="false" :theme="theme" @update:cardTopic="(value) => {updateKeyName(topic, value, index)}" ref="card"
          errorMessage=""></card>
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
      reRenderCounter: 0,
      indexedKeys: Object.keys(this.secondaryData),
    }
  },
  props: ["secondaryName", "secondaryData", "theme"],
  methods: {
    addCard(choice) {
      let newCard = {
        cardType: choice,
        content: ""
      }
      switch (choice) {
        case ("youtube"): {
          newCard.youtube = "";
          break;
        } case ("videoAndText"): {
          newCard.video = "";
          break;
        } case ("picAndText"): {
          newCard.pic = [];
          break;
        }
      }
      this.secondaryData[`card${this.indexedKeys.length}`] = [newCard];
      this.indexedKeys.push(`card${this.indexedKeys.length}`);
      this.reRenderCounter++;
      this.scrollToHorizontalEnd();
    },
    async scrollToHorizontalEnd() {
      await this.$nextTick()
      this.$refs.overflowContainer.scrollLeft = -this.$refs.overflowContainer.scrollWidth;
    },
    handleSwipe(direction, event) {
      let pixelsToMove = direction === "right" ? 600 : -600;
      event.currentTarget.scrollLeft = event.currentTarget.scrollLeft - pixelsToMove;
    },

    updateKeyName (key ,newKey, itemIndex) {
      if (!this.isDuplicateKey(this.secondaryData, newKey)) {
          this.secondaryData[newKey] =  [...this.secondaryData[key]];
          let index = this.indexedKeys.indexOf(key);
          this.indexedKeys[index] = newKey;
          delete this.secondaryData[key];
          // target.style.backgroundColor = "transparent";
      } else {
          // target.style.backgroundColor = "red";
          // console.log(`card${itemIndex}`);
          // alert("Duplicate key");
      }
    },
    isDuplicateKey (object, newKey) {
        for (const keyName in object) {
            if (keyName === newKey) {
                return true;
            }
        }
        return false;
    }
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