<template>
  <div id="loading-screen">
    <div class="vertical-center-wrapper">
      <div class="transition-wrapper">
        <Transition :name="transitionStyle">
          <!-- <div class="card" > -->
            <FinalCardsPreview :theme="colorArray[currentCard]" class="preview" :key="currentCard"></FinalCardsPreview>
            <!-- </div> -->
          </Transition>
        </div>
        <p class="loading-text">יוצר לומדה חדשה...</p>
    </div>
</div>
</template>

<script>
import FinalCardsPreview from "./svg/FinalCardsPreview.vue" 
let interval = '';

export default {
  name: "loadingScreen",
  data() {
      return {
          transitionStyle: '',
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
  components: {FinalCardsPreview },
  methods: {
      next () {
          this.transitionStyle = 'shuffleNext';
          if (this.currentCard < (this.colorArray.length - 1)){
              return (this.currentCard++);
          } else {
              this.currentCard = 0;
          }
      },
  },
  mounted () {
    this.next();
    interval = setInterval(this.next, 1100);
  }
}

</script>

<style scoped>
/* body {
  background: #f6f6f6;
  padding-top: 20px;
} */

#loading-screen {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #f0ffff;
  display: flex;
  align-items: center;
  justify-content: center;
}


.transition-wrapper {
  --card-width: 15rem;
  position: relative;
  /* top: 50%; */
  width: var(--card-width);
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
  min-height: calc(var(--card-width) * 1.79);
}

.preview {
  width: var(--card-width);
  border-radius: 2rem;
  height: auto;
  border-radius: 10px;
  box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.5);
  /* border: 1px solid #000; */
}

.loading-text {
  text-align: center;
  /* position: fixed; */
  /* bottom: 10rem; */
  width: 100%;
  font-size: 2em;
}


/* Shuffle Animations */
@keyframes shuffleNextEnter {
  from {
    /* transform: none; */
  }
to {
  opacity: 0;
  transform: rotate(10deg) translate3d(200px,50px,0);
  }
}

@keyframes shuffleLeave {
from {
  opacity: 0;
  transform: scale(0.7);
}
to {
  opacity: 1;
  transform: none;
}
}

.shuffleNext-leave-active {
animation: shuffleNextEnter 500ms forwards;
}

.shuffleNext-enter-active {
z-index: 0;
animation: shuffleLeave 1000ms forwards;
position: absolute;
top: 0;
right: 0;
}
</style>