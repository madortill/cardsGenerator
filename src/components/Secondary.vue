<template>
  <div id="Secondary">
    <div class="flex">
      <span class="minus" @click="deleteSecondary(pathArray)" title="מחק תת-נושא"></span>
      <CustomInput class="secondary-name" placeholder="הכניסו תת-נושא" :placeholderStyle="{ color: '#ffffffC7' }"
        :path-array="pathArray"></CustomInput>
    </div>
    <div class="overflow-container scrollStyle" v-touch:swipe="handleSwipe" ref="overflowContainer">
      <card v-for="(topicObj, index) in topicArr" :key="index" :pathArray="[...pathArray, 'topics', index]"
        :isQuestion="false" @delete-card="deleteCard(topicObj)"></card>
      <div>
        <DropDownCard @add-page="createNewCard" :key="reRenderCounter" btnText="הוספת כרטיסיה"></DropDownCard>
      </div>
    </div>
  </div>
</template>

<script>
import CardSvg from "./svg/CardSvg.vue";
import DropDownCard from "./DropDownCard.vue";
import card from "./Card.vue";
import CustomInput from "./CustomInput.vue";
import { theme } from '../stores/theme.js';
import { useDataStore } from '../stores/data';
import { mapState, mapActions } from 'pinia';

export default {
  components: { CardSvg, DropDownCard, card, CustomInput },
  name: "Secondary",
  data() {
    return {
      theme: theme.themeColor,
      showErrorMessage: false,
      reRenderCounter: 0,
    }
  },
  props: ["pathArray"],
  methods: {
    ...mapActions(useDataStore, ["deleteItem", "getNestedItem", "addItem"]),
    createNewCard(choice) {
      let newCard = {
        "name": "",
        "error": "",
        "pageArray": [
          {
            cardType: choice,
            content: "",
          }
        ]
      }

      switch (choice) {
        case ("youtube"): {
          newCard.pageArray[0].youtube = "";
          break;
        } case ("videoAndText"): {
          newCard.pageArray[0].video = "";
          break;
        } case ("picAndText"): {
          newCard.pageArray[0].pic = "";
          break;
        }
      }
      this.addItem([...this.pathArray, 'topics'], newCard)
      this.reRenderCounter++;
      this.scrollToHorizontalEnd();
    },
    /* swipes and scrolls */
    async scrollToHorizontalEnd() {
      await this.$nextTick()
      this.$refs.overflowContainer.scrollLeft = -this.$refs.overflowContainer.scrollWidth;
    },
    handleSwipe(direction, event) {
      let pixelsToMove = direction === "right" ? 600 : -600;
      event.currentTarget.scrollLeft = event.currentTarget.scrollLeft - pixelsToMove;
    },
    /* shows delete popup and if the user says yes, deletes the secondary */
    deleteSecondary() {
      swal({
        icon: "warning",
        title: `בטוחים שאתם רוצים למחוק? כל מה שכתבתם בתת הנושא "${this.secondaryName}" יימחק!`,
        buttons: { cancel: "לבטל", confirm: "למחוק" },
        dangerMode: true,
        className: "swal-font",
      })
        .then((willDelete) => {
          if (willDelete) {
            this.deleteItem(this.pathArray);
          }
        });
    },
    deleteCard(cardName) {
      this.indexedKeys.splice(this.indexedKeys.indexOf(cardName), 1);
      delete this.secondaryData[cardName];
    },
  },
  computed: {
    topicArr() {
      console.log(this.getNestedItem([...this.pathArray, "topics"]));
      return this.getNestedItem([...this.pathArray, "topics"]);
    },
    secondaryName() {
      console.log(this.getNestedItem([...this.pathArray, "name"]))
      return this.getNestedItem([...this.pathArray, "name"]);
    }
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