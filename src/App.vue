<script>
import Instructions from './components/Instructions.vue'
import OpenScreen from './components/OpenScreen.vue'
import MainStage from './components/MainStage.vue'


    export default {
      components: { OpenScreen, Instructions, MainStage },
      data() {
        return {
          currentStage: 2,
          theme: "lightBlue"
        }
      },
    }
    
</script>

<template>
  <div id="app"> 
    <open-screen @next-stage="currentStage++" v-if="currentStage === 0"></open-screen>
    <instructions v-else-if="currentStage === 1"></instructions>
    <main-stage v-else-if="currentStage === 2" :theme="theme"></main-stage>
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
