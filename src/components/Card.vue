<template>
  <div id="Card">
    <div class="card">
      <CardSvg :color="theme.secondaryColor"></CardSvg>
      <div id="delete-btn" class="delete-btn">
        <img src="@/assets/colorNeutralAssets/trash-gray.svg" alt="פח אשפה" class="trash-can" @click="deleteCard">
      </div>
      <CustomInput placeholder="הכניסו נושא לכרטיסיה" class="topic" :placeholderStyle="placeholderStyle" 
      :modelValue="topic" @update:modelValue="(value) => this.$emit('update:cardTopic', value)" :parentErrorMessage="errorMessage" @input="(value) => {this.$emit('topic-input', value);}"
      @focusout = "(value) => {this.$emit('topic-focusout', value)}"></CustomInput>
      <card-input :cardInfo="currentPageObj"></card-input>
      <div class="buttons-container">
        <page-button-svg :class="['button', currentPage === 0 ? 'invisible' : '']" type="back" :color="theme.textColor"
          @btn-pressed="handleBtn"></page-button-svg>
        <button class="remove-btn">הסרת עמוד</button>
        <page-button-svg class="button" v-if="currentPage === pageArray.length - 1" type="add" :color="theme.textColor"
          @btn-pressed="handleBtn" title="הוספת עמוד"></page-button-svg>
        <page-button-svg class="button" type="next" :color="theme.textColor" @btn-pressed="handleBtn"
          v-else></page-button-svg>
      </div>

      <DropDownCard v-if="isPopupShown" :theme="theme" @add-page="addCard" @cancel="closePopup" cancelable></DropDownCard>
    </div>
  </div>
</template>

<script>
import CardSvg from "./svg/CardSvg.vue";
import PageButtonSvg from "./svg/PageButtonSvg.vue";
import CardInput from "./CardInput.vue";
import DropDownCard from "./DropDownCard.vue";
import CustomInput from "./CustomInput.vue";

export default {
  components: { CardSvg, PageButtonSvg, CardInput, DropDownCard, CustomInput },
  name: "card",
  props: ["isQuestion", "cardTopic", "pageArray", "theme","errorMessage"],
  emits: ['update:cardTopic', "topic-input", "topic-focusout"],
  data() {
    return {
      currentPage: 0,
      isPopupShown: false,
      choice: "",
      placeholderStyle: { "color": "#808080", "font-size": "0.7em", },
    }
  },
  methods: {
    handleBtn(btnType) {
      if (btnType === "add") {
        this.isPopupShown = true;
      } else if (btnType === "back") {
        this.currentPage--;
      } else if (btnType === "next") {
        this.currentPage++;
      }
    },
    saveChoice(cardType) {
      this.choice = cardType;
    },
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
      this.pageArray.push(newCard);
      this.closePopup();
      this.currentPage = this.pageArray.length - 1;
    },
    closePopup() {
      this.choice = "";
      this.isPopupShown = false;
    },
  },
  computed: {
    currentPageObj() {
      return (this.pageArray[this.currentPage])
    },
    topic () {
      if (this.cardTopic.includes("card")) {
        return("");
      } else {
        return(this.cardTopic);
      }
    }
  },
}
</script>

<style scoped>
.card {
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

.remove-btn {
  background-color: white;
  border-radius: 0.7rem;
  font-size: 0.9rem;
  padding: 0.5rem 0.7rem;
  border: solid #dbdbdb 3px;
  cursor: pointer;
  height: fit-content;
  align-self: center;
}

.buttons-container {
  display: flex;
  width: 90%;
  justify-content: space-around;
  margin-top: auto;
}

.button {
  max-width: 2.7rem;
  cursor: pointer;
}

.invisible {
  visibility: hidden;
  pointer-events: none;
}

.topic {
  font-size: 1.5rem;
  border: none;
  font-weight: 800;
  outline: gray 2px dashed;
  background-color: transparent;
  text-align: center;
  padding: 0rem 0rem 0.2rem;
  border-radius: 0.8rem;
  box-sizing: border-box;
  width: 85%;
  text-overflow: ellipsis;
  padding-right: 0.5rem;
}

.delete-btn {
  min-height: 3.5rem;
  width: 85%;
  display: flex;
  align-items: center;
  position: relative;
  top: 1.3rem;
}

.trash-can {
  height: 1.5rem;
  cursor: pointer;
}</style>