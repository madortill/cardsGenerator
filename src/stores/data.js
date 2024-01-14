import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => {
    return {
      "subjects": [
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
  getters: {
    getSubArr: (state) => {
      return (path) => {
        let pathArray;
        if (typeof (path) === 'array') {
          pathArray = [...path];
        } else {
          console.error('path is not a array')
        }
        let result = pathArray.reduce((acc, index) => acc[index], state.subjects);
        return result;
      }
    },
  },
  actions: {
    addSubject() {
      this.subjects.push({
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
    updateKeyName(newName, obj, parentArr) {
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
      this.chosenSubject = newName;
    },
    isDuplicateKey(arr, newName) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name === newName) {
          // this.duplicateKey = newName;
          return true;
        }
      }
      return false;
    }
  },
  getNestedItem(joinedIndex, bigObj) {
    // // Access the nested element
    let pathArray;
    if (typeof (joinedIndex) === 'array') {
      pathArray = [...joinedIndex];
    } else {
      console.error('joinedIndex is not a array')
    }
    let result = pathArray.reduce((acc, index) => acc[index], bigObj);
    return result;
  },
  addLevel(path) {
    // let newKey = `secondary${Object.keys(this.subjData["learningContent"]).length}`;
    // this.subjData["learningContent"][newKey] = {};
    // this.indexedKeys.push(newKey);
    this.getNestedItem(path, this.subSubjects).push({
      "name": "",
      "error": ""
    })
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