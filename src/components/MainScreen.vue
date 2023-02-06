<template>
    <div>
        <ColorPicker :theme="theme" @change-color="changeColor"></ColorPicker>
        <div class="grid subj-container">
            <Bg_svg class="background svg" :color="theme.primaryColor"></Bg_svg>
            <div class="paper-clip-title first-paper-clip">
                <input v-model="title" class="paper-clip-content title-input" type="text" placeholder="הכניסו שם ללומדה" @input="checkValidity" @focus="inputFocus" @focusout="inputFocus"/>
            </div>
            <div :class="['error-message', 'error-message-position', showErrorMessage ? '': 'none']" ref="errorMessage">
                <div class="up-error-triangle triangle-position"></div>
                <div class="message">
                    <img src="@/assets/colorNeutralAssets/triangle-warning.svg" alt="warning symbol" class="warning" />
                    <span class="text">יש למלא את השדה</span>
                </div>
            </div>
            <div class="cardsContainer scrollStyle">
                <div class="subjCard" v-for="(value, index) in subjectArray" :key="'title' + index" @click="$emit('go-to-subject', value)">
                    <SubjectBtnSvg class="svg" :primaryColor="theme.primaryColor" :secondaryColor="theme.secondaryColor" ></SubjectBtnSvg>
                    <div class="subject">{{ value }}</div>
                </div>
                <div class="subjCard"  @click="$emit('go-to-subject', 'newSubject')">
                    <SubjectBtnSvg class="svg" :primaryColor="theme.primaryColor" :secondaryColor="theme.secondaryColor" ></SubjectBtnSvg>
                    <div class="subject">הוספת נושא</div>
                    <CircleSvg class="icon" :color="theme.buttonsColor"></CircleSvg>
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
            showErrorMessage: false
        };
    },
    props: {"subjectArray": Array, "theme": Object},
    methods: {
        changeColor(theme) {
            this.$emit("change-color", theme);
        },
        inputFocus(event) {
            if (event.currentTarget.getAttribute('placeholder')) {
                event.currentTarget.setAttribute('placeholder', '')
            } else {
                event.currentTarget.setAttribute('placeholder', "הכניסו את שם הנושא");
                if (!event.currentTarget.value) {
                    this.showErrorMessage = true;
                }
            }
        },
        checkValidity(event) {
            if (event.currentTarget.value) {
                this.showErrorMessage = false;
                this.$emit('title-change', this.title);
            }
        }
    },
    computed: {},
    components: { ColorPicker, SubjectBtnSvg, CircleSvg, Bg_svg },
}

</script>

<style scoped>
.subj-container {
    height: 100vh;
    width: 66.67vw;
}

.background {
    height: 100vh;
    width: 66.67vw;
}

.title-input {
    width: 24rem; 
}

.first-paper-clip {
    width: 24rem;
    grid-area: 1/ 1/ span 1 / span 1;
}

.cardsContainer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    align-content: flex-start;
    grid-area: 2 / 1 / span 1 / span 1;
    width: 94.4%;
    gap: 1rem;
    overflow-y: auto;
    transform: translateX(0%);
    justify-self: center;
}

.subjCard {
    height: 16rem;
    width: 24rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    text-align: center;
    position: relative;
    cursor: pointer;
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
    background-color: v-bind('theme.buttonsColor');
    color: white;
    z-index: 1;
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

/* error message */
.error-message-position {
    right: 27.5vw;
    top: 6.6rem;
}

.triangle-position {
    right: 5rem;
}
</style>