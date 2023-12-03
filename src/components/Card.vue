<template>
  <div id="Card">
    <div class="card">
      <CardSvg :color="theme.secondaryColor"></CardSvg>
      <button id="delete-btn" class="delete-btn">
        <img src="@/assets/colorNeutralAssets/trash-gray.svg" alt="פח אשפה" class="trash-can" @click="deleteCard" title="מחק כרטיסיה">
      </button>
      <CustomInput placeholder="הכניסו נושא לכרטיסיה" class="topic" :placeholderStyle="placeholderStyle" 
      :modelValue="topic" @update:modelValue="(value) => this.$emit('update:cardTopic', value)" :errorMessage="errorMessage"
      @input="(value) => {this.$emit('topic-input', value);}" @focusout = "(value) => {this.$emit('topic-focusout', value)}"></CustomInput>
      <card-input :cardInfo="currentPageObj" :theme="theme" class="cardInput"></card-input>
      <div class="buttons-container">
        <page-button-svg :class="['button', currentPage === 0 ? 'invisible' : '']" type="back" :color="theme.textColor"
          @btn-pressed="handleBtn"></page-button-svg>
        <button class="remove-btn" @click="removePage" :disabled="pageArray.length <= 1" title="הסרת עמוד">הסרת עמוד</button>
        <page-button-svg class="button" v-if="currentPage === pageArray.length - 1" type="add" :color="theme.textColor"
          @btn-pressed="handleBtn"></page-button-svg>
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
import swal from 'sweetalert';

export default {
  components: { CardSvg, PageButtonSvg, CardInput, DropDownCard, CustomInput },
  name: "card",
  props: ["isQuestion", "cardTopic", "pageArray", "theme","errorMessage"],
  emits: ['update:cardTopic', "topic-input", "topic-focusout", "delete-card"],
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
    removePage() {
      this.pageArray.splice(this.currentPage, 1);
      if (this.currentPage >= this.pageArray.length) {
        this.currentPage = this.pageArray.length - 1
      }
    },
    deleteCard() {
      swal({
        icon: "warning",
        title: "בטוחים שאתם רוצים למחוק? כל מה שכתבתם בכרטיסייה הזו יימחק!",
        buttons: {cancel: "לבטל", confirm: "למחוק"},
        dangerMode: true,
        className: "swal-font",
      })
      .then((willDelete) => {
        if (willDelete) {
          this.$emit("delete-card");
        }
      });
    }
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
  box-sizing: border-box;
  position: relative;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template:  8.5% 12.5% 64% 15% / 1fr;
  height: 29.2rem;
  width: 20rem;
  font-size: 1.6rem;
  text-align: center;
  padding-left: 4%;
  padding-top: 6%;
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
  color: revert;
}

.remove-btn:disabled {
  border-width: 2px;
}

.buttons-container {
  display: flex;
  width: 90%;
  justify-content: space-around;
  grid-column: 1 / 2;
  grid-row:  -2 / -1;
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
  grid-column: 1 / 2;
  grid-row: 2 / span 1;
}

.delete-btn {
  /* min-height: 3.5rem; */
  width: 85%;
  display: flex;
  align-items: center;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

.trash-can {
  height: 1.5rem;
  cursor: pointer;
  margin-top: 0.5rem;
}

.cardInput {
  grid-column: 1 / 2;
  grid-row: 3 / 4;
  display: contents;
}
</style>