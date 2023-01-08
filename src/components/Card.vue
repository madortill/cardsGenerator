<template>
  <div>
    <div class="card">
      <CardSvg :color="theme.secondaryColor" class="svg learningCard"></CardSvg>
        <div v-if="currentPageObj.cardType === 'text'"> I recognize </div>
        <div> {{ currentPageObj.cardType }} </div>
        <div class="buttons-container">
          <page-button :class="['button', currentPage === 0 ? 'invisible' : '']" type="back" :color="theme.textColor"></page-button>
          <button class="remove-btn">הסרת עמוד</button>
          <page-button class="button" v-if="currentPage === pageArray.length - 1" type="add" :color="theme.textColor"></page-button>
          <page-button class="button" type="next" :color="theme.textColor" v-else></page-button>
        </div>
    </div>
  </div>
</template>

<script>
import CardSvg from "./svg/CardSvg.vue";
import PageButton from "./svg/PageButtonSvg.vue";

export default {
  components: { CardSvg, PageButton },
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

<style scoped>
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
/* להחליף את הכפתורים בתמונות */
</style>