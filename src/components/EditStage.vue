<template>
  <div id="EditStage">
    <InfoScreen v-if="currentStage === 'info'" @next="finishInfo"></InfoScreen>
    <mainScreen v-else-if="(currentStage === 'main')" @go-to-subject="goToSubj" @next-stage="nextStage" @temp-save="saveToLocal"></mainScreen>
    <Input-screen v-else-if="(currentStage === 'input')" :pathArray="['DATA', chosenSubjIndex]" @back-to-main="updateThanMain"></Input-screen>
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
import { useDataStore } from '../stores/data';
// import { mapState, mapActions } from 'pinia';
import { mapStores } from 'pinia'


export default {
  components: { MainScreen, InputScreen, InfoScreen },
  props: ["isSaved"],
  data() {
    return {
      currentStage: 'info',
      indexedKeys: [],
      subjErrorMessage: "",
      chosenSubjIndex: -1,
    }
  },
  methods: {
    finishInfo (infoObj, icon, description) {
      this.dataStore["AUTHOR"] = infoObj;
      this.dataStore["DESCRIPTION"] = description;
      this.currentStage = 'main';
      if (icon) {
        this.dataStore["DEAFULT_ICON"] = icon;
      }
    },
    goToSubj(subjName, index) {
      let goToIndex = index;
      if (subjName === "newSubject") {
        this.dataStore.addItem(["DATA"], {
        "name": "",
        "amountOfQuestions": 0,
        "learningContent": [],
        "icon": "deafult"
      });
        goToIndex = this.dataStore.DATA.length - 1;
    }
    this.currentStage = "input";
    this.chosenSubjIndex = goToIndex;
    },
    updateThanMain() {
      let error = this.isErrorMessage();
      if (error === "") {
        this.currentStage = 'main';
        this.chosenSubjIndex = -1;
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
        document.querySelector(".swal-button").style.backgroundColor = this.dataStore.THEME.primaryColor;
      }
    },
    isErrorMessage () {
      let inputList = document.querySelectorAll("input, textarea");
      let isAllInputEmpty = true;
      /* check if all the inputs are empty, if all the inputs are empty - deletes the subject*/
      for (let item of inputList) {
        if (item.value !== "") {
          isAllInputEmpty = false;
        }
      }

      if (isAllInputEmpty) {
        this.dataStore.deleteItem(["DATA", this.chosenSubjIndex]);
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
          item.focus();
          item.blur();
          errorContent = "יש למלא את השדה";
        }
      }
      return(errorContent);
    },
    nextStage () {
      this.$emit("next-stage", this.dataStore.$state)
    },
    saveToLocal () {
      swal({
        title: "שמירה זמנית",
        text: "המידע שלכם יישמר על המחשב שלכם בלבד! לנו אין גישה אליו. כלומר, אם הנתונים של הדפדפן שלכם נמחקים או חשבון הגוגל מתחלף, אין לנו אפשרות לשחזר את המידע!",
        button: "אישור",
        className: "swal-save-popup",
      }).then(() => {
  
          localStorage.setItem('savedData', JSON.stringify(this.dataStore.$state));
          swal({
            title: "המידע נשמר",
            icon: "info",
            button: "אישור",
            className: "swal-save-popup",
          })
      })
    },
  },
  computed: {
    ...mapStores(useDataStore)
  },
  beforeMount () {
    if (this.isSaved) {
      this.currentStage = 'main';
    }
  },
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
