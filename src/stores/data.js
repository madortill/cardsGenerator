import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => {
    return {
      "TITLE": {
        "name": "",
        "error": ""
      },
      "DATA": [
        {
          "name": "Subject 1",
          "error": '',
          "amountOfQuestions": 0,
          "learningContent": [
            {
              "name": "Sub-subject 1",
              "error": '',
              "topics": [
                { "cardType": "text", "content": "hii" }
                // Add more topics as needed
              ]
            }
            // Add more sub-subjects as needed
          ],
          "icon": "default"
        },
        {
          "name": "Subject 2",
          "amountOfQuestions": 0,
          "learningContent": [
            {
              "name": "Sub-subject 1",
              "topics": [
                { "cardType": "text", "content": "hii" }
                // Add more topics as needed
              ]
            }
            // Add more sub-subjects as needed
          ],
          "icon": "default"
        },
        // Add more subjects as needed
      ]
    }
  },
  actions: {
    /* --------------------------------- Utility functions-------------------------------------- */
    getNestedItem(path, state) {
      // // Access the nested element
      let originalObj = state ? state : this;
      let pathArray;
      if (Array.isArray(path)) {
        pathArray = [...path];
      } else {
        console.error('path is not a array')
      }

      let result = pathArray.reduce((acc, index) => {
        if (index in acc) {
          return acc[index];
        } else {
          console.error(`cannot find the ${index} in`, acc);
        }
      }, originalObj);
      return result;
    },
    isDuplicateKey(arr, newName) {
      let iterator = this.getNestedItem(arr)
      for (let i = 0; i < iterator.length; i++) {
        console.log(iterator[i])
        if (iterator[i].name === newName) {
          // this.duplicateKey = newName;
          return true;
        }
      }
      return false;
    },
    /* ------------------------------- Input events ------------------------------------------------- */
    onInput(path) {
      const obj = this.getNestedItem(path);
      if ((obj.name !== "" || !this.isDuplicateKey(path.slice(0, -2), obj.name)) && obj.error !== "") {
        obj.error = "";
      }
    },
    onFocusout(path) {
      const obj = this.getNestedItem(path);
      if (!obj.name) {
        obj.error = "יש למלא את השדה";
      }
    },
    // onChange
    updateKeyName(newName, path) {
      const obj = this.getNestedItem(path);
      const parentArr = path.slice(0, -1);
      console.log('parentArr: ', parentArr)
      const key = obj.name;
      if (key !== newName) {
        // Error message about duplicate titles
        if (newName === "") {
          obj.error = "יש למלא את השדה";
        } else if (this.isDuplicateKey(parentArr, newName)) {
          obj.error = "הכותרת כבר בשימוש";
        } else {
          obj.error = "";
        }
      }
      obj.name = newName;
    },
    /*---------------------------- Actions in an array (add + delete) --------------------------------------- */
    addSubject() {
      this.DATA.push({
        "name": "",
        "amountOfQuestions": 0,
        "learningContent": [],
        "icon": "deafult"
      })
    },
    addLevel(path) {
      this.getNestedItem(path, this.subSubjects).push({
        "name": "",
        "error": ""
      })
    },
    deleteItem(path) {
      const parentArr = path.slice(0, -1);
      const index = path.slice(-1);
      this.getNestedItem(parentArr).splice(index, 1);
    }
  },
})






















//  inside a component
// import { useThemeStore } from '../stores/theme';
// import { mapState } from 'pinia';

//  inside computed
//     ...mapState(useThemeStore, ["theme"]),