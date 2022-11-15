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
      }
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