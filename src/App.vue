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
      currentStage: 2,
      lomdaTitle: ''
    }
  },
  methods: {
    changeColor(newTheme) {
      this.theme = newTheme;
    },
    // request to save the js in the server
    async initFetch(data) {
      this.currentStage = 3;
      this.lomdaTitle = data["TITLE"];
      const url2 = `https://api.github.com/search/commits?q=repo:freecodecamp/freecodecamp author-date:2022-04-01..2022-04-30`;
      const reponse = await fetch(url2, {
        "method": "GET",
        // body: JSON.stringify(this.data)
      });
      const result = await reponse.json()
      result.items.forEach(i => console.log(i, i.full_name));
      this.currentStage = 4;
    },
    onBeforeUnload(event) {
      event.preventDefault();
      return (event.returnValue = "");
    }
  },
  mounted() {
    addEventListener("beforeunload", this.onBeforeUnload, { capture: true });
  }
}

</script>

<template>
    <open-screen @next-stage="currentStage++" v-if="currentStage === 0"></open-screen>
    <instructions v-else-if="currentStage === 1"></instructions>
    <edit-stage v-else-if="currentStage === 2" @next-stage="initFetch"></edit-stage>
    <loading-screen v-else-if="currentStage === 3"></loading-screen>
    <end-screen v-else-if="currentStage === 4" :lomdaTitle="lomdaTitle"></end-screen>
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

/* .swal-font .swal-title {
  font-family: Rubik;
  direction: rtl;
  font-weight: normal !important;
  color: black;
} */
</style>

<!-- Add powershell file that enables to add new color (clone files and replace their colors based on three parameters). Add option to test it? -->