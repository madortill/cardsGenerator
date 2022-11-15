<template>
    <div>
        <ColorPicker></ColorPicker>
        <div class="grid-container"
            :style="{ backgroundImage: 'url(src/assets/cardsAssets/colors/' + theme.name + '/images/general/bg.svg)' }">
            <div class="input-container">
                <input v-model="title" class="title-input" type="text" placeholder="שם הלומדה" @input="$emit('titleChange', this.title)" />
            </div>
            <div class="cardsContainer">
                <div class="learningCard"
                    :style="{ backgroundImage: 'url(src/assets/cardsAssets/colors/' + theme.name + '/images/learning/subject_btn.svg)' }"
                    v-for="(value, index) in subjectArray" :key="'title' + index">
                    <div class="subject">{{ value }}</div>
                </div>
                <div class="learningCard"
                    :style="{ backgroundImage: 'url(src/assets/cardsAssets/colors/' + theme.name + '/images/learning/subject_btn.svg)' }">
                    <div class="subject">הוספת נושא</div>
                    <div :style="{ backgroundImage: 'url(src/assets/cardsAssets/colors/' + theme.name + '/images/learning/Artboard_4.svg)' }"
                        class="icon">
                        <img src="@/assets/colorNeutralAssets/plus-small.svg" class="plus" />
                    </div>
                </div>
                <div class="button-container">
                    <span class="button"><img src="@/assets/colorNeutralAssets/plus-small.svg" class="plus-button" /> הוספת מבחן</span>
                    <span class="button"><img src="@/assets/colorNeutralAssets/plus-small.svg" class="plus-button" />הוספת תרגול</span>
                </div>
            </div>
            <div class="save-and-continue">שמירה והמשך</div>
        </div>
    </div>
</template>

<script>
import ColorPicker from './ColorPicker.vue';

export default {
    name: "main-stage",
    data() {
        return {
            title: "",
            color: "#000"
        };
    },
    component: {},
    props: {"subjectArray": Array, "theme": Object},
    methods: {},
    computed: {},
    components: { ColorPicker },
}

</script>

<style scoped>
.grid-container {
    height: 100vh;
    width: 66.67vw;
    position: absolute;
    left: 0;
    display: grid;
    grid-template-rows: 1fr 7.3fr 0.7fr;
}

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
    background-image: url("src/assets/colorNeutralAssets/home_header.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 2rem 0rem 1rem 2rem;
    width: 20rem;
    height: fit-content;
    grid-area: 1/ 1/ span 1 / span 1;
    justify-self: center;
}

.cardsContainer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    grid-area: 2 / 1 / span 1 / span 1;
    width: 100%;
    gap: 1rem;
    overflow-y: auto;
    transform: translateX(0%);
    scrollbar-color: rgba(211, 211, 211, 0.685) darkgrey;
    scrollbar-width: 15px;
}

.learningCard {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 16rem;
    width: 24rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    text-align: center;
}

.subject {
    color: v-bind("theme.textColor");
}

.icon {
    width: 1.6em;
    height: 1.6em;
    top: 3em;
    left: 0.4em;
    margin-top: 1rem;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
}

.plus {
    width: 1.5em;
}

.button-container {
    display: block;
    margin: auto;
    width: 100%;
    display: flex;
    justify-content: center;
}

.button {
    color: white;
    border: white solid 0.1rem;
    border-radius: 0.7rem;
    padding: 0.5rem 3rem 1rem;
    margin: 1rem 1rem;
}

.plus-button {
    width: 1.5rem;
    border: white solid 0.1rem;
    border-radius: 50%;
    position: relative;
    top: 0.5rem;
    margin-left: 0.4rem; 
}

.save-and-continue {
    background-color: v-bind('theme.textColor');
    color: white;
    z-index: 2;
    padding: 0.5rem 1rem;
    margin-left: 2rem;
    border-radius: 0.4rem;
    font-size: 1.1rem;
    grid-area: 3/ 1/ span 1/ span 1;
    align-self: center;
    justify-self: flex-end;
    width: fit-content;
}

.cardsContainer::-webkit-scrollbar {
  width: 15px;
}
 
.cardsContainer::-webkit-scrollbar-track {
  border-radius: 0.4rem;
  background-color: rgba(211, 211, 211, 0.686);
}

 
.cardsContainer::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  border-radius: 0.4rem;   
}

.cardsContainer::-webkit-scrollbar-thumb:hover {
    background-color: rgb(136, 134, 134); 
}

</style>