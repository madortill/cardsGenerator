<template>
    <div>
        <ColorPicker></ColorPicker>
        <div>{{subjectArray}}</div>
        <div class="flex-container"
            :style="{ backgroundImage: 'url(src/assets/cardsAssets/colors/' + this.theme + '/images/general/bg.svg)' }">
            <div class="input-container">
                <input v-model="title" class="title-input" type="text" placeholder="שם הלומדה" @input="$emit('titleChange', this.title)" />
            </div>
            <div class="learningCard"
                :style="{ backgroundImage: 'url(src/assets/cardsAssets/colors/' + this.theme + '/images/learning/subject_btn.svg)' }">
                <div class="subject">הוספת נושא</div>
                <div :style="{ backgroundImage: 'url(src/assets/cardsAssets/colors/' + this.theme + '/images/learning/Artboard_4.svg)' }" class="icon">
                    <img src="src\assets\colorNeutralAssets\plus-small.svg" class="plus"/>
                </div>
            </div>
            <!-- <div class="learningCard"
                :style="{ backgroundImage: 'url(src/assets/cardsAssets/colors/' + this.theme + '/images/learning/subject_btn.svg)' }"
                v-for="(value, index) in subjectArray" :key="'title' + index">
                <div class="subject">{{value}}</div>
                <div :style="{ backgroundImage: 'url(src/assets/cardsAssets/colors/' + this.theme + '/images/learning/Artboard_4.svg)' }" class="icon">
                    <img src="src\assets\colorNeutralAssets\plus-small.svg" class="plus"/>
                </div>
            </div> -->
            </div>
        </div>
</template>

<script>
import ColorPicker from './ColorPicker.vue';

export default {
    name: "main-stage",
    data() {
        return {
            title: ""
        };
    },
    component: {},
    props: ["subjectArray", "theme"],
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
    background-image: url("src/assets/colorNeutralAssets/home_header.svg");
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
    height: 17rem;
    width: 26rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    text-align: center;
}

.icon {
    width: 1.6em;
    height: 1.6em;
    /* position: relative; */
    top: 3em;
    left: 0.4em;
    margin-top: 2rem;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
}

.plus {
    width: 1.5em;
}
</style>