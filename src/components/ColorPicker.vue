<template>
  <div class="container">
    <h1 class="title">בחרו צבע ללומדה</h1>
    <div class="image-flex">
      <div :class="['color-div', currentColorIndex === index ? 'chosen': '']" v-for="color, index in colorArray" :key="color.name" :id="'color' + index" @click="changeTheme" :ref="'color' + index">
        <Bg_svg class="background-sample" :primaryColor="color.primaryColor"></Bg_svg>
      </div>
    </div>
  </div>
</template>

<script>
import Bg_svg from './svg/Bg_svg.vue'
export default {
  components: { Bg_svg },
  name: "colorPicker",
  props: ["theme"],
  data() {
    return {
      currentColorIndex: 0,
      colorArray: [
        {
          name: "lightBlue",
          primaryColor: "#20c5f2",
          secondaryColor: "#1de8f7",
          textColor: "#1c3f55",
          gradient: "#27c5f2",
          buttonsColor: "#1c3f55"
        },{
          name: "pink",
          primaryColor: "#eda8ec",
          secondaryColor: "#c23ac0",
          textColor:"#260129",
          gradient: "#e586d7",
          buttonsColor: "#260129"
        },{
          name: "orange",
          primaryColor: "#FCB328",
          secondaryColor: "#FDDE2E",
          textColor:"#414042",
          gradient: "#ffa700",
          buttonsColor: "#414042"
        },{
          name: "lightPurple",
          primaryColor: "#9E7FAD",
          secondaryColor: "#562d66", //previous color: "#9B6BAE",
          textColor:"#180926",
          gradient: "#683f91", // previous color:  "#3D2768",
          buttonsColor: "#180926"
        },{
          name: "darkBlue",
          primaryColor: "#223D6D",
          secondaryColor: "#516FA5 ",
          textColor:"#031520", // "#223d6d",
          gradient: "#516FA5",
          buttonsColor: "#031520"
        },{
          name: "brown",
          primaryColor: "#a7603b",
          secondaryColor: "#5c321c",
          textColor:"#361d10",
          gradient: "#602003",
          buttonsColor: "#361d10"
        },{
          name: "torquise",
          primaryColor: "#1aa3a3",
          secondaryColor: "#67dfcb",
          textColor:"#1f3e3e",
          gradient: "#629191",
          buttonsColor: "#1f3e3e"
        },
        // Colors not tested
        {
          name: "maroon",
          primaryColor: "#5b0616", // 4D243D
          secondaryColor: "#b91835",
          textColor:"#2e0002",
          gradient: "",
          buttonsColor: "#2e0002"
        },
        {
          name: "ballet-pink",
          primaryColor: "#f97394",
          secondaryColor: "#ffb3c6ff",
          textColor:"#3a1820",
          gradient: "#ff8fabff",
          buttonsColor: "#3a1820"
        },
        // {
        //   name: "",
        //   primaryColor: "",
        //   secondaryColor: "",
        //   textColor:"",
        //   gradient: ""
        // },
        //  --piggy-pink: #ffe5ecff, --pink: #ffc2d1ff, --cherry-blossom-pink: #ffb3c6ff, --baker-miller-pink: #ff8fabff, --ultra-red: #fb6f92ff
      ]
    }
  },
  methods: {
    changeTheme(event) {
      this.currentColorIndex = Number(event.currentTarget.id.slice(5));
      this.$emit("change-color", this.colorArray[event.currentTarget.id.slice(5)]);
    }
  },
}
</script>

<style scoped>
    .title {
      text-align: center;
      font-weight: 800;
      font-family: rubik-semiBold;
    }
    .container {
        width: 33.33vw;
        height: 100vh;
        position: absolute;
        right: 0;
    }

    .image-flex {
      display: flex;
      flex-wrap: wrap;
      margin: auto;
      max-width: 21em;
    }

    .background-sample {
      width: 6rem;
      height: 6rem;
      margin: 0;
    }

    .color-div {
      margin: 0.5em;
      height: 6em;
      width: 6em;
    }

    .chosen {
      border: 3.5px solid white;
      box-shadow:  v-bind("colorArray[currentColorIndex].primaryColor + 'c6'") 0px 0px 6px 3px; 
      margin: calc(0.5em - 3.5px);
    }
</style>