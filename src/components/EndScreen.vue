<template>
    <div id="endScreen">
        <div class="flower-container">
            <FlowerSvg v-for="(flower, index) in flowersOnscreen" :theme="colorArray[flower.colorIndex]" :key="flower.leftPosition" class="flower" :style="`left: ${flower.leftPosition}`"></FlowerSvg>
        </div>
        <div class="end-text">
            <SubjectBtnSvg class="svg" :secondaryColor="theme.secondaryColor" :primaryColor="theme.primaryColor"></SubjectBtnSvg>
            <h1>יש לכם לומדה מוכנה!</h1>
            <div class="text">
                <span>השלב האחרון הוא להוריד את הקובץ שקיבלתם ולשלוח לנו אותו בכתובת </span>
                <a href="mailto:mador.till.mop@gmail.com">mador.till.mop@gmail.com</a>
                <br> 
                <br> 
                <!-- <a :href="`https://madortill.github.io/${this.lomdaTitle}/code/`">https://madortill.github.io/{{ this.lomdaTitle }}/code/</a> -->
            </div>
            <a :href="downloadURL" download="data.json" class="download">לחצו כאן להורדת הקובץ</a>
            <!-- <vue-qrcode :value="`https://madortill.github.io/${this.lomdaTitle}/code/`" tag="svg"
                :options="{ width: 148, color: {light: '#00000000'} }"></vue-qrcode> -->
        </div>
        </div>
        
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode';
import FlowerSvg from './svg/FlowerSvg.vue';
import SubjectBtnSvg from './svg/SubjectBtnSvg.vue';

export default {
    name: "endingStage",
    props: {"lomdaTitle": String, "theme": Object, "JsonData": String},
    components: { VueQrcode, FlowerSvg, SubjectBtnSvg },
    data () {
        return {
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
          downloadURL: ''
        }
    },
    mounted() {
        this.flowersOnscreen.push({leftPosition: `${Math.ceil(Math.ceil(Math.random() * 100/ 2)* 2)}%`, colorIndex: this.colorIndex});
        let savedIndex;
        setInterval(() => {
            savedIndex = this.flowersOnscreen.length;
            // I have no idea why the -1 is needed but otherwise this.colorIndex is equal to the length and an error occurs
            this.colorIndex++;
            this.flowersOnscreen.push({leftPosition: `${Math.ceil(Math.ceil(Math.random() * 100/ 2)* 2)}%`, colorIndex: this.colorIndex % this.colorArray.length});
            setTimeout((savedIndex) => {
                this.flowersOnscreen.splice(savedIndex, 1)
            }, 4000)
        }, 200);

        this.downloadURL = window.URL.createObjectURL(new Blob([String(this.JsonData)], { type: 'text/plain' }));
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
    max-width: 75%;
    word-wrap: break-word;
    text-align: center;
    margin-left: 2%;
}

a {
    color: v-bind("theme.secondaryColor");
    filter: brightness(0.75);
}

.download {
    margin-top: auto;
    font-size: 1.2rem;
}

.flower-container {
    display: contents;
}

.svg {
    top: 0;
    left: 0;
}

@keyframes fall {
    0% {
        top: -10rem;
    } 100% {
        top: 100%;
    }
}
</style>