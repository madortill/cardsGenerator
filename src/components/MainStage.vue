<template>
    <div>
        <ColorPicker></ColorPicker>
        <div class="flex-container" :style = "{backgroundImage: 'url(src/assets/cardsAssets/colors/' + this.theme + '/images/general/bg.svg)'}">
            <input class="title-input" type="text" placeholder="שם הלומדה"/>
        </div>
    </div>
</template>

<script>
import ColorPicker from './ColorPicker.vue';

export default {
    name: "main-stage",
    data() {
        return {};
    },
    component: {},
    props: ["theme"],
    methods: {},
    components: { ColorPicker },
}

</script>

<style scoped>
    .title-input {
        border-radius: 3rem;
        font-size: 2rem;
        border: none;
        padding-right: 0.25rem;
        margin: auto;
        background-image:url("src/assets/colorNeutralAssets/home_header.svg");
    }

    .flex-container {
        display: flex;
        height: 100vh;
        width: 66.67vw;
        position: absolute;
        left: 0;
        /* background-image: url(@/assets/cards-assets/colors/lightBlue/images/general/bg.svg) */
    }
</style>