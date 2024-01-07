<template>
  <div id="EditStage">
    <InfoScreen v-if="currentStage === 'info'" @next="finishInfo"></InfoScreen>
    <mainScreen v-else-if="(currentStage === 'main')" :subjectArray="indexedKeys"
      @change-title="updateThings(newValue, 'title')" @go-to-subject="goToSubj" @delete-subject="deleteSubject" 
      @next-stage="nextStage" @update-title="changeTitle" :title="lomdaData['TITLE']"
      @temp-save="saveToLocal"></mainScreen>
    <Input-screen v-else-if="(currentStage === 'input')" :subjData="lomdaData['DATA'][chosenSubject]" :chosenSubject="chosenSubject"
      @back-to-main="updateThanMain" @subject-input="hideErrorMessages" @subject-focusout="checkIfEmpty" 
      :subjErrorMessage="subjErrorMessage" ref="input-screen" @subject-change="(value) => {this.updateKeyName(this.chosenSubject, value, this.lomdaData['DATA'])}"></Input-screen>
    <!-- <add-questions type = "test" v-else-if="(currentStage === 'test')"></add-questions> -->
    <!-- <add-questions type = "practice" v-else-if="(currentStage === 'practice')"></add-questions> -->
    <img class="till-logo" src="@/assets/colorNeutralAssets/till-logo-text-white.svg" alt='לוגו מדור טי"ל'>
  </div>
</template>

<script>
import MainScreen from './MainScreen.vue'
import InputScreen from './InputScreen.vue'
import InfoScreen from './InfoScreen.vue'
import swal from 'sweetalert';
import { data, theme } from '../store.js'

export default {
  components: { MainScreen, InputScreen, InfoScreen },
  props: ["isSaved"],
  data() {
    return {
      theme,
      currentStage: 'info',
      chosenSubject: '',
      indexedKeys: [],
      subjErrorMessage: "",
      lomdaData: {
        "TITLE": "",
        "AMOUNT_EXAM_QUESTIONS": 0,
        "TIME_FOR_EXAM": "00:00",
        "DATA": data,
        "THEME": theme.themeColor,
        "AUTHOR": {},
        "DEAFULT_ICON": "../assets/images/learning/Artboard 4.svg"
      }
    }
  },
  methods: {
    changeTitle(newTitle) {
      this.lomdaData['TITLE'] = newTitle;
    },
    finishInfo (infoObj, icon) {
      this.lomdaData["AUTHOR"] = infoObj;
      this.currentStage = 'main';
      if (icon) {
        this.lomdaData["DEAFULT_ICON"] = icon;
      }
    },
    goToSubj(subjName) {
      if (subjName === "newSubject") {
        this.lomdaData['DATA'][`subject${this.indexedKeys.length}`] = {
          "amountOfQuestions": 0,
          "learningContent": {},
          "icon": "deafult"
        };
        subjName = `subject${this.indexedKeys.length}`;
        this.indexedKeys.push(subjName)
      }
      this.currentStage = "input";
      this.chosenSubject = subjName;
    },
    deleteSubject (subj) {
      this.indexedKeys.splice(this.indexedKeys.indexOf(subj), 1);
      delete this.lomdaData['DATA'][subj];
      this.chosenSubject = ""
    },
    updateThanMain() {
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
      } else if (error.includes("יש למלא את השדה") || error.includes("עדיין לא בחרתם תמונה")) {
        swal({
          title: "חכו רגע!",
          text: "שכחתם למלא כמה שדות",
          icon: "error",
          button: "אישור"
        });
      } else if (error.includes("סוג הקובץ לא מתאים")) {
        swal({
          title: "סוג קובץ לא מתאים",
          text: "יכול להיות שיש תמונה שלא מתאימה לסוג הקובץ שצריך?",
          icon: "error",
          button: "אישור"
        });
      } else {
        swal({
          title: "אופס! משהו השתבש",
          text: "נסו לבדוק אם יש הודעות שגיאה על המסך",
          icon: "error",
          button: "אישור"
        });
      }
      if (document.querySelector(".swal-button")) {
        document.querySelector(".swal-button").style.backgroundColor = this.lomdaData["THEME"].primaryColor;
      }
    },
    updateKeyName(key, newKey, objectRef) {
      if (key !== newKey) {
          if (!this.isDuplicateKey(objectRef, newKey)) {
            // changes the key name while recording its index by indexedKeys
              objectRef[newKey] = objectRef[key];
              let index = this.indexedKeys.indexOf(key);
              this.indexedKeys[index] = newKey;
              delete objectRef[key];
              this.chosenSubject = newKey;
              // Error message about duplicate titles
          } else if (this.subjErrorMessage !== "יש למלא את השדה") {
              this.subjErrorMessage = "הכותרת כבר בשימוש"; 
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
        if ((value !== "" || !this.isDuplicateKey(this.lomdaData['DATA'], value)) && this.subjErrorMessage !== "") {
          this.subjErrorMessage = "";
        }
    },
    checkIfEmpty(value) {
        if (value === "") {
            this.subjErrorMessage = "יש למלא את השדה";
        }
    },
    isErrorMessage () {
      let inputList = document.querySelectorAll("input, textarea");
      let isAllInputEmpty = true;
      // check if all the inputs are empty
      // if all the inputs are empty, do not return an error
      for (let item of inputList) {
        if (item.value !== "") {
          isAllInputEmpty = false;
        }
      }

      if (isAllInputEmpty) {
        this.deleteSubject(this.chosenSubject);
        return('');
      }


      // Make sure there are no error messages
      let errorContent = "";
      let errorMessageList = document.querySelectorAll(".error-message");
      for (let item of errorMessageList) {
        errorContent = item.querySelector(".text").innerText;
        if (errorContent !== "") {
          return(errorContent);
        }
      }
      

      // Make sure there are not empty inputs without error
      for (let item of inputList) {
        if (item.value === "" && item.hasAttribute('required')) {
          console.log(item)
          item.focus();
          item.blur();
          errorContent = "יש למלא את השדה";
        }
      }
      return(errorContent);
    },
    nextStage (title) {
      this.lomdaData['TITLE'] = title;
      this.$emit("next-stage", this.lomdaData)
    },
    saveToLocal () {
      swal({
        title: "שמירה זמנית",
        text: "המידע שלכם יישמר על המחשב שלכם בלבד! לנו אין גישה אליו. כלומר, אם הנתונים של הדפדפן שלכם נמחקים או חשבון הגוגל מתחלף, אין לנו אפשרות לשחזר את המידע!",
        button: "אישור",
        className: "swal-save-popup",
      }).then(() => {
        localStorage.setItem('savedData', JSON.stringify(this.lomdaData));
        swal({
          title: "המידע נשמר",
          icon: "info",
          button: "אישור",
          className: "swal-save-popup",
        })
      })
    }
  },
  beforeMount () {
    if (this.isSaved) {
      this.currentStage = 'main';
      this.lomdaData = JSON.parse(localStorage.getItem('savedData'));
    }
  },
  mounted () {
    this.indexedKeys = Object.keys(this.lomdaData["DATA"]);
  }
}
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

.till-logo {
  position: absolute;
  height: 3.5rem;
  left: 1%;
  top: 1%;
  opacity: v-bind("currentStage === 'input' ? 0.83: 1");
}

</style>  
