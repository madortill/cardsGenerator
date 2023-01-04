<template>
  <div>
    <div class="card">
      <CardSvg :color="theme.secondaryColor" class="svg learningCard"></CardSvg>
        <div v-if="currentPageObj.cardType === 'text'"> text </div>
        <div class="buttons-container">
          <button class="button" id="add-page" v-if="currentPage === pageArray.length"> + </button>
          <button class="button" v-else>></button>
          <button class="button">&lt;</button>
          <button class="button remove-card">הסרת עמוד</button>
        </div>
    </div>
  </div>
</template>

<script>
import CardSvg from "./svg/CardSvg.vue";

export default {
  components: { CardSvg },
  name: "card",
  data() {
    return {
      currentPage: 0
    }
  },
  props: ["isQuestion", "topic", "pageArray", "theme"],
  computed: {
    currentPageObj () {
      return (this.pageArray[this.currentPage])
    }
  },
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
  min-width: 20rem;
  font-size: 1.6rem;
  text-align: center;
}

.learningCard {
  height: 100%;
  width: 100%;
  right: 0.4rem;
}
</style>