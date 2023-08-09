<template>
  <div id="Secondary">
    <div class="flex">
      <span class="minus" @click="deleteSecondary"></span>
      <CustomInput class="secondary-name" placeholder="הכניסו תת-נושא" :placeholderStyle="{color: '#ffffffC7'}"
      :modelValue="secondary" @update:modelValue="(value) => this.$emit('update:secondary', value)"
      :errorMessage="errorMessage" @input="(value) => {this.$emit('secondary-input', value);}"
      @focusout = "(value) => {this.$emit('secondary-focusout', value)}"></CustomInput>
    </div>
    <div class="overflow-container scrollStyle" v-touch:swipe="handleSwipe" ref="overflowContainer">
        <card v-for="(topic, index) in indexedKeys" :key="index" :cardTopic="topic" :pageArray="secondaryData[topic]"
          :isQuestion="false" :theme="theme" @update:cardTopic="(value) => {updateKeyName(topic, value, index, this.secondaryData)}"
          :errorMessage="errorList[index]" @topic-input="(value) => hideErrorMessages(value, index)"
          @topic-focusout="(value) => checkIfEmpty(value, index)" @delete-card="deleteCard(topic)"></card>
        <div> 
          <DropDownCard :theme="theme" @add-page="addCard" :key="reRenderCounter" btnText="הוספת כרטיסיה"></DropDownCard>
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
      showErrorMessage: false,
      reRenderCounter: 0,
      indexedKeys: Object.keys(this.secondaryData),
      errorList: new Array(Object.keys(this.secondaryData).length),
    }
  },
  props: ["secondaryName", "secondaryData", "theme", "errorMessage"],
  methods: {
    addCard(choice) {
      let newCard = {
        cardType: choice,
        content: "",
      }
      switch (choice) {
        case ("youtube"): {
          newCard.youtube = "";
          break;
        } case ("videoAndText"): {
          newCard.video = "";
          break;
        } case ("picAndText"): {
          newCard.pic = "";
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
    // handle error messages and customInput events. Happens not on change but when coming back to main screen or after error message
    updateKeyName (key ,newKey, itemIndex, objectRef) {
      if (key !== newKey) {
        if (!this.isDuplicateKey(objectRef, newKey)) {
             objectRef[newKey] =  [...objectRef[key]];
             let index = this.indexedKeys.indexOf(key);
             this.indexedKeys[index] = newKey;
             delete objectRef[key];
         } else if (this.errorList[itemIndex] !== "יש למלא את השדה") {
           this.errorList[itemIndex] = "הכותרת כבר בשימוש";
         }
      }
    },
    isDuplicateKey (object, newKey) {
        for (const keyName in object) {
            if (keyName === newKey) {
                return true;
            }
        }
        return false;
    },
    hideErrorMessages (value, index) {
      if ((value !== "" || !this.isDuplicateKey(this.secondaryData, value)) && this.errorList[index] !== "") {
        this.errorList[index] = "";
      }
    },
    checkIfEmpty (value, index) {
      if (!value) {
        this.errorList[index] = "יש למלא את השדה";
      }
    },
    deleteSecondary() {
      swal({
        icon: "warning",
        title: `בטוחים שאתם רוצים למחוק? כל מה שכתבתם בתת הנושא "${this.secondary}" יימחק!`,
        buttons: {cancel: "לבטל", confirm: "למחוק"},
        dangerMode: true,
        className: "swal-font",
      })
      .then((willDelete) => {
        if (willDelete) {
          this.$emit("delete-secondary", this.secondaryName);
        }
      });
    },
    deleteCard (cardName) {
      this.indexedKeys.splice(this.indexedKeys.indexOf(cardName), 1);
      delete this.secondaryData[cardName];
    },
  },
  computed: {
    secondary() {return(this.secondaryName.includes("secondary") ? "" : this.secondaryName)}
  }
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
  outline: white solid 1px;
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
  border: none;
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
  scroll-behavior: smooth;  
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
}


::-webkit-scrollbar:horizontal {
  height: 7px;
}
</style>