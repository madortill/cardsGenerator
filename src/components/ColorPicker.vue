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
          gradient: "#27c5f2"
        },{
          name: "pink",
          primaryColor: "#eda8ec",
          secondaryColor: "#c23ac0",
          textColor:"#260129",
          gradient: "#e586d7"
        },{
          name: "orange",
          primaryColor: "#FCB328",
          secondaryColor: "#FDDE2E",
          textColor:"#414042",
          gradient: "#ffa700"
        },{
          name: "lightPurple",
          primaryColor: "#9E7FAD",
          secondaryColor: "#562d66", //previous color: "#9B6BAE",
          textColor:"#414042",
          gradient: "#3D2768"
        },{
          name: "darkBlue",
          primaryColor: "#223D6D",
          secondaryColor: "#516FA5 ",
          textColor:"#031520", // "#223d6d",
          gradient: "#516FA5"
        },{
          name: "brown",
          primaryColor: "#a7603b",
          secondaryColor: "#8f4e2c",
          textColor:"#361d10",
          gradient: "#602003"
        },{
          name: "torquise",
          primaryColor: "#1aa3a3",
          secondaryColor: "#67dfcb",
          textColor:"#1f3e3e",
          gradient: "#629191"
        }
        // {
        //   name: "",
        //   primaryColor: "",
        //   secondaryColor: "",
        //   textColor:"",
        //   gradient: ""
        // },
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
      width: 21em;
    }

    .background-sample {
      width: 6rem;
      height: 6rem;
      margin: 0;
    }

    .color-div {
      margin: 0.5em;
      height: 6rem;
      width: 6rem;
    }

    .chosen {
      border: 3.5px solid white;
      box-shadow:  v-bind("colorArray[currentColorIndex].primaryColor + 'c6'") 0px 0px 6px 3px; 
      margin: calc(0.5em - 3.5px);
    }
</style>