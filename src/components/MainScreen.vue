<template>
    <div>
        <ColorPicker :theme="theme" @change-color="changeColor"></ColorPicker>
        <div class="grid-container">
            <Bg_svg class="background" :primaryColor="theme.primaryColor"></Bg_svg>
            <div class="input-container">
                <input v-model="title" class="title-input" type="text" placeholder="שם הלומדה" @input="$emit('titleChange', title)" @focus="inputFocus" @focusout="inputFocus"/>
            </div>
            <div class="cardsContainer">
                <div class="learningCard" v-for="(value, index) in subjectArray" :key="'title' + index" @click="$emit('go-to-subject', value)">
                    <SubjectBtnSvg class="svg" :primaryColor="theme.primaryColor" :secondaryColor="theme.secondaryColor" ></SubjectBtnSvg>
                    <div class="subject">{{ value }}</div>
                </div>
                <div class="learningCard"  @click="$emit('go-to-subject', 'newSubject')">
                    <SubjectBtnSvg class="svg" :primaryColor="theme.primaryColor" :secondaryColor="theme.secondaryColor" ></SubjectBtnSvg>
                    <div class="subject">הוספת נושא</div>
                    <CircleSvg class="icon" :textColor="theme.textColor"></CircleSvg>
                </div>
                <div class="button-container">
                    <span class="button" @click="$emit('to-exam')"><img src="@/assets/colorNeutralAssets/plus-small.svg" class="plus-button" /> הוספת מבחן</span>
                    <span class="button" @click="$emit('to-practice')"><img src="@/assets/colorNeutralAssets/plus-small.svg" class="plus-button" />הוספת תרגול</span>
                </div>
            </div>
            <div class="save-and-continue">שמירה והמשך</div>
        </div>
    </div>
</template>

<script>
import ColorPicker from './ColorPicker.vue';
import SubjectBtnSvg from './svg/SubjectBtnSvg.vue';
import CircleSvg from './svg/CircleSvg.vue';
import Bg_svg from './svg/Bg_svg.vue';

export default {
    name: "main-stage",
    data() {
        return {
            title: "",
            // color: "#000",
        };
    },
    props: {"subjectArray": Array, "theme": Object},
    methods: {
        changeColor(theme) {
            this.$emit("change-color", theme);
        },
        inputFocus(event) {
            event.currentTarget.getAttribute('placeholder') ?  event.currentTarget.setAttribute('placeholder', '') : event.currentTarget.setAttribute('placeholder', 'שם הלומדה');
        }
    },
    computed: {},
    components: { ColorPicker, SubjectBtnSvg, CircleSvg, Bg_svg },
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

.background {
    position: absolute;
    z-index: -1;
    height: 100vh;
    width: 66.67vw;
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
    background-image: url("@/assets/colorNeutralAssets/home_header.svg");
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
    position: relative;
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
    padding: 0.1rem 2rem 0.7rem;
    margin: 1rem 1rem;
    cursor: pointer;
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
    cursor: pointer;
}

.cardsContainer::-webkit-scrollbar {
  width: 15px;
}
 
.cardsContainer::-webkit-scrollbar-track {
  border-radius: 0.4rem;
  background-color: rgba(211, 211, 211, 0.686);
}

 
.cardsContainer::-webkit-scrollbar-thumb {
    background-color: #e5e5e5;
    border-radius: 0.4rem;
}

.cardsContainer::-webkit-scrollbar-thumb:hover {
    background-color: rgba(136, 134, 134, 0.658); 
}

.svg {
    position: absolute;
    z-index: -1;
}
</style>