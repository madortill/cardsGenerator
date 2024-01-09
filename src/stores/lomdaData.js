// store.js
import { reactive } from 'vue'

export const data = reactive({
    state: {
        "fda": {
            "amountOfQuestions": 0,
            "learningContent":
            {
                "fdas":
                {
                    "fdas":
                        [
                            { "cardType": "text", "content": "hii" }
                        ]
                }
            },
            "icon": "deafult"
        }
    },
    actions: {
        updateKeyName(index, newKey, entriesList) {
            const key = entriesList[index][0];
            if (key !== newKey) {
                if (!this.isDuplicateKey(entriesList, newKey)) {
                    // changes the key name while recording its index by indexedKeys
                    key = newKey;
                    this.chosenSubject = newKey;
                    return "success"
                    // Error message about duplicate titles
                } else if (newKey !== "") {
                    return "הכותרת כבר בשימוש";
                }
            }
            return true;
        },
        isDuplicateKey(entriesList, newKey) {
            for (const i = 0; i < entriesList.length; i++) {
                if (entriesList[i][0] === newKey) {
                    this.duplicateKey = newKey;
                    return true;
                }
            }
            return false;
        }
    },

})





let indexedEnteriesLevel1 = Object.entries(obj)
let indexedEnteriesLevel2 = Object.entries(indexedEnteriesLevel2[0][1].learningContent)

// for (const i = 0; i < )

// function objToEntries (obj) {

//     return objToEntries()
// }
