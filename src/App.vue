<script>
import Instructions from './components/Instructions.vue'
import OpenScreen from './components/OpenScreen.vue'


    export default {
      components: { OpenScreen, Instructions },
      data() {
        return {
          currentStage: 0,
        }
      },
    }
    
</script>

<template>
  <div id="app"> 
    <open-screen @next-stage="currentStage++" v-if="currentStage === 0"></open-screen>
    <instructions v-else-if="currentStage === 1"></instructions>
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
</style>
