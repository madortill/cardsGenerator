<template>
    <div id="endScreen">
        <FlowerSvg v-for="(flower, index) in flowersOnscreen" :theme="colorArray[index % colorArray.length]" :key="index" class="flower" :style="`left: ${flower.leftPosition}`"></FlowerSvg>
        <div class="end-text">
            <SubjectBtnSvg class="svg" :secondaryColor="theme.secondaryColor" :primaryColor="theme.primaryColor"></SubjectBtnSvg>
            <h1>יש לכם לומדה מוכנה!</h1>
            <div class="text">קישור ללומדה: <a
                    :href="`https://madortill.github.io/${this.lomdaTitle}/code/`">https://madortill.github.io/{{ this.lomdaTitle }}/code/</a>
            </div>
            <vue-qrcode :value="`https://madortill.github.io/${this.lomdaTitle}/code/`" tag="svg"
                :options="{ width: 148, color: {light: '#00000000'} }"></vue-qrcode>
        </div>
        </div>
        
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode';
import FlowerSvg from './svg/FlowerSvg.vue';
import SubjectBtnSvg from './svg/SubjectBtnSvg.vue';

export default {
    name: "loadingStage",
    props: ["lomdaTitle", "theme"],
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
        }
    },
    mounted() {
        this.flowersOnscreen.push(this.colorArray[Math.round(Math.random() * this.colorArray.length)].name);
        setInterval(() => {
            this.flowersOnscreen.push({leftPosition: `${Math.ceil(Math.ceil(Math.random() * 100/ 2)* 2)}%`});
        }, 200);
    }
}
</script>

<style>
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
    width: 40rem;
    /* height: 50%; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.flower {
    position: absolute;
    top: -10rem;
    animation: fall 3s ease-in;
}

.text {
    font-size: 1.2rem;
    margin-bottom: 22px;
    max-width: 78%;
    word-wrap: break-word;
    text-align: center;
}

@keyframes fall {
    0% {
        top: -10rem;
    } 100% {
        top: 100%;
    }
}
</style>