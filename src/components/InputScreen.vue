<template>
    <div id="InputScreen">
        <div class="info-container scrollStyle" ref="infoContainer">
            <Bg_svg class="background svg" :color="theme.primaryColor"></Bg_svg>
            <div class="input-container paper-clip-title">
                <CustomInput placeholder="הכניסו את שם הנושא" class="paper-clip-content" :path-array="pathArray">
                </CustomInput>
            </div>
            <div class="secondary-container">
                <Secondary v-for="(secondaryObj, index) in this.secondaryArr" :key="'secondaryKey: ' + index"
                    :pathArray="[...pathArray, 'learningContent', index]"></Secondary>
                <div class="button-container">
                    <span :class="['button', changesCounter]" @click="addSubSubject">
                        <img src="@/assets/colorNeutralAssets/plus-small.svg" class="plus-button" alt="plus icon" /> הוספת
                        תת נושא</span>
                    <!-- <span class="button" @click="$emit('to-practice')" v-if="(Object.keys(subjData['learningContent']).length > 0)">
                        <img src="@/assets/colorNeutralAssets/plus-small.svg" class="plus-button" alt="plus icon"/>הוספת תרגול</span> -->
                </div>
            </div>
            <div class="save-container">
                <div class="save-and-exit" @click="$emit('back-to-main');">חזרה לדף הבית</div>
            </div>
            <div class="footer"><span>יש להכניס תוכן בסיווג בלמ"ס בלבד!</span>
                <div class="svg gradient"></div>
            </div>
        </div>
    </div>
</template>



<script>
import Bg_svg from './svg/Bg_svg.vue'
import Secondary from './Secondary.vue'
import CustomInput from './CustomInput.vue'
import { useDataStore } from '../stores/data';
import { mapState ,mapActions } from 'pinia';

export default {
    components: { Bg_svg, Secondary, CustomInput },
    name: "InputScreen",
    props: {"pathArray": Array },
    emits: ["back-to-main"],
    data() {
        return {
            changesCounter: 0,
            showErrorMessage: false,
            duplicateKey: "",
            titleRenderCounter: 0,
        }
    },
    methods: {
        ...mapActions(useDataStore, ["addItem", "getNestedItem"]),
        addSubSubject() {
            this.addItem([...this.pathArray, 'learningContent'], {
                "name": "",
                "error": "",
                "topics": []
            })
        }
    },
    computed: {
        secondaryArr() {
            return this.getNestedItem([...this.pathArray, "learningContent"]);
        },
        ...mapState(useDataStore, {theme: "THEME"}),
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
    padding-bottom: 5vh;
    overflow-x: hidden;
    position: relative;
    top: 0.4vh;
    right: 0.25vw;
    box-sizing: border-box;
}

.input-container {
    width: 24rem;
    margin: auto;
}

.paper-clip-title {
    background-image: url("@/assets/colorNeutralAssets/home_header.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 2rem 0rem 1rem 2rem;
    height: fit-content;
    justify-self: center;
    box-sizing: border-box;
    width: 24rem;
}

.paper-clip-content {
    width: 24rem;
    font-size: 1.7rem;
    border: none;
    background-color: transparent;
    text-align: center;
    padding: 0.6rem 1.3rem 0.8rem;
    margin-top: 0.5rem;
    border-radius: 0.8rem;
    box-sizing: border-box;
}

.paper-clip-content:focus-within {
    outline: black solid 2px;
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
    z-index: 1;
    padding: 0.5rem 1rem;
    margin-left: 2rem;
    border-radius: 0.4rem;
    font-size: 1.3rem;
    width: fit-content;
    cursor: pointer;
    /* margin-bottom: 1rem; */
    position: fixed;
    bottom: 1vh;
}

.save-container {
    display: flex;
    width: 100%;
    justify-content: flex-end;
}

.footer {
    color: rgba(255, 255, 255, 0.83);
    font-size: 1.4rem;
    pointer-events: none;
    padding: 0.5rem 1rem;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 4vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 0;
}


.footer .gradient {
    background-image: linear-gradient(180deg, rgba(103, 223, 203, 0) 0%, v-bind("theme.gradient") 73%);
    height: 100%;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: -2;
}

.footer span {
    margin-top: 1rem;
}
</style>