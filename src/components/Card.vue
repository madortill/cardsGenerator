<template>
  <div>
    <div  v class="card">
      <CardSvg :color="theme.secondaryColor" class="svg learningCard"></CardSvg>
        <div v-if="currentPageObj.cardType === 'text'"> I recognize </div>
        <card-input :cardType="currentPageObj.cardType"></card-input>
        <div class="buttons-container">
          <page-button-svg :class="['button', currentPage === 0 ? 'invisible' : '']" type="back" :color="theme.textColor" @btn-pressed="handleBtn"></page-button-svg>
          <button class="remove-btn">הסרת עמוד</button>
          <page-button-svg class="button" v-if="currentPage === pageArray.length - 1" type="add" :color="theme.textColor" @btn-pressed="handleBtn" title="הוספת עמוד"></page-button-svg>
          <page-button-svg class="button" type="next" :color="theme.textColor" @btn-pressed = "handleBtn" v-else></page-button-svg>
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

export default {
  components: { CardSvg, PageButtonSvg, CardInput, DropDownCard },
  name: "card",
  data() {
    return {
      currentPage: 0,
      isPopupShown: false,
      choice: ""
    }
  },
  props: ["isQuestion", "topic", "pageArray", "theme"],
  computed: {
    currentPageObj () {
      return (this.pageArray[this.currentPage])
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
      this.$set(this.pageArray, this.pageArray.length, {
        cardType: choice,
        content: ""
      });
      this.closePopup();
      this.currentPage = this.pageArray.length - 1;
    },
    closePopup() {
      console.log("closed");
      this.choice = "";
      this.isPopupShown = false;
    }
  }
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

.learningCard {
  height: 100%;
  width: 100%;
  right: 0.4rem;
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
}

.button {
  max-width: 2.7rem;
  cursor: pointer;
}

.invisible {
  visibility: hidden;
  pointer-events: none;
}
</style>