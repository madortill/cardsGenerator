<template>
  <div>
    <div> hi {{ cardData }}</div>
  </div>
</template>

<script>
export default {
    name: "card",
    data() {
        return {}
    },
    props: ["isQuestion", "topic", "cardData"],
    mounted() {
      console.log("cardData: " + this.cardData)
    }
}
</script>

<style>

</style>