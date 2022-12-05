<template>
    <div>
        <!-- <Bg_svg class="background" :primaryColor="theme.primaryColor"></Bg_svg> -->
        <div class="info-container grid">
            <Bg_svg class="background svg" :primaryColor="theme.primaryColor"></Bg_svg>
            <div class="input-container paper-clip-title">
                <input v-model="subjName" class="subj-input paper-clip-content" type="text" placeholder="הכניסו את שם הנושא" @input="$emit('title-change', title)" @focus="inputFocus" @focusout="inputFocus"/>
            </div>
            <div class="secondary-subject-container">
                <Secondary-subject></Secondary-subject>
                <div class="button-container">
                    <span class="button" @click="addSecondarySubject"><img src="@/assets/colorNeutralAssets/plus-small.svg" class="plus-button" /> הוספת תת נושא</span>
                    <span class="button" @click="$emit('to-practice')"><img src="@/assets/colorNeutralAssets/plus-small.svg" class="plus-button" />הוספת תרגול</span>
                </div>
            </div>
            <div class="save-and-continue">שמירה והמשך</div>
        </div>
    </div>
</template>

<script>
import Bg_svg from './svg/Bg_svg.vue'
import SecondarySubject from './SecondarySubject.vue'

export default {
  components: { Bg_svg, SecondarySubject },
    name: "InputScreen",
    data() {
        return {
            subjName: ""
        }
    },
    props: ["subjData", "theme"],
    methods: {
        changeColor(theme) {
            this.$emit("change-color", theme);
        },
        inputFocus(event) {
            event.currentTarget.getAttribute('placeholder') ?  event.currentTarget.setAttribute('placeholder', '') : event.currentTarget.setAttribute('placeholder', "הכניסו את שם הנושא");
        },
        addSecondarySubject () {
            this.subjData.push("הכנס תת-נושא");
            console.log(this.subjData);
        }
    },
}
</script>

<style scoped>
.background {
    width: 100vw;
    height: 100vh;
}

.info-container {
    height: 100vh;
    width: 100vw;
}


.input-container {
    width: 24rem;
    grid-area: 1/ 1/ span 1 / span 1;
}


.secondary-subject-container {
    display: flex;
    flex-direction: column;
    grid-area: 2/ 1/ span 1 / span 1;
}


.button-container {
    display: block;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 0;
}

.button {
    color: white;
    border: white solid 0.1rem;
    border-radius: 0.7rem;
    padding: 0.1rem 2rem 0.7rem;
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

</style>