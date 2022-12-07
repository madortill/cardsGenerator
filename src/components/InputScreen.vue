<template>
    <div>
        <!-- <Bg_svg class="background" :primaryColor="theme.primaryColor"></Bg_svg> -->
        <div class="info-container grid">
            <Bg_svg class="background svg" :primaryColor="theme.primaryColor"></Bg_svg>
            <div class="input-container paper-clip-title">
                <input v-model="newSubjName" class="subj-input paper-clip-content" type="text" placeholder="הכניסו את שם הנושא" @focus="inputFocus" @focusout="inputFocus"/>
            </div>
            <div class="secondary-container">
                <Secondary  v-for="(secondaryData, secondaryKey, index) in subjData['learningContent']" :key="('secondary-' + index)" :secondaryName = "secondaryKey" :secondaryData = "secondaryData" :theme="theme"></Secondary>
                <div class="button-container">
                    <span :class="[dynamicDisabled, 'button']" @click="addSecondary"><img src="@/assets/colorNeutralAssets/plus-small.svg" class="plus-button" /> הוספת תת נושא</span>
                    <span class="button" @click="$emit('to-practice')" v-if="(Object.keys(subjData['learningContent']).length > 0)"><img src="@/assets/colorNeutralAssets/plus-small.svg" class="plus-button" />הוספת תרגול</span>
                </div>
            </div>       
            <div class="save-and-exit">חזרה לדף הבית</div>
        </div>
    </div>
</template>

<script>
import Bg_svg from './svg/Bg_svg.vue'
import Secondary from './Secondary.vue'

export default {
  components: { Bg_svg, Secondary },
    name: "InputScreen",
    data() {
        return {
            newSubjName: this.chosenSubject,
            dynamicDisabled: "enabled"
        }
    },
    props: ["subjData", "chosenSubject", "theme"],
    methods: {
        inputFocus(event) {
            event.currentTarget.getAttribute('placeholder') ?  event.currentTarget.setAttribute('placeholder', '') : event.currentTarget.setAttribute('placeholder', "הכניסו את שם הנושא");
        },
        addSecondary () {
            if (this.dynamicDisabled !== "disabled") {
                this.subjData["learningContent"][""] =  {};
                this.dynamicDisabled = "disabled";
            }
        },
    },
}
</script>

<style scoped>
.background {
    width: 100vw;
    /* height: v-bind("Math.max(document.documentElement.scrollHeight)"); */
    height: 100%;
}

.info-container {
    width: 100vw;
    height: 100%;

}

.input-container {
    width: 24rem;
    grid-area: 1/ 1/ span 1 / span 1;
}

.secondary-container {
    display: flex;
    flex-direction: column;
    grid-area: 2/ 1/ span 1 / span 1;
    margin: 1rem 10rem;
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

.save-and-exit {
    background-color: v-bind('theme.buttonsColor');
    color: white;
    z-index: 2;
    padding: 0.5rem 1rem;
    margin-left: 2rem;
    border-radius: 0.4rem;
    font-size: 1.3rem;
    grid-area: 3/ 1/ span 1/ span 1;
    align-self: center;
    justify-self: flex-end;
    width: fit-content;
    cursor: pointer;
}

.disabled {
  background-color: #a6a6a6; 
  cursor: default;
}

</style>