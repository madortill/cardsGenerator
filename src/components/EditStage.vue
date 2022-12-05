<template>
  <div>
    <mainStage v-if="(currentStage === 'main')" :theme="theme" :subjectArray="Object.keys(this.cardsData)" @change-color="changeColor" @change-title="updateThings(newValue, 'title')" @go-to-subject="goToSubj"></mainStage>
    <Input-screen v-else-if="(currentStage === 'input')" :subjData="chosenSubject" :theme="theme"></Input-screen>
    <!-- <add-questions type = "test" v-else-if="(currentStage === 'test')"></add-questions> -->
    <!-- <add-questions type = "practice" v-else-if="(currentStage === 'practice')"></add-questions> -->
  </div>
</template>

<script>
import MainStage from './MainScreen.vue'
import InputScreen from './InputScreen.vue'
export default {
      components: { MainStage, InputScreen },
      data() {
        return {
          currentStage: 'main',
          chosenSubject: '',
          theme: {name: "lightBlue",
                    primaryColor: "#20c5f2",
                    secondaryColor: "#1de8f7",
                    textColor: "#1c3f55",
                    gradient: "#27c5f2"
                    },
          cardsData: {
          },
          title: ""
        }
      },
      methods: {
        changeColor (newTheme) {
            this.theme = newTheme;
        },
        changeTitle (newTitle) {
            this.title = newTitle;
        },
        goToSubj (subjName) {
          if (subjName === "newSubject") {
            this.cardsData[""] = {};
            subjName = "";
          } 
          this.currentStage = "input";
          this.chosenSubject = [subjName, this.cardsData[subjName]];
        }
        // updateThings(newValue, varName) {
        //   this[varName] = newValue;
        //   console.log(this[varName])
        // }
      },
      computed: {
        lomdaData() {
            return{
                "TITLE": this.title,
                "AMOUNT_EXAM_QUESTIONS": 0,
                "TIME_FOR_EXAM ": "00:00",
                "DATA": this.cardsData
            }
        }
      }
    }
</script>

<style>

</style>