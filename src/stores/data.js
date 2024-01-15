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
    addSubject() {
      this.DATA.push({
        "name": "",
        "amountOfQuestions": 0,
        "learningContent": [],
        "icon": "deafult"
      })
    },
    /**
     *  updated the name of the subject/subSubject/topic
     * @param {Number} index a number that defines the place in arr
     * @param {String} newName the name to be replaced
     * @param {Array} subArray An arry. result of calling getNestedItem one level above the level we want to change
     * @returns 
     */
    updateKeyName(newName, path) {
      const obj = this.getNestedItem(path);
      const parentArr = path.slice(0, -2);
      console.log(obj, parentArr)
      console.log(newName);
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
      // this.chosenSubject = newName;
    },
    isDuplicateKey(arr, newName) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name === newName) {
          // this.duplicateKey = newName;
          return true;
        }
      }
      return false;
    },
    getNestedItem(path, state) {
      // // Access the nested element
      let originalObj = state ? state : this;
        let pathArray;
        if (Array.isArray(path)) {
          pathArray = [...path];
        } else {
          console.error('path is not a array')
        }
        let result = pathArray.reduce((acc, index) =>  {
          if (index in acc) {
            return acc[index];
          } else {
            console.error(`cannot find the path ${acc}][${index}]`);
          }
        }, originalObj);
        return result;
    },
    addLevel(path) {
      this.getNestedItem(path, this.subSubjects).push({
        "name": "",
        "error": ""
      })
    },
    onInput (path) {
      const obj = this.getNestedItem(path); 
      if ((obj.name !== "" || !this.isDuplicateKey(path.slice(0, -2), obj.name)) && obj.error !== "") {
        obj.error = "";
      }
    },
    onFocusout (path) {
      const obj = this.getNestedItem(path);
      if (!obj.name) {
        obj.error = "יש למלא את השדה";
      }
    },
    deleteItem(path, index) {
      const parentArr = path.slice(0, -1);
      this.getNestedItem(parentArr).splice(index, 1);
    }
  },
})


// let arr1 = [1, [[2, 3, [4]]]];
// let pathArray = [1, 0, 2, 0];

// // Access the nested element
// let result = pathArray.reduce((acc, index) => acc[index], arr1);

// console.log(result); // Output: 4






















//  inside a component
// import { useThemeStore } from '../stores/theme';
// import { mapState } from 'pinia';

//  inside computed
//     ...mapState(useThemeStore, ["theme"]),