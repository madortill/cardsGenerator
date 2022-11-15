<template>
  <div class="container"></div>
</template>

<script>
export default {
  name: "colorPicker",
  data() {
    return {
      lightBlue: {
        name: "lightBlue",
        primaryColor: "#20c5f2",
        secondaryColor: "#1de8f7",
        textColor: "#1c3f55",
        gradient: "#27c5f2"
      },
      pink: {
        name: "pink",
        primaryColor: "#eda8ec",
        secondaryColor: "#c23ac0",
        textColor:"#260129",
        gradient: "#e586d7"
      },
      orange: {
        name: "orange",
        primaryColor: "#FCB328",
        secondaryColor: "#FDDE2E",
        textColor:"#414042",
        gradient: "#ffa700"
      },
      lightPurple: {
        name: "lightPurple",
        primaryColor: "#9E7FAD",
        secondaryColor: "#9B6BAE",
        textColor:"#414042",
        gradient: "#3D2768"
      },
      darkBlue: {
        name: "darkBlue",
        primaryColor: "#223D6D",
        secondaryColor: "#516FA5 ",
        textColor:"#223d6d",
        gradient: "#516FA5"
      },
      brown: {
        name: "brown",
        primaryColor: "#a7603b",
        secondaryColor: "#8f4e2c",
        textColor:"#361d10",
        gradient: "#602003"
      },
      color: {
        name: "",
        primaryColor: "",
        secondaryColor: "",
        textColor:"",
        gradient: ""
      },
    }
  }
}
</script>

<style scoped>
    .container {
        width: 33.33vw;
        height: 100vh;
        position: absolute;
        right: 0;
    }
</style>