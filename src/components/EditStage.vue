<template>
  <div id="EditStage">
    <mainScreen v-if="(currentStage === 'main')" :theme="theme" :subjectArray="indexedKeys"
      @change-color="changeColor" @change-title="updateThings(newValue, 'title')" @go-to-subject="goToSubj"></mainScreen>
    <Input-screen v-else-if="(currentStage === 'input')" :subjData="this.cardsData[chosenSubject]" :chosenSubject="chosenSubject" :theme="theme"
      @back-to-main="updateThanMain" @subject-input="hideErrorMessages" @subject-focusout="checkIfEmpty" 
      :subjErrorMessage="subjErrorMessage" ref="input-screen"></Input-screen>
    <!-- <add-questions type = "test" v-else-if="(currentStage === 'test')"></add-questions> -->
    <!-- <add-questions type = "practice" v-else-if="(currentStage === 'practice')"></add-questions> -->
  </div>
</template>

<script>
import MainScreen from './MainScreen.vue'
import InputScreen from './InputScreen.vue'
import swal from 'sweetalert';
export default {
  components: { MainScreen, InputScreen },
  data() {
    return {
      currentStage: 'main',
      chosenSubject: '',
      theme: {
        name: "lightBlue",
        primaryColor: "#20c5f2",
        secondaryColor: "#1de8f7",
        textColor: "#1c3f55",
        gradient: "#27c5f2",
        buttonsColor: "#1c3f55"
      },
      cardsData: {
        "נושא 1": {
          "icon": "../assets/images/learning/Artboard 4.svg",
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
                  cardType: "text",
                  content: "דוגמה לתוכן של כרטיסייה המחולקת לפי נושאים ותתי נושאים."
                },
              ],
              "כרטיסייה שנייה": [
                {
                  cardType: "picAndText",
                  pic: "@/assets/cardsAssets/colors/brown/pic.png",
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
                },
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
        // "נושא 2": {
        //   "icon": "../assets/images/learning/Artboard 4.svg",
        //   "amountOfQuestions": 2,
        //   "questionsExam": [
        //     {
        //       type: "multiple",
        //       question: "דוגמה לשאלה אמריקאית מתרגלת שיש לה 4 תשובות?",
        //       ans1: "תשובה ראשונה ולא נכונה",
        //       ans2: "תשובה שנייה נכונה!",
        //       ans3: "תשובה שלישית ולא נכונה",
        //       ans4: "תשובה רביעית לא נכונה",
        //       correctAns: "ans2"
        //     },
        //     {
        //       type: "binary",
        //       sentence: "דוגמה לשאלה מתרגלת נכונה של נכון או לא נכון",
        //       trueOrFalse: true
        //     }
        //   ],
        //   "questionsPractice": [
        //     {
        //       type: "multiple",
        //       question: "דוגמה לשאלה אמריקאית בוחנת שיש לה 4 תשובות?",
        //       ans1: "תשובה ראשונה ולא נכונה",
        //       ans2: "תשובה שנייה נכונה!",
        //       ans3: "תשובה שלישית ולא נכונה",
        //       ans4: "תשובה רביעית לא נכונה",
        //       correctAns: "ans2"
        //     },
        //     {
        //       type: "binary",
        //       sentence: "דוגמה לשאלה בוחנת נכונה של נכון או לא נכון",
        //       trueOrFalse: true
        //     }
        //   ],
        //   "learningContent": {
        //     "תת נושא 1": {
        //       "כרטיסייה ראשונה מסוג טקסט": [
        //         {
        //           cardType: "youtube",
        //           // Make sure it is embed video!
        //           youtube: "https://www.youtube.com/embed/n0t9iFlGO20",
        //           //  https://www.youtube.com/embed/n0t9iFlGO20
        //           content: "דוגמה לתוכן של כרטיסייה המחולקת לפי נושאים ותתי נושאים."
        //         },
        //       ],
        //       "כרטיסייה שנייה": [
        //         {
        //           cardType: "picAndText",
        //           pic: "../assets/images/pic.png",
        //           // content: "דוגמה לכותרת לתמונה הראשונה",
        //         }
        //       ],
        //     },
        //     "תת נושא 2": {
        //       "כרטיסייה שלישית מסוג וידאו": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //       "כרטיסייה רביעית": [
        //         {
        //           cardType: "text",
        //           content: "g"
        //         }
        //       ]
        //     },
        //     "תת נושא 3": {
        //       "תת תת נושא 12": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //     },
        //     "תת נושא 5": {
        //       "תת תת נושא 12": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //     }
        //   },
        // },
        // "נושא 3": {
        //   "icon": "../assets/images/learning/Artboard 4.svg",
        //   "amountOfQuestions": 2,
        //   "questionsExam": [
        //     {
        //       type: "multiple",
        //       question: "דוגמה לשאלה אמריקאית מתרגלת שיש לה 4 תשובות?",
        //       ans1: "תשובה ראשונה ולא נכונה",
        //       ans2: "תשובה שנייה נכונה!",
        //       ans3: "תשובה שלישית ולא נכונה",
        //       ans4: "תשובה רביעית לא נכונה",
        //       correctAns: "ans2"
        //     },
        //     {
        //       type: "binary",
        //       sentence: "דוגמה לשאלה מתרגלת נכונה של נכון או לא נכון",
        //       trueOrFalse: true
        //     }
        //   ],
        //   "questionsPractice": [
        //     {
        //       type: "multiple",
        //       question: "דוגמה לשאלה אמריקאית בוחנת שיש לה 4 תשובות?",
        //       ans1: "תשובה ראשונה ולא נכונה",
        //       ans2: "תשובה שנייה נכונה!",
        //       ans3: "תשובה שלישית ולא נכונה",
        //       ans4: "תשובה רביעית לא נכונה",
        //       correctAns: "ans2"
        //     },
        //     {
        //       type: "binary",
        //       sentence: "דוגמה לשאלה בוחנת נכונה של נכון או לא נכון",
        //       trueOrFalse: true
        //     }
        //   ],
        //   "learningContent": {
        //     "תת נושא 1": {
        //       "כרטיסייה ראשונה מסוג טקסט": [
        //         {
        //           cardType: "youtube",
        //           // Make sure it is embed video!
        //           youtube: "https://www.youtube.com/embed/n0t9iFlGO20",
        //           //  https://www.youtube.com/embed/n0t9iFlGO20
        //           content: "דוגמה לתוכן של כרטיסייה המחולקת לפי נושאים ותתי נושאים."
        //         },
        //       ],
        //       "כרטיסייה שנייה": [
        //         {
        //           cardType: "picAndText",
        //           pic: "../assets/images/pic.png",
        //           // content: "דוגמה לכותרת לתמונה הראשונה",
        //         }
        //       ],
        //     },
        //     "תת נושא 2": {
        //       "כרטיסייה שלישית מסוג וידאו": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //       "כרטיסייה רביעית": [
        //         {
        //           cardType: "text",
        //           content: "g"
        //         }
        //       ]
        //     },
        //     "תת נושא 3": {
        //       "תת תת נושא 12": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //     },
        //     "תת נושא 5": {
        //       "תת תת נושא 12": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //     }
        //   },
        // },
        // "נושא 4": {
        //   "icon": "../assets/images/learning/Artboard 4.svg",
        //   "amountOfQuestions": 2,
        //   "questionsExam": [
        //     {
        //       type: "multiple",
        //       question: "דוגמה לשאלה אמריקאית מתרגלת שיש לה 4 תשובות?",
        //       ans1: "תשובה ראשונה ולא נכונה",
        //       ans2: "תשובה שנייה נכונה!",
        //       ans3: "תשובה שלישית ולא נכונה",
        //       ans4: "תשובה רביעית לא נכונה",
        //       correctAns: "ans2"
        //     },
        //     {
        //       type: "binary",
        //       sentence: "דוגמה לשאלה מתרגלת נכונה של נכון או לא נכון",
        //       trueOrFalse: true
        //     }
        //   ],
        //   "questionsPractice": [
        //     {
        //       type: "multiple",
        //       question: "דוגמה לשאלה אמריקאית בוחנת שיש לה 4 תשובות?",
        //       ans1: "תשובה ראשונה ולא נכונה",
        //       ans2: "תשובה שנייה נכונה!",
        //       ans3: "תשובה שלישית ולא נכונה",
        //       ans4: "תשובה רביעית לא נכונה",
        //       correctAns: "ans2"
        //     },
        //     {
        //       type: "binary",
        //       sentence: "דוגמה לשאלה בוחנת נכונה של נכון או לא נכון",
        //       trueOrFalse: true
        //     }
        //   ],
        //   "learningContent": {
        //     "תת נושא 1": {
        //       "כרטיסייה ראשונה מסוג טקסט": [
        //         {
        //           cardType: "youtube",
        //           // Make sure it is embed video!
        //           youtube: "https://www.youtube.com/embed/n0t9iFlGO20",
        //           //  https://www.youtube.com/embed/n0t9iFlGO20
        //           content: "דוגמה לתוכן של כרטיסייה המחולקת לפי נושאים ותתי נושאים."
        //         },
        //       ],
        //       "כרטיסייה שנייה": [
        //         {
        //           cardType: "picAndText",
        //           pic: "../assets/images/pic.png",
        //           // content: "דוגמה לכותרת לתמונה הראשונה",
        //         }
        //       ],
        //     },
        //     "תת נושא 2": {
        //       "כרטיסייה שלישית מסוג וידאו": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //       "כרטיסייה רביעית": [
        //         {
        //           cardType: "text",
        //           content: "g"
        //         }
        //       ]
        //     },
        //     "תת נושא 3": {
        //       "תת תת נושא 12": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //     },
        //     "תת נושא 5": {
        //       "תת תת נושא 12": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //     }
        //   },
        // },
        // "נושא 5": {
        //   "icon": "../assets/images/learning/Artboard 4.svg",
        //   "amountOfQuestions": 2,
        //   "questionsExam": [
        //     {
        //       type: "multiple",
        //       question: "דוגמה לשאלה אמריקאית מתרגלת שיש לה 4 תשובות?",
        //       ans1: "תשובה ראשונה ולא נכונה",
        //       ans2: "תשובה שנייה נכונה!",
        //       ans3: "תשובה שלישית ולא נכונה",
        //       ans4: "תשובה רביעית לא נכונה",
        //       correctAns: "ans2"
        //     },
        //     {
        //       type: "binary",
        //       sentence: "דוגמה לשאלה מתרגלת נכונה של נכון או לא נכון",
        //       trueOrFalse: true
        //     }
        //   ],
        //   "questionsPractice": [
        //     {
        //       type: "multiple",
        //       question: "דוגמה לשאלה אמריקאית בוחנת שיש לה 4 תשובות?",
        //       ans1: "תשובה ראשונה ולא נכונה",
        //       ans2: "תשובה שנייה נכונה!",
        //       ans3: "תשובה שלישית ולא נכונה",
        //       ans4: "תשובה רביעית לא נכונה",
        //       correctAns: "ans2"
        //     },
        //     {
        //       type: "binary",
        //       sentence: "דוגמה לשאלה בוחנת נכונה של נכון או לא נכון",
        //       trueOrFalse: true
        //     }
        //   ],
        //   "learningContent": {
        //     "תת נושא 1": {
        //       "כרטיסייה ראשונה מסוג טקסט": [
        //         {
        //           cardType: "youtube",
        //           // Make sure it is embed video!
        //           youtube: "https://www.youtube.com/embed/n0t9iFlGO20",
        //           //  https://www.youtube.com/embed/n0t9iFlGO20
        //           content: "דוגמה לתוכן של כרטיסייה המחולקת לפי נושאים ותתי נושאים."
        //         },
        //       ],
        //       "כרטיסייה שנייה": [
        //         {
        //           cardType: "picAndText",
        //           pic: "../assets/images/pic.png",
        //           // content: "דוגמה לכותרת לתמונה הראשונה",
        //         }
        //       ],
        //     },
        //     "תת נושא 2": {
        //       "כרטיסייה שלישית מסוג וידאו": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //       "כרטיסייה רביעית": [
        //         {
        //           cardType: "text",
        //           content: "g"
        //         }
        //       ]
        //     },
        //     "תת נושא 3": {
        //       "תת תת נושא 12": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //     },
        //     "תת נושא 5": {
        //       "תת תת נושא 12": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //     }
        //   },
        // },
        // "נושא 6": {
        //   "icon": "../assets/images/learning/Artboard 4.svg",
        //   "amountOfQuestions": 2,
        //   "questionsExam": [
        //     {
        //       type: "multiple",
        //       question: "דוגמה לשאלה אמריקאית מתרגלת שיש לה 4 תשובות?",
        //       ans1: "תשובה ראשונה ולא נכונה",
        //       ans2: "תשובה שנייה נכונה!",
        //       ans3: "תשובה שלישית ולא נכונה",
        //       ans4: "תשובה רביעית לא נכונה",
        //       correctAns: "ans2"
        //     },
        //     {
        //       type: "binary",
        //       sentence: "דוגמה לשאלה מתרגלת נכונה של נכון או לא נכון",
        //       trueOrFalse: true
        //     }
        //   ],
        //   "questionsPractice": [
        //     {
        //       type: "multiple",
        //       question: "דוגמה לשאלה אמריקאית בוחנת שיש לה 4 תשובות?",
        //       ans1: "תשובה ראשונה ולא נכונה",
        //       ans2: "תשובה שנייה נכונה!",
        //       ans3: "תשובה שלישית ולא נכונה",
        //       ans4: "תשובה רביעית לא נכונה",
        //       correctAns: "ans2"
        //     },
        //     {
        //       type: "binary",
        //       sentence: "דוגמה לשאלה בוחנת נכונה של נכון או לא נכון",
        //       trueOrFalse: true
        //     }
        //   ],
        //   "learningContent": {
        //     "תת נושא 1": {
        //       "כרטיסייה ראשונה מסוג טקסט": [
        //         {
        //           cardType: "youtube",
        //           // Make sure it is embed video!
        //           youtube: "https://www.youtube.com/embed/n0t9iFlGO20",
        //           //  https://www.youtube.com/embed/n0t9iFlGO20
        //           content: "דוגמה לתוכן של כרטיסייה המחולקת לפי נושאים ותתי נושאים."
        //         },
        //       ],
        //       "כרטיסייה שנייה": [
        //         {
        //           cardType: "picAndText",
        //           pic: "../assets/images/pic.png",
        //           // content: "דוגמה לכותרת לתמונה הראשונה",
        //         }
        //       ],
        //     },
        //     "תת נושא 2": {
        //       "כרטיסייה שלישית מסוג וידאו": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //       "כרטיסייה רביעית": [
        //         {
        //           cardType: "text",
        //           content: "g"
        //         }
        //       ]
        //     },
        //     "תת נושא 3": {
        //       "תת תת נושא 12": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //     },
        //     "תת נושא 5": {
        //       "תת תת נושא 12": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //     }
        //   },
        // },
        // "נושא 7": {
        //   "icon": "../assets/images/learning/Artboard 4.svg",
        //   "amountOfQuestions": 2,
        //   "questionsExam": [
        //     {
        //       type: "multiple",
        //       question: "דוגמה לשאלה אמריקאית מתרגלת שיש לה 4 תשובות?",
        //       ans1: "תשובה ראשונה ולא נכונה",
        //       ans2: "תשובה שנייה נכונה!",
        //       ans3: "תשובה שלישית ולא נכונה",
        //       ans4: "תשובה רביעית לא נכונה",
        //       correctAns: "ans2"
        //     },
        //     {
        //       type: "binary",
        //       sentence: "דוגמה לשאלה מתרגלת נכונה של נכון או לא נכון",
        //       trueOrFalse: true
        //     }
        //   ],
        //   "questionsPractice": [
        //     {
        //       type: "multiple",
        //       question: "דוגמה לשאלה אמריקאית בוחנת שיש לה 4 תשובות?",
        //       ans1: "תשובה ראשונה ולא נכונה",
        //       ans2: "תשובה שנייה נכונה!",
        //       ans3: "תשובה שלישית ולא נכונה",
        //       ans4: "תשובה רביעית לא נכונה",
        //       correctAns: "ans2"
        //     },
        //     {
        //       type: "binary",
        //       sentence: "דוגמה לשאלה בוחנת נכונה של נכון או לא נכון",
        //       trueOrFalse: true
        //     }
        //   ],
        //   "learningContent": {
        //     "תת נושא 1": {
        //       "כרטיסייה ראשונה מסוג טקסט": [
        //         {
        //           cardType: "youtube",
        //           // Make sure it is embed video!
        //           youtube: "https://www.youtube.com/embed/n0t9iFlGO20",
        //           //  https://www.youtube.com/embed/n0t9iFlGO20
        //           content: "דוגמה לתוכן של כרטיסייה המחולקת לפי נושאים ותתי נושאים."
        //         },
        //       ],
        //       "כרטיסייה שנייה": [
        //         {
        //           cardType: "picAndText",
        //           pic: "../assets/images/pic.png",
        //           // content: "דוגמה לכותרת לתמונה הראשונה",
        //         }
        //       ],
        //     },
        //     "תת נושא 2": {
        //       "כרטיסייה שלישית מסוג וידאו": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //       "כרטיסייה רביעית": [
        //         {
        //           cardType: "text",
        //           content: "g"
        //         }
        //       ]
        //     },
        //     "תת נושא 3": {
        //       "תת תת נושא 12": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //     },
        //     "תת נושא 5": {
        //       "תת תת נושא 12": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //     }
        //   },
        // },
        // "נושא 8": {
        //   "icon": "../assets/images/learning/Artboard 4.svg",
        //   "amountOfQuestions": 2,
        //   "questionsExam": [
        //     {
        //       type: "multiple",
        //       question: "דוגמה לשאלה אמריקאית מתרגלת שיש לה 4 תשובות?",
        //       ans1: "תשובה ראשונה ולא נכונה",
        //       ans2: "תשובה שנייה נכונה!",
        //       ans3: "תשובה שלישית ולא נכונה",
        //       ans4: "תשובה רביעית לא נכונה",
        //       correctAns: "ans2"
        //     },
        //     {
        //       type: "binary",
        //       sentence: "דוגמה לשאלה מתרגלת נכונה של נכון או לא נכון",
        //       trueOrFalse: true
        //     }
        //   ],
        //   "questionsPractice": [
        //     {
        //       type: "multiple",
        //       question: "דוגמה לשאלה אמריקאית בוחנת שיש לה 4 תשובות?",
        //       ans1: "תשובה ראשונה ולא נכונה",
        //       ans2: "תשובה שנייה נכונה!",
        //       ans3: "תשובה שלישית ולא נכונה",
        //       ans4: "תשובה רביעית לא נכונה",
        //       correctAns: "ans2"
        //     },
        //     {
        //       type: "binary",
        //       sentence: "דוגמה לשאלה בוחנת נכונה של נכון או לא נכון",
        //       trueOrFalse: true
        //     }
        //   ],
        //   "learningContent": {
        //     "תת נושא 1": {
        //       "כרטיסייה ראשונה מסוג טקסט": [
        //         {
        //           cardType: "youtube",
        //           // Make sure it is embed video!
        //           youtube: "https://www.youtube.com/embed/n0t9iFlGO20",
        //           //  https://www.youtube.com/embed/n0t9iFlGO20
        //           content: "דוגמה לתוכן של כרטיסייה המחולקת לפי נושאים ותתי נושאים."
        //         },
        //       ],
        //       "כרטיסייה שנייה": [
        //         {
        //           cardType: "picAndText",
        //           pic: "../assets/images/pic.png",
        //           // content: "דוגמה לכותרת לתמונה הראשונה",
        //         }
        //       ],
        //     },
        //     "תת נושא 2": {
        //       "כרטיסייה שלישית מסוג וידאו": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //       "כרטיסייה רביעית": [
        //         {
        //           cardType: "text",
        //           content: "g"
        //         }
        //       ]
        //     },
        //     "תת נושא 3": {
        //       "תת תת נושא 12": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //     },
        //     "תת נושא 5": {
        //       "תת תת נושא 12": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //     }
        //   },
        // },
        // "נושא 9": {
        //   "icon": "../assets/images/learning/Artboard 4.svg",
        //   "amountOfQuestions": 2,
        //   "questionsExam": [
        //     {
        //       type: "multiple",
        //       question: "דוגמה לשאלה אמריקאית מתרגלת שיש לה 4 תשובות?",
        //       ans1: "תשובה ראשונה ולא נכונה",
        //       ans2: "תשובה שנייה נכונה!",
        //       ans3: "תשובה שלישית ולא נכונה",
        //       ans4: "תשובה רביעית לא נכונה",
        //       correctAns: "ans2"
        //     },
        //     {
        //       type: "binary",
        //       sentence: "דוגמה לשאלה מתרגלת נכונה של נכון או לא נכון",
        //       trueOrFalse: true
        //     }
        //   ],
        //   "questionsPractice": [
        //     {
        //       type: "multiple",
        //       question: "דוגמה לשאלה אמריקאית בוחנת שיש לה 4 תשובות?",
        //       ans1: "תשובה ראשונה ולא נכונה",
        //       ans2: "תשובה שנייה נכונה!",
        //       ans3: "תשובה שלישית ולא נכונה",
        //       ans4: "תשובה רביעית לא נכונה",
        //       correctAns: "ans2"
        //     },
        //     {
        //       type: "binary",
        //       sentence: "דוגמה לשאלה בוחנת נכונה של נכון או לא נכון",
        //       trueOrFalse: true
        //     }
        //   ],
        //   "learningContent": {
        //     "תת נושא 1": {
        //       "כרטיסייה ראשונה מסוג טקסט": [
        //         {
        //           cardType: "youtube",
        //           // Make sure it is embed video!
        //           youtube: "https://www.youtube.com/embed/n0t9iFlGO20",
        //           //  https://www.youtube.com/embed/n0t9iFlGO20
        //           content: "דוגמה לתוכן של כרטיסייה המחולקת לפי נושאים ותתי נושאים."
        //         },
        //       ],
        //       "כרטיסייה שנייה": [
        //         {
        //           cardType: "picAndText",
        //           pic: "../assets/images/pic.png",
        //           // content: "דוגמה לכותרת לתמונה הראשונה",
        //         }
        //       ],
        //     },
        //     "תת נושא 2": {
        //       "כרטיסייה שלישית מסוג וידאו": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //       "כרטיסייה רביעית": [
        //         {
        //           cardType: "text",
        //           content: "g"
        //         }
        //       ]
        //     },
        //     "תת נושא 3": {
        //       "תת תת נושא 12": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //     },
        //     "תת נושא 5": {
        //       "תת תת נושא 12": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //     }
        //   },
        // },
        // "נושא 10": {
        //   "icon": "../assets/images/learning/Artboard 4.svg",
        //   "amountOfQuestions": 2,
        //   "questionsExam": [
        //     {
        //       type: "multiple",
        //       question: "דוגמה לשאלה אמריקאית מתרגלת שיש לה 4 תשובות?",
        //       ans1: "תשובה ראשונה ולא נכונה",
        //       ans2: "תשובה שנייה נכונה!",
        //       ans3: "תשובה שלישית ולא נכונה",
        //       ans4: "תשובה רביעית לא נכונה",
        //       correctAns: "ans2"
        //     },
        //     {
        //       type: "binary",
        //       sentence: "דוגמה לשאלה מתרגלת נכונה של נכון או לא נכון",
        //       trueOrFalse: true
        //     }
        //   ],
        //   "questionsPractice": [
        //     {
        //       type: "multiple",
        //       question: "דוגמה לשאלה אמריקאית בוחנת שיש לה 4 תשובות?",
        //       ans1: "תשובה ראשונה ולא נכונה",
        //       ans2: "תשובה שנייה נכונה!",
        //       ans3: "תשובה שלישית ולא נכונה",
        //       ans4: "תשובה רביעית לא נכונה",
        //       correctAns: "ans2"
        //     },
        //     {
        //       type: "binary",
        //       sentence: "דוגמה לשאלה בוחנת נכונה של נכון או לא נכון",
        //       trueOrFalse: true
        //     }
        //   ],
        //   "learningContent": {
        //     "תת נושא 1": {
        //       "כרטיסייה ראשונה מסוג טקסט": [
        //         {
        //           cardType: "youtube",
        //           // Make sure it is embed video!
        //           youtube: "https://www.youtube.com/embed/n0t9iFlGO20",
        //           //  https://www.youtube.com/embed/n0t9iFlGO20
        //           content: "דוגמה לתוכן של כרטיסייה המחולקת לפי נושאים ותתי נושאים."
        //         },
        //       ],
        //       "כרטיסייה שנייה": [
        //         {
        //           cardType: "picAndText",
        //           pic: "../assets/images/pic.png",
        //           // content: "דוגמה לכותרת לתמונה הראשונה",
        //         }
        //       ],
        //     },
        //     "תת נושא 2": {
        //       "כרטיסייה שלישית מסוג וידאו": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //       "כרטיסייה רביעית": [
        //         {
        //           cardType: "text",
        //           content: "g"
        //         }
        //       ]
        //     },
        //     "תת נושא 3": {
        //       "תת תת נושא 12": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //     },
        //     "תת נושא 5": {
        //       "תת תת נושא 12": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //     }
        //   },
        // },
        // "נושא 11": {
        //   "icon": "../assets/images/learning/Artboard 4.svg",
        //   "amountOfQuestions": 2,
        //   "questionsExam": [
        //     {
        //       type: "multiple",
        //       question: "דוגמה לשאלה אמריקאית מתרגלת שיש לה 4 תשובות?",
        //       ans1: "תשובה ראשונה ולא נכונה",
        //       ans2: "תשובה שנייה נכונה!",
        //       ans3: "תשובה שלישית ולא נכונה",
        //       ans4: "תשובה רביעית לא נכונה",
        //       correctAns: "ans2"
        //     },
        //     {
        //       type: "binary",
        //       sentence: "דוגמה לשאלה מתרגלת נכונה של נכון או לא נכון",
        //       trueOrFalse: true
        //     }
        //   ],
        //   "questionsPractice": [
        //     {
        //       type: "multiple",
        //       question: "דוגמה לשאלה אמריקאית בוחנת שיש לה 4 תשובות?",
        //       ans1: "תשובה ראשונה ולא נכונה",
        //       ans2: "תשובה שנייה נכונה!",
        //       ans3: "תשובה שלישית ולא נכונה",
        //       ans4: "תשובה רביעית לא נכונה",
        //       correctAns: "ans2"
        //     },
        //     {
        //       type: "binary",
        //       sentence: "דוגמה לשאלה בוחנת נכונה של נכון או לא נכון",
        //       trueOrFalse: true
        //     }
        //   ],
        //   "learningContent": {
        //     "תת נושא 1": {
        //       "כרטיסייה ראשונה מסוג טקסט": [
        //         {
        //           cardType: "youtube",
        //           // Make sure it is embed video!
        //           youtube: "https://www.youtube.com/embed/n0t9iFlGO20",
        //           //  https://www.youtube.com/embed/n0t9iFlGO20
        //           content: "דוגמה לתוכן של כרטיסייה המחולקת לפי נושאים ותתי נושאים."
        //         },
        //       ],
        //       "כרטיסייה שנייה": [
        //         {
        //           cardType: "picAndText",
        //           pic: "../assets/images/pic.png",
        //           // content: "דוגמה לכותרת לתמונה הראשונה",
        //         }
        //       ],
        //     },
        //     "תת נושא 2": {
        //       "כרטיסייה שלישית מסוג וידאו": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //       "כרטיסייה רביעית": [
        //         {
        //           cardType: "text",
        //           content: "g"
        //         }
        //       ]
        //     },
        //     "תת נושא 3": {
        //       "תת תת נושא 12": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //     },
        //     "תת נושא 5": {
        //       "תת תת נושא 12": [
        //         {
        //           cardType: "videoAndText",
        //           video: "../assets/images/פתיח.mp4",
        //           content: "סרטון מוסר שלא הבנתי למה הוא היה על המחשב של פלג... פטל.. שלג?"
        //         }
        //       ],
        //     }
        //   },
        // },
      },
      title: "",
      indexedKeys: [],
      subjErrorMessage: ""
    }
  },
  methods: {
    changeColor(newTheme) {
      this.theme = newTheme;
    },
    changeTitle(newTitle) {
      this.title = newTitle;
    },
    goToSubj(subjName) {
      if (subjName === "newSubject") {
        this.cardsData[""] = {
          "amountOfQuestions": {},
          "questionsExam": {},
          "questionsPractice": {},
          "learningContent": {},
        };
        subjName = "";
        // this.indexedKeys.push(subjName)
      }
      this.currentStage = "input";
      this.chosenSubject = subjName;
    },
    updateThanMain(value) {
      this.updateKeyName(this.chosenSubject, value);
      let error = this.isErrorMessage();
      if (error === "") {
        this.currentStage = 'main';
      } else if (error.includes("הכותרת כבר בשימוש")) {
        swal({
          title: "בטוחים שלא התבלבלתם?",
          text: "אחת הכותרות שהזנתם חוזרת על עצמה.",
          icon: "error",
          button: "אישור"
        });
      } else if (error.includes("יש למלא את השדה")) {
        swal({
          title: "חכו רגע!",
          text: "שכחתם למלא כמה שדות",
          icon: "error",
          button: "אישור"
        });
      }
      document.querySelector(".swal-button").style.backgroundColor = this.theme.primaryColor;
    },
    updateKeyName(key, newKey) {
      console.log(`%cupdate subject. old key: ${key}, new key: ${newKey}`, "background-color: lightpink")
      let objectRef = this.cardsData;
      if (key !== newKey) {
          if (!this.isDuplicateKey(objectRef, newKey)) {
            // changes the key name while recording its index by indexedKeys
              objectRef[newKey] = objectRef[key];
              let index = ((key === "") ? this.indexedKeys.length : this.indexedKeys.indexOf(key));
              this.indexedKeys[index] = newKey;
              delete objectRef[key];
              this.chosenSubject = newKey;
              // Error message about duplicate titles
          } else if (this.subjErrorMessage !== "יש למלא את השדה") {
              this.subjErrorMessage = "הכותרת כבר בשימוש."; 
          }
      } 
      return true;
    },
    isDuplicateKey(object, newKey) {
        for (const keyName in object) {
            if (keyName === newKey) {
                this.duplicateKey = newKey;
                return true;
            }
        }
        return false;
    },
    hideErrorMessages(value) {
        if ((value !== "" || !this.isDuplicateKey(this.cardsData, value)) && this.subjErrorMessage !== "") {
          this.subjErrorMessage = "";
          this.updateKeyName(this.chosenSubject, value);
        }
    },
    checkIfEmpty(value) {
        if (value === "") {
            this.subjErrorMessage = "יש למלא את השדה";
        }
    },
    isErrorMessage () {
      // Make sure there are no error messages
      let errorContent = "";
      let errorMessageList = document.querySelectorAll(".error-message");
      for (let item of errorMessageList) {
        errorContent = item.querySelector(".text").innerText;
        console.log(`content: ${item.querySelector(".text").innerText}`);
      }
      
      if (errorContent !== "") {
        return(errorContent);
      }

      // Make sure there are not empty inputs without error
      let inputList = document.querySelectorAll("input");
      for (let item of inputList) {
        if (item.value === "") {
          item.focus();
          errorContent = "יש למלא את השדה";
        }
      }
      return(errorContent);
    }


    // updateThings(newValue, varName) {
    //   this[varName] = newValue;
    //   console.log(this[varName])
    // }
  },
  computed: {
    lomdaData() {
      return {
        "TITLE": this.title,
        "AMOUNT_EXAM_QUESTIONS": 0,
        "TIME_FOR_EXAM ": "00:00",
        "DATA": this.cardsData
      }
    }
  },
  mounted () {
    this.indexedKeys = Object.keys(this.cardsData);
  }
}

// swal({
//   title: "הנושא כבר נמצא בשימוש",
//   // text: "You clicked the button!",
//   icon: "error",
//   button: "אישור"
// });
</script>

<style>

.swal-footer {
  text-align: left;
}

.swal-button:focus {
  outline-color: white;
}

.swal-button:hover {
  filter: contrast(120%);
}
</style>  