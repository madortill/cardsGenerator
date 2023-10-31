<script>
import Instructions from './components/Instructions.vue'
import OpenScreen from './components/OpenScreen.vue'
import EditStage from './components/EditStage.vue'
import LoadingScreen from './components/LoadingScreen.vue'
import EndScreen from './components/EndScreen.vue'


export default {
  components: { OpenScreen, Instructions, EditStage, LoadingScreen, EndScreen},
  data() {
    return {
      currentStage: 0,
      lomdaTitle: '',
      theme: '',
      jsonData: '',
      finishedBase64Converting: false
    }
  },
  methods: {
    // request to save the js in the server
    async initFetch(data) {
      this.currentStage = 3;
      this.lomdaTitle = data["TITLE"];
      this.theme = data["THEME"];
      const url2 = `https://api.github.com/search/commits?q=repo:freecodecamp/freecodecamp author-date:2022-04-01..2022-04-30`;
      const reponse = await fetch(url2, {
        "method": "GET",
        // body: JSON.stringify(this.data)
      });
      const result = await reponse.json();
      this.jsonData = data;
      // result.items.forEach(i => console.log(i, i.full_name));
      // Time out so the loading screen will not disappear immediatly
      setTimeout(() => {
      this.currentStage = 4;
      removeEventListener("beforeunload", this.onBeforeUnload ,true);
      }, 1900);
    },
    onBeforeUnload(event) {
      event.preventDefault();
      return (event.returnValue = "");
    },
    proccessData (key, value) {
        if (key === "picFile" || key === "videoFile") {
          return undefined;
        } else {
          return value
        }
      }
  },
  mounted() {
    addEventListener("beforeunload", this.onBeforeUnload, true);
  }
}

</script>

<template>
  <!-- there is no instructions yet, so openScreen increase currentStage by 2 to skip it -->
    <open-screen @next-stage="currentStage+=2" v-if="currentStage === 0"></open-screen>
    <instructions v-else-if="currentStage === 1"></instructions>
    <edit-stage v-else-if="currentStage === 2" @next-stage="initFetch"></edit-stage>
    <loading-screen v-else-if="currentStage === 3"></loading-screen>
    <end-screen v-else-if="currentStage === 4" :lomdaTitle="lomdaTitle" :theme="this.theme" :JsonData="JSON.stringify(this.jsonData, proccessData)"></end-screen>
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

/* sweet alert styles */

.swal-footer {
  text-align: left;
  direction: rtl;
}

.swal-button:focus {
  outline-color: white;
}

.swal-button:hover {
  filter: contrast(120%);
}
</style>

<!-- Add powershell file that enables to add new color (clone files and replace their colors based on three parameters). Add option to test it? -->