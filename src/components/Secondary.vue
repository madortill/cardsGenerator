<template>
  <div>
    <span class="arrow">></span>
    <input class="title-name" type="text" placeholder="הכניסו תת-נושא" @focus="inputFocus" @focusout="inputFocus">
    <div class="flex-container"></div>
  </div>
</template>

<script>
export default {
  components: { },
    name: "Secondary",
    data() {
        return {

        }
    },
    props: ["subjData", "titleName"],
    methods: {
      inputFocus(event) {
            event.currentTarget.getAttribute('placeholder') ?  event.currentTarget.setAttribute('placeholder', '') : event.currentTarget.setAttribute('placeholder', "הכניסו תת-נושא");
        },
    },
}
</script>

<style scoped>
    .arrow, .title-name {
        color: white;
        font-size: 1.4rem;
    }

    .title-name {
        background-color: transparent;
        border: none;
        box-sizing: border-box;
        margin-right: 1rem;
    }

    .title-name::placeholder {
      color: rgba(255, 255, 255, 0.781)
    }
</style>