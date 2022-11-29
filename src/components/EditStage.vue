<template>
  <div>
    <mainStage v-if="currentStage === 2" :theme="theme" :subjectArray="Object.keys(this.cardsData)" @change-color="changeColor" @change-title="changeTitle"></mainStage>
    <!-- <Input-screen v-for></Input-screen> => use v-for  -->
    <!-- <add-questions type = "test"></add-questions> -->
    <!-- <add-questions type = "practice"></add-questions> -->
  </div>
</template>

<script>
import MainStage from './MainScreen.vue'

export default {
      components: { MainStage },
      data() {
        return {
          currentStage: 2,
          theme: {name: "lightBlue",
                    primaryColor: "#20c5f2",
                    secondaryColor: "#1de8f7",
                    textColor: "#1c3f55",
                    gradient: "red" //"#27c5f2"
                    },
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
                },
                "title2" : {},
                "title3" : {},
                "title4" : {},
                "title5" : {},

            },
            title: ""
        }
      },
      methods: {
        changeColor (newTheme) {
            this.theme = newTheme;
        },
        changeTitle (newTitle) {
            this.title = newTitle;
        }
      },
      computed: {
        data() {
            return{
                "TITLE": this.title,
                "AMOUNT_EXAM_QUESTIONS": 0,
                "TIME_FOR_EXAM ": "00:00",
                "DATA": this.cardsData
            }
        }
      }
    }
</script>

<style>

</style>