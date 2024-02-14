import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => {
    return {
      "TITLE": {
        "name": "",
        "error": ""
      },
      "AMOUNT_EXAM_QUESTIONS": 0,
      "TIME_FOR_EXAM": "00:00",
      "AUTHOR": {},
      "DEAFULT_ICON": "../assets/images/learning/Artboard 4.svg",
      "THEME": {
        name: "lightBlue",
        primaryColor: "#20c5f2",
        secondaryColor: "#1de8f7",
        textColor: "#1c3f55",
        gradient: "#27c5f2",
        buttonsColor: "#1c3f55"
      },
      "DATA": [
        // Add more subjects as needed
      ],

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
      let iterator = this.getNestedItem(arr);
      /* since the change happens before checking if the key is duplicate, the newName will appear at least once. 
        If it's duplicated, it will appear twice or more */
      let appearances = 0;
      for (let i = 0; i < iterator.length; i++) {
        if (iterator[i].name === newName) {
          appearances++;
        }
      }
      if (appearances > 1) {
        return true;
      }
      return false;
    },
    /* ------------------------------- Input events ------------------------------------------------- */
    onInput(path, newName) {
      const obj = this.getNestedItem(path);
      obj.name = newName;
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
    /* onChange */
    handleErrors(newName, path) {
      const obj = this.getNestedItem(path);
      const parentArr = path.slice(0, -1);
      if (newName === "") {
        obj.error = "יש למלא את השדה";
      } else if (this.isDuplicateKey(parentArr, newName)) {
        obj.error = "הכותרת כבר בשימוש";
      } else {
        obj.error = "";
      }
    },
    /*---------------------------- Actions in an array (add + delete) --------------------------------------- */
    addItem(path, item) {
      this.getNestedItem(path).push(item)
    },
    deleteItem(path) {
      const parentArr = path.slice(0, -1);
      const index = path.slice(-1);
      this.getNestedItem(parentArr).splice(index, 1);
    },
  },
})






















//  inside a component
// import { useThemeStore } from '../stores/theme';
// import { mapState } from 'pinia';

//  inside computed
//     ...mapState(useThemeStore, ["theme"]),