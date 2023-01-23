<template>
    <div class="card dropdown" v-if="isDropDownShown">
        <CardSvg :color="theme.secondaryColor" class="svg learningCard"></CardSvg>
        <div>איזו כרטיסיה תרצו להוסיף?</div>
        <dropDown @choice="saveChoice"
            :optionList="{ 'video': 'וידיאו מהמחשב', 'youtube': 'וידיאו מהיוטיוב', 'text': 'טקסט', 'picAndText': 'תמונה וכיתוב' }"
            :key="reRenderCounter"></dropDown>
        <div :class="['add-card-button', choice ? '' : 'invisible']" @click="addCard">הוספת כרטיסיה</div>
    </div>
</template>

<script>
export default {
    name: "AddCardDropdown",
    data() {
        return {
            reRenderCounter: 0,
            saveChoice: 0,
        }
    },
    methods: {
        addCard() {
      this.$set(this.secondaryData, `card${Object.keys(this.secondaryData).length}`, [{
        cardType: this.choice,
        content: ""
      }]);
      this.choice = "";
      this.reRenderCounter++;
      this.scrollToHorizontalEnd();
    },
    }
}
</script>

<style>
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
</style>