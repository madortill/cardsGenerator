<template>
  <!-- <div>טוען...</div> -->
  <div id="loading-screen">
    <TransitionGroup name="transition" @after-leave="onAnimationend">
      <FinalCardsPreview v-for="(color, index) in colorArray" :theme="color" class="preview" :key="color"
        :class="['card']" @animationend="onAnimationend" :style="`left: calc((var(--xaxis-start-point) / 2)) + var(--offset-amount) * ${index}); 
                    top:calc(var(--offset-amount) * ${index + 1}); 
                    z-index: calc(var(--num-cards) - ${index + 1});`">
      </FinalCardsPreview>
    </TransitionGroup>
  </div>
</template>

<script>
import FinalCardsPreview from "./svg/FinalCardsPreview.vue"

let firstColor;

export default {
  name: "loadingScreen",
  data() {
    return {
      currentCard: 0,
      colorArray: [
        // Make sure all colors are 6 digit hex
        {
          name: "lightBlue",
          hebrawName: "תכלת",
          primaryColor: "#20c5f2",
          secondaryColor: "#1de8f7",
          textColor: "#1c3f55",
          gradient: "#27c5f2",
          buttonsColor: "#1c3f55"
        }, {
          name: "pink",
          hebrawName: "ורוד",
          primaryColor: "#eda8ec",
          secondaryColor: "#c23ac0",
          textColor: "#260129",
          gradient: "#e586d7",
          buttonsColor: "#260129"
        }, {
          name: "yellow",
          hebrawName: "צהוב",
          primaryColor: "#FCB328",
          secondaryColor: "#FDDE2E",
          textColor: "#414042",
          gradient: "#ffa700",
          buttonsColor: "#414042"
        }, {
          name: "lightPurple",
          hebrawName: "סגול בהיר",
          primaryColor: "#9E7FAD",
          secondaryColor: "#562d66", //previous color: "#9B6BAE",
          textColor: "#180926",
          gradient: "#683f91", // previous color:  "#3D2768",
          buttonsColor: "#180926"
        }, {
          name: "darkBlue",
          hebrawName: "כחול כהה",
          primaryColor: "#223D6D",
          secondaryColor: "#516FA5 ",
          textColor: "#031520", // "#223d6d",
          gradient: "#516FA5",
          buttonsColor: "#031520"
        }, {
          name: "brown",
          hebrawName: "חום",
          primaryColor: "#a7603b",
          secondaryColor: "#5c321c",
          textColor: "#361d10",
          gradient: "#602003",
          buttonsColor: "#361d10"
        }, {
          name: "torquise",
          hebrawName: "טורקיז",
          primaryColor: "#1aa3a3",
          secondaryColor: "#67dfcb",
          textColor: "#1f3e3e",
          gradient: "#629191",
          buttonsColor: "#1f3e3e"
        },
        // Colors not tested
        {
          name: "maroon",
          hebrawName: "בורדו",
          primaryColor: "#5b0616", // 4D243D
          secondaryColor: "#b91835",
          textColor: "#2e0002",
          gradient: "#2e0002",
          buttonsColor: "#2e0002"
        },
        {
          name: "ballet-pink",
          hebrawName: "ורוד-בלט",
          primaryColor: "#f97394",
          secondaryColor: "#ffb3c6",
          textColor: "#3a1820",
          gradient: "#ff8fab",
          buttonsColor: "#3a1820"
        },
      ]
    }
  },
  components: { FinalCardsPreview },
  methods: {
    reorderCards() {
      firstColor = this.colorArray.shift();
      console.log(firstColor)
      // this.colorArray.push(firstColor);
    },
    onAnimationend(e) {
      console.log(e.animationName);
      if (e.animationName === undefined) {
        this.colorArray.push(firstColor);
        this.reorderCards();
      }
    }
  },
  mounted() {
    // interval = setInterval(this.reorderCards, 1100);
    this.reorderCards();
  }
}

const startAnimation = () => {
  const allCards = document.querySelectorAll('.card');
  const topCard = document.querySelector('.card-1');
  topCard.classList.add('shuffle');
  topCard.addEventListener("animationend", reorderCardsWhenAnimationFinished);
}

const reorderCardsWhenAnimationFinished = e => {
  if (e.animationName === 'move-left') {
    const allCards = document.querySelectorAll('.card');
    moveFirstCardToBack(allCards);
  }
};

const finishAnimation = () => {
  document.removeEventListener("animationend", reorderCardsWhenAnimationFinished);
  const allCards = document.querySelectorAll('.card');
  Array.from(allCards).map(card => card.classList.remove('shuffle'));
  startAnimation();
}

const moveFirstCardToBack = cards => {
  Array.from(cards).map((card, index) => {
    const cardClass = Object.values(card.classList).find(className => className !== 'card' && className !== 'shuffle');
    const cardNumber = parseInt(cardClass.split('-')[1], 10);
    const nextCardNumber = cardNumber === 1 ? cards.length : cardNumber - 1;
    card.classList.remove(cardClass);
    card.classList.add('card-' + nextCardNumber);
  })
  finishAnimation();
}

</script>

<style scoped>
.card {
  --card-width: 14rem;
  --num-cards: v-bind("colorArray.length");
  --offset-amount: 10px;
  --xaxis-start-point: 46%;
}

#loading-screen {
  width: 350px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}

.card {
  height: auto;
  width: var(--card-width);
  border: 1px solid #000;
  border-radius: 10px;
  font-size: 250px;
  text-align: center;
  position: absolute;
  background: white;
  /* box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.5); */
}

.transition-leave-active {
  animation-name: move-right, send-to-back, move-left;
  animation-duration: 500ms, 10ms, 500ms;
  animation-delay: 0ms, 500ms, 510ms;
  /* add this */
  animation-timing-function: linear, linear, linear;
}


.shuffle {
  animation-name: move-right, send-to-back, move-left;
  animation-duration: 500ms, 10ms, 500ms;
  animation-delay: 0ms, 500ms, 510ms;
  /* add this */
  animation-timing-function: linear, linear, linear;
}

@keyframes move-right {
  from {
    z-index: var(--num-cards);
    left: calc(var(--xaxis-start-point) - (var(--card-width) / 2));
  }

  to {
    z-index: var(--num-cards);
    left: calc(var(--xaxis-start-point) - (var(--card-width) / 2) + 300px);
  }
}

@keyframes send-to-back {
  from {
    z-index: var(--num-cards);
    left: calc(var(--xaxis-start-point) - (var(--card-width) / 2) + 300px);
  }

  to {
    z-index: 1;
    left: calc(var(--xaxis-start-point) - (var(--card-width) / 2) + 300px);
  }
}

@keyframes move-left {
  from {
    z-index: 1;
    left: calc(var(--xaxis-start-point) - (var(--card-width) / 2) + 300px);
    top: var(--offset-amount);
  }

  to {
    z-index: 1;
    left: calc((var(--xaxis-start-point) - (var(--card-width) / 2)) + var(--offset-amount) * 4);
    top: calc(var(--offset-amount) * 5);
  }
}
</style>