<template>
    <div>
        <ColorPicker></ColorPicker>
        <div class="flex-container" :style = "{backgroundImage: 'url(src/assets/cardsAssets/colors/' + this.theme + '/images/general/bg.svg)'}">
            <div class="input-container">
                <input class="title-input" type="text" placeholder="שם הלומדה"/>
            </div>
            <div class="learningCard" :style="{backgroundImage: 'url(src/assets/cardsAssets/colors/' + this.theme + '/images/learning/subject_btn.svg)'}"> 
                <img :src="'src/assets/cardsAssets/colors/' + this.theme + '/images/learning/Artboard 4.svg'" class="icon">
                <div class="subject">הכנס שם של נושא</div>
            </div>
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
        font-size: 1.7rem;
        border: none;
        background-color: transparent;
        text-align: center;
        padding: 0.6rem 1.3rem 0.8rem;
        margin-top: 0.5rem;
        border-radius: 0.8rem;
    }
    
    .input-container {
        background-image:url("src/assets/colorNeutralAssets/home_header.svg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        padding: 3rem 0rem 2rem 2rem;
        width: 20rem;
        height: fit-content;
    }

    .flex-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        width: 66.67vw;
        position: absolute;
        left: 0;
    }

    .learningCard {
        background-repeat: no-repeat;
        background-size: 100% 100%;
        height: 12em;
        width: 17em;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 4.5vmin;
    }

    .icon {
        width: 2em;
        position: relative;
        top: 3em;
        left: 0.4em;
    }
</style>