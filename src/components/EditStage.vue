<template>
  <div id="EditStage">
    <mainScreen v-if="(currentStage === 'main')" :theme="theme" :subjectArray="indexedKeys"
      @change-color="changeColor" @change-title="updateThings(newValue, 'title')" @go-to-subject="goToSubj" @delete-subject="deleteSubject" 
      @next-stage="nextStage" @update-title="changeTitle" :title="title"></mainScreen>
    <Input-screen v-else-if="(currentStage === 'input')" :subjData="this.cardsData[chosenSubject]" :chosenSubject="chosenSubject" :theme="theme"
      @back-to-main="updateThanMain" @subject-input="hideErrorMessages" @subject-focusout="checkIfEmpty" 
      :subjErrorMessage="subjErrorMessage" ref="input-screen" @subject-change="(value) => {this.updateKeyName(this.chosenSubject, value, this.cardsData);}"></Input-screen>
    <!-- <add-questions type = "test" v-else-if="(currentStage === 'test')"></add-questions> -->
    <!-- <add-questions type = "practice" v-else-if="(currentStage === 'practice')"></add-questions> -->
    <img class="till-logo" src="@/assets/colorNeutralAssets/till-logo-text-white.svg" alt='לוגו מדור טי"ל'>
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
      cardsData: {},
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
        this.cardsData[`subject${this.indexedKeys.length}`] = {
          "amountOfQuestions": 0,
          "learningContent": {},
          "icon": "../assets/images/learning/Artboard 4.svg"
        };
        subjName = `subject${this.indexedKeys.length}`;
        this.indexedKeys.push(subjName)
      }
      this.currentStage = "input";
      this.chosenSubject = subjName;
    },
    deleteSubject (subj) {
      this.indexedKeys.splice(this.indexedKeys.indexOf(subj), 1);
      delete this.cardsData[subj];
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
        document.querySelector(".swal-button").style.backgroundColor = this.theme.primaryColor;
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
        if ((value !== "" || !this.isDuplicateKey(this.cardsData, value)) && this.subjErrorMessage !== "") {
          this.subjErrorMessage = "";
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
        if (errorContent !== "") {
          return(errorContent);
        }
      }
      

      // Make sure there are not empty inputs without error
      let inputList = document.querySelectorAll("input");
      for (let item of inputList) {
        if (item.value === "" && item.hasAttribute('required')) {
          item.focus();
          item.blur();
          errorContent = "יש למלא את השדה";
        }
      }
      return(errorContent);
    },
    nextStage (title) {
      this.title = title;
      this.$emit("next-stage", this.lomdaData)
    },
  },
  computed: {
    lomdaData() {
      return {
        "TITLE": this.title,
        "AMOUNT_EXAM_QUESTIONS": 0,
        "TIME_FOR_EXAM ": "00:00",
        "DATA": this.cardsData,
        "THEME": this.theme
      }
    }
  },
  mounted () {
    this.indexedKeys = Object.keys(this.cardsData);
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
  /* max-width: 1rem; */
  position: absolute;
  height: 4rem;
  left: 2%;
  top: 2%;
  opacity: v-bind("currentStage === 'input' ? 0.83: 1");
}
</style>  