<template>
  <div>
    <div  v class="card">
      <CardSvg :color="theme.secondaryColor" class="svg learningCard"></CardSvg>
        <div v-if="currentPageObj.cardType === 'text'"> I recognize </div>
        <card-input :cardType="currentPageObj.cardType"></card-input>
        <div class="buttons-container">
          <page-button :class="['button', currentPage === 0 ? 'invisible' : '']" type="back" :color="theme.textColor" @btn-pressed="handleBtn"></page-button>
          <button class="remove-btn">הסרת עמוד</button>
          <page-button class="button" v-if="currentPage === pageArray.length - 1" type="add" :color="theme.textColor" @btn-pressed="handleBtn"></page-button>
          <page-button class="button" type="next" :color="theme.textColor" @btn-pressed = "handleBtn" v-else></page-button>
        </div>
        <!-- dropdown -->
        <div class="black-screen" v-if="isPopupShown"></div>
        <div class="card dropdown" v-if="isPopupShown">
                <CloseBtnSvg alt='exit' :color="theme.textColor" class="close-btn" @click.native="closePopup"></CloseBtnSvg>
              <CardSvg :color="theme.secondaryColor" class="svg learningCard"></CardSvg>
              <div>איזו כרטיסיה תרצו להוסיף?</div>
                <dropDown @choice="saveChoice" :optionList = "{'video': 'וידיאו מהמחשב', 'youtube': 'וידיאו מהיוטיוב', 'text': 'טקסט', 'picAndText': 'תמונה וכיתוב'}" :key="reRenderCounter"></dropDown>
              <div>
                <div :class="['add-card-button', 'color-btn', choice ? '' : 'disabled']" @click="addCard">הוספת עמוד</div>
                <div :class="['add-card-button']" @click="closePopup">ביטול הוספה</div>
              </div>
        </div>
    </div>
  </div>
</template>

<script>
import CardSvg from "./svg/CardSvg.vue";
import PageButton from "./svg/PageButtonSvg.vue";
import dropDown from "./DropDown.vue";
import CloseBtnSvg from "./svg/CloseBtnSvg.vue";
import CardInput from "./CardInput.vue";

export default {
  components: { CardSvg, PageButton, dropDown, CloseBtnSvg, CardInput},
  name: "card",
  data() {
    return {
      currentPage: 0,
      isPopupShown: false,
      reRenderCounter: 0,
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
    addCard() {
      this.$set(this.pageArray, this.pageArray.length, {
        cardType: this.choice,
        content: ""
      });
      this.closePopup();
      this.currentPage = this.pageArray.length - 1;
    },
    closePopup() {
      console.log("closed");
      this.choice = "";
      this.reRenderCounter++;
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

.add-card-button {
  color: black;
    border: black solid 0.1rem;
    border-radius: 0.7rem;
    padding: 0.5rem 1.5rem;
    margin: 1rem 1rem;
    cursor: pointer;
}

.color-btn {
  background: v-bind("theme.secondaryColor");
}

.dropdown {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
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
}
</style>