<script>
import Instructions from './components/Instructions.vue'
import OpenScreen from './components/OpenScreen.vue'
import EditStage from './components/EditStage.vue'


    export default {
      components: { OpenScreen, Instructions, EditStage },
      data() {
        return {
          currentStage: 2,
        }
      },
      methods: {
        changeColor (newTheme) {
            this.theme = newTheme;
        },
        changeTitle (newTitle) {
            this.title = newTitle;
        }
      },
      computed: {
        // data() {
        //     return{
        //         "TITLE": this.title,
        //         "AMOUNT_EXAM_QUESTIONS": 0,
        //         "TIME_FOR_EXAM ": "00:00",
        //         "DATA": this.cardsData
        //     }
        // }
      }
    }
    
</script>

<template>
  <div id="app"> 
    <open-screen @next-stage="currentStage++" v-if="currentStage === 0"></open-screen>
    <instructions v-else-if="currentStage === 1"></instructions>
    <!-- <main-stage v-else-if="currentStage === 2" :theme="theme" :subjectArray="Object.keys(this.cardsData)" @change-color="changeColor" @change-title="changeTitle"></main-stage> -->
    <edit-stage v-else-if="currentStage === 2"></edit-stage>
    <!-- <div>{{ cardsData }}</div> -->
    <!-- <div>{{Object.keys(this.cardsData)}}</div> -->
  </div>
</template>


<style>
  #app {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
  }

  * {
    font-family: Rubik;
    direction: rtl;
  }

  *:not(input) {
    user-select: none;
  }
</style>

<!-- Add powershell file that enables to add new color (clone files and replace their colors based on three parameters). Add option to test it? -->