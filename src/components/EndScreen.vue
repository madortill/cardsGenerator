<template>
    <div id="endScreen">
        <div class="flower-container">
            <FlowerSvg v-for="(flower, index) in flowersOnscreen" :flowerColors="colorArray[flower.colorIndex]"
                :key="flower.leftPosition" class="flower" :style="`left: ${flower.leftPosition}`"></FlowerSvg>
        </div>
        <div class="end-text">
            <SubjectBtnSvg class="svg" :secondaryColor="theme.themeColor.secondaryColor" :primaryColor="theme.themeColor.primaryColor">
            </SubjectBtnSvg>
            <h1>יש לכם לומדה מוכנה!</h1>
            <div class="text">
                <span>השלב האחרון הוא להוריד את הקובץ שקיבלתם ולשלוח לנו אותו בכתובת: </span>
                <br>
                <a href="mailto:mador.till.mop@gmail.com">mador.till.mop@gmail.com</a>
                <br>
                <br>
            </div>
            <div>
                <a :href="this.downloadURL" download="data.json" class="download">
                    <button class="action-btn">
                    <svg class="share-icon" viewBox="0 0 512 512">
                        <g>
                        	<path d="M188.821,377.6c37.49,37.491,98.274,37.491,135.765,0.001c0,0,0.001-0.001,0.001-0.001l68.523-68.523   c12.712-12.278,13.064-32.536,0.786-45.248c-12.278-12.712-32.536-13.064-45.248-0.786c-0.267,0.257-0.529,0.52-0.786,0.786   l-59.371,59.349L288,32c0-17.673-14.327-32-32-32l0,0c-17.673,0-32,14.327-32,32l0.448,290.709l-58.901-58.901   c-12.712-12.278-32.97-11.926-45.248,0.786c-11.977,12.401-11.977,32.061,0,44.462L188.821,377.6z" fill="currentColor"/>
                        	<path d="M480,309.333c-17.673,0-32,14.327-32,32v97.941c-0.012,4.814-3.911,8.714-8.725,8.725H72.725   c-4.814-0.012-8.714-3.911-8.725-8.725v-97.941c0-17.673-14.327-32-32-32s-32,14.327-32,32v97.941   C0.047,479.42,32.58,511.953,72.725,512h366.549c40.146-0.047,72.678-32.58,72.725-72.725v-97.941   C512,323.66,497.673,309.333,480,309.333z" fill="currentColor"/>
                        </g>
                    </svg>
                    <span>הורדה</span>
                    </button>
                </a>
                <button href="" @click="this.share" v-if="testFileForShare" class="action-btn">
                    <svg alt="share icon" class="share-icon" viewBox="0 0 512.629 512.629">
                        <path
                            d="M0.006,256.014c-0.218,54.774,44.009,99.354,98.784,99.572c25.226,0.1,49.543-9.416,68-26.612l147.797,66.731   c-1.027,5.526-1.59,11.127-1.685,16.747c-0.174,55.152,44.393,100.002,99.545,100.177s100.002-44.393,100.177-99.545   s-44.393-100.002-99.545-100.177c-32.951-0.104-63.832,16.053-82.534,43.182L191.686,293.39   c9.863-23.816,9.901-50.567,0.107-74.411l138.667-63.019c31.225,45.161,93.148,56.457,138.309,25.232S525.225,88.045,494,42.884   s-93.148-56.457-138.309-25.232c-26.895,18.596-42.926,49.227-42.875,81.925c0.09,5.628,0.661,11.237,1.707,16.768L167.11,183.331   c-39.939-37.503-102.718-35.528-140.221,4.411C9.532,206.228-0.088,230.657,0.006,256.014z"
                            fill="currentColor" />
                    </svg>
                    <span>שיתוף</span>
                </button>
            </div>
        </div>
    </div>
    <!-- <a :href="`https://madortill.github.io/${this.lomdaTitle}/code/`">https://madortill.github.io/{{ this.lomdaTitle }}/code/</a> -->
    <!-- <vue-qrcode :value="`https://madortill.github.io/${this.lomdaTitle}/code/`" tag="svg"
        :options="{ width: 148, color: {light: '#00000000'} }"></vue-qrcode> -->
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode';
import FlowerSvg from './svg/FlowerSvg.vue';
import SubjectBtnSvg from './svg/SubjectBtnSvg.vue';
import { theme } from '../store.js';

export default {
    name: "endingStage",
    props: { "lomdaTitle": String, "JsonData": String },
    components: { VueQrcode, FlowerSvg, SubjectBtnSvg },
    data() {
        return {
            theme,
            colorArray: [
                // Make sure all colors are 6 digit hex
                {
                    name: "lightBlue",
                    hebrawName: "תכלת",
                    primaryColor: "#20c5f2",
                    secondaryColor: "#1de8f7",
                    textColor: "#1c3f55",
                    gradient: "#27c5f2",
                    buttonsColor: "#1c3f55"
                }, {
                    name: "pink",
                    hebrawName: "ורוד",
                    primaryColor: "#eda8ec",
                    secondaryColor: "#c23ac0",
                    textColor: "#260129",
                    gradient: "#e586d7",
                    buttonsColor: "#260129"
                }, {
                    name: "yellow",
                    hebrawName: "צהוב",
                    primaryColor: "#FCB328",
                    secondaryColor: "#FDDE2E",
                    textColor: "#414042",
                    gradient: "#ffa700",
                    buttonsColor: "#414042"
                }, {
                    name: "lightPurple",
                    hebrawName: "סגול בהיר",
                    primaryColor: "#9E7FAD",
                    secondaryColor: "#562d66", //previous color: "#9B6BAE",
                    textColor: "#180926",
                    gradient: "#683f91", // previous color:  "#3D2768",
                    buttonsColor: "#180926"
                }, {
                    name: "darkBlue",
                    hebrawName: "כחול כהה",
                    primaryColor: "#223D6D",
                    secondaryColor: "#516FA5 ",
                    textColor: "#031520", // "#223d6d",
                    gradient: "#516FA5",
                    buttonsColor: "#031520"
                }, {
                    name: "brown",
                    hebrawName: "חום",
                    primaryColor: "#a7603b",
                    secondaryColor: "#5c321c",
                    textColor: "#361d10",
                    gradient: "#602003",
                    buttonsColor: "#361d10"
                }, {
                    name: "torquise",
                    hebrawName: "טורקיז",
                    primaryColor: "#1aa3a3",
                    secondaryColor: "#67dfcb",
                    textColor: "#1f3e3e",
                    gradient: "#629191",
                    buttonsColor: "#1f3e3e"
                },
                // Colors not tested
                {
                    name: "maroon",
                    hebrawName: "בורדו",
                    primaryColor: "#5b0616", // 4D243D
                    secondaryColor: "#b91835",
                    textColor: "#2e0002",
                    gradient: "#2e0002",
                    buttonsColor: "#2e0002"
                },
                {
                    name: "ballet-pink",
                    hebrawName: "ורוד-בלט",
                    primaryColor: "#f97394",
                    secondaryColor: "#ffb3c6",
                    textColor: "#3a1820",
                    gradient: "#ff8fab",
                    buttonsColor: "#3a1820"
                },
            ],
            flowersOnscreen: [],
            colorIndex: 0,
            downloadFile: '',
            downloadURL: ''
        }
    },
    methods: {
        share(event) {
            event.preventDefault();
            navigator.share({
                file: this.downloadFile,
                title: 'מידע ללומדה🙂',
                text: 'שולחים לכם את המידע שקיבלנו מתוך מחולל הלומדות',
            })
        },
        testFileForShare() {
            navigator.canShare(this.downloadFile)
        }
    },
    mounted() {
        this.flowersOnscreen.push({ leftPosition: `${Math.ceil(Math.ceil(Math.random() * 100 / 2) * 2)}%`, colorIndex: this.colorIndex });
        let savedIndex;
        setInterval(() => {
            savedIndex = this.flowersOnscreen.length;
            // I have no idea why the -1 is needed but otherwise this.colorIndex is equal to the length and an error occurs
            this.colorIndex++;
            this.flowersOnscreen.push({ leftPosition: `${Math.ceil(Math.ceil(Math.random() * 100 / 2) * 2)}%`, colorIndex: this.colorIndex % this.colorArray.length });
            setTimeout((savedIndex) => {
                this.flowersOnscreen.splice(savedIndex, 1)
            }, 4000)
        }, 200);
        this.downloadFile = new Blob([String(this.JsonData)], { type: 'text/plain' });
        this.downloadURL = window.URL.createObjectURL(this.downloadFile);
    }
}
</script>

<style scoped>
#endScreen {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0ffff;
}

.end-text {
    z-index: 1;
    position: relative;
    top: -10%;
    width: 40rem;
    /* height: 50%; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* min-height: 28%; */
    min-height: 20%;
    padding-top: 5rem;

}

.flower {
    position: absolute;
    top: -10rem;
    animation: fall 3s ease-in;
}

.text {
    font-size: 1.2rem;
    max-width: 65%;
    word-wrap: break-word;
    text-align: center;
    margin-left: 2%;
}

a {
    color: v-bind("theme.themeColor.secondaryColor");
    filter: brightness(0.75);
}

.download {
    text-decoration: none;
    font-size: 1.2rem;
    filter: brightness(1);
    width: fit-content;
    height: fit-content;
    display: inline-block;
}

.flower-container {
    display: contents;
}

.svg {
    top: 0;
    left: 0;
}

.action-btn {
    color: v-bind("theme.themeColor.secondaryColor");
    margin-top: 0.5rem;
    filter: brightness(0.75);
    /* border:  */
    display: inline-flex;
    align-items: center;
    border: 1px v-bind("theme.themeColor.secondaryColor") solid;
    border-radius: 0.5rem;
    padding: 0.25rem 0.5rem;
    gap: 0.4rem;
    width: fit-content;
    font-size: 1.2rem;
    margin: 0.5rem 0.5rem 0rem;
}

.action-btn:hover {
    filter: brightness(0.55);
}

.action-btn:active {
    filter: brightness(1);
    background-color: v-bind("theme.themeColor.secondaryColor");
    color: white;
}

.share-icon {
    display: inline;
    height: 1.1em;
    width: auto;
    min-width: 1.1em;
}

@keyframes fall {
    0% {
        top: -10rem;
    }

    100% {
        top: 100%;
    }
}
/* SVG class */
.st0 {
    fill-rule: evenodd;
    clip-rule: evenodd;
    fill: currentColor;
    stroke-width: 16;
}


</style>