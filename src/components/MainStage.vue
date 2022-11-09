<template>
    <div class="flex-container">
        <input class="title-input" type="text" placeholder="שם הלומדה"/>
        <div>{{ theme }}</div>
    </div>
</template>

<script>
export default {
    name: "main-stage",
    data() {
        return {
        }
    },
    component: {},
    props: ["theme"],
    methods: {},
}
</script>

<style scoped>
    .title-input {
        border-radius: 3rem;
        font-size: 2rem;
        border: none;
        padding-right: 0.25rem;
        margin: auto;
    }

    .flex-container {
        display: flex;
        background-image: url("@/assets/cards-assets/colors/lightBlue/images/general/bg.svg");
        height: 100vh;
        width: 66.67vw;
        position: absolute;
        left: 0;
    }
</style>