<template>
    <div>
        <div class="info-container scrollStyle" ref="infoContainer">
            <Bg_svg class="background svg" :primaryColor="theme.primaryColor"></Bg_svg>
            <div class="input-container paper-clip-title">
                <input v-model="newSubjName" class="subj-input paper-clip-content" type="text"
                    placeholder="הכניסו את שם הנושא" @focus="inputFocus" @focusout="inputFocus"
                    @input="checkValidity" />
                    <div class="error-message error-message-position" ref="errorMessage">
                        <div class="up-error-triangle triangle-position"></div>
                        <div class="message">
                            <img src="@/assets/colorNeutralAssets/triangle-warning.svg" alt="warning symbol" class="warning" />
                            <span class="text">יש למלא את השדה</span>
                        </div>
                    </div>
            </div>
            <div class="secondary-container">
                <Secondary v-for="(secondaryData, secondaryKey) in subjData['learningContent']"
                    :key="secondaryKey" :secondaryName="secondaryKey" :secondaryData="secondaryData"
                    :theme="theme"></Secondary>
                <div class="button-container">
                    <span :class="['button', changesCounter]" @click="addSecondary"><img src="@/assets/colorNeutralAssets/plus-small.svg"
                            class="plus-button" /> הוספת תת נושא</span>
                    <span class="button" @click="$emit('to-practice')"
                        v-if="(Object.keys(subjData['learningContent']).length > 0)"><img
                            src="@/assets/colorNeutralAssets/plus-small.svg" class="plus-button" />הוספת תרגול</span>
                </div>
            </div>
            <div class="save-container">
                <div class="save-and-exit">חזרה לדף הבית</div>
            </div>
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
            changesCounter: 0,
            newSubjName: this.chosenSubject,
        }
    },
    props: { "subjData": Object, "chosenSubject": String, "theme": Object },
    methods: {
        inputFocus(event) {
            if (event.currentTarget.getAttribute('placeholder')) {
                event.currentTarget.setAttribute('placeholder', '')
            } else {
                event.currentTarget.setAttribute('placeholder', "הכניסו את שם הנושא");
                if (!event.currentTarget.value) {
                    console.log(document.querySelector(".error-message"));
                    this.$refs.errorMessage.style.display = "block";
                }
            }
        },
        addSecondary() { 
                let newKey = `secondary ${Object.keys(this.subjData["learningContent"]).length}`;
                console.log("learning content length: " + newKey);
                    this.$set(this.subjData["learningContent"], newKey, {});
                    console.log(this.subjData["learningContent"]);
        }, 
        checkValidity(event) {
            if (event.currentTarget.value) {
                this.$refs.errorMessage.style.display = "none";
            }
        }
    },
    mounted () {
        console.log("mounted")
        console.log(this.subjData["learningContent"]);
    }
}
</script>

<style scoped>
.background {
    width: 100vw;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
}

.info-container {
    width: 99.5vw;
    height: 99.2vh;
    overflow-x: hidden;
    position: relative;
    top: 0.4vh;
    right: 0.25vw;
    /* direction: ltr; */
}

.input-container {
    width: 24rem;
    margin: auto;

}

.secondary-container {
    display: flex;
    flex-direction: column;
    margin: 1rem 10rem;
    direction: rtl;
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
    width: fit-content;
    cursor: pointer;
    margin-bottom: 1rem;
    position: fixed;
    bottom: 1vh;
}

.save-container {
    display: flex;
    width: 100%;
    justify-content: flex-end;
}

.error-message-position {
    right: 44vw;
    top: 6.5rem;
}

.triangle-position {
    right: 5rem;
}
.disabled {
    background-color: #a6a6a6;
    cursor: default;
}
</style>