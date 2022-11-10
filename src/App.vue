<script>
import Instructions from './components/Instructions.vue'
import OpenScreen from './components/OpenScreen.vue'
import MainStage from './components/MainScreen.vue'


    export default {
      components: { OpenScreen, Instructions, MainStage },
      data() {
        return {
          currentStage: 2,
          theme: "lightBlue",
          cardsData: {
                "title1": {
                    "icon": `../assets/images//learning/Artboard 4.svg`,
                    "amountOfQuestions": 2,
                    "questionsExam": [
                        {
                            type: "multiple",
                            question: "דוגמה לשאלה אמריקאית מתרגלת שיש לה 4 תשובות?",
                            ans1: "תשובה ראשונה ולא נכונה",
                            ans2: "תשובה שנייה נכונה!",
                            ans3: "תשובה שלישית ולא נכונה",
                            ans4: "תשובה רביעית לא נכונה",
                            correctAns: "ans2"
                        },
                        {
                            type: "binary",
                            sentence: "דוגמה לשאלה מתרגלת נכונה של נכון או לא נכון",
                            trueOrFalse: true
                        }
                    ],
                    "questionsPractice": [
                        {
                            type: "multiple",
                            question: "דוגמה לשאלה אמריקאית בוחנת שיש לה 4 תשובות?",
                            ans1: "תשובה ראשונה ולא נכונה",
                            ans2: "תשובה שנייה נכונה!",
                            ans3: "תשובה שלישית ולא נכונה",
                            ans4: "תשובה רביעית לא נכונה",
                            correctAns: "ans2"
                        },
                        {
                            type: "binary",
                            sentence: "דוגמה לשאלה בוחנת נכונה של נכון או לא נכון",
                            trueOrFalse: true
                        }
                    ],
                    "learningContent": {
                        "תת נושא 1": {
                            "כרטיסייה ראשונה מסוג טקסט": [
                                {
                                    cardType: "youtube",
                                    // Make sure it is embed video!
                                    youtube: "https://www.youtube.com/embed/n0t9iFlGO20",
                                    //  https://www.youtube.com/embed/n0t9iFlGO20
                                    content: "דוגמה לתוכן של כרטיסייה המחולקת לפי נושאים ותתי נושאים."
                                },
                            ],
                            "כרטיסייה שנייה": [
                                {
                                    cardType: "picAndText",
                                    pic: "../assets/images/pic.png",
                                    // content: "דוגמה לכותרת לתמונה הראשונה",
                                }
                            ],
                        },
                        "תת נושא 2": {
                            "כרטיסייה שלישית מסוג וידאו": [
                                {
                                    cardType: "videoAndText",
                                    video: "../assets/images/פתיח.mp4",
                                    content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
                                }
                            ],
                            "כרטיסייה רביעית": [
                                {
                                    cardType: "text",
                                    content: "g"
                                }
                            ]
                        },
                        "תת נושא 3": {
                            "תת תת נושא 12": [
                                {
                                    cardType: "videoAndText",
                                    video: "../assets/images/פתיח.mp4",
                                    content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
                                }
                            ],
                        },
                        "תת נושא 5": {
                            "תת תת נושא 12": [
                                {
                                    cardType: "videoAndText",
                                    video: "../assets/images/פתיח.mp4",
                                    content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
                                }
                            ],
                        }
                    },
                }
            },
        }
      },
    }
    
</script>

<template>
  <div id="app"> 
    <open-screen @next-stage="currentStage++" v-if="currentStage === 0"></open-screen>
    <instructions v-else-if="currentStage === 1"></instructions>
    <main-stage v-else-if="currentStage === 2" :theme="theme" :subjectArray="Object.keys(this.cardsData)"></main-stage>
    <!-- <div>{{ cardsData }}</div> -->
    <!-- <div>{{Object.keys(this.cardsData)}}</div> -->
  </div>
</template>


<style>
  #app {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
  }

  * {
    font-family: Rubik;
    direction: rtl;
  }
</style>
