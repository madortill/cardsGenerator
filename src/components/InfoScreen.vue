<template>
    <div id="InfoScreen">
        <div class="icon-container">
            <img src="@/assets/symbols/madortill.svg" alt='סמל מדור טי"ל' class="icon">
            <img src="@/assets/symbols/hadracha.png" alt='סמל ענף הדרכה' class="icon">
        </div>
        <form class="form grid">
                <h1>כמה פרטים לפני שמתחילים...</h1>
                <div>
                    <label for="name">איך קוראים לך?</label>
                    <input class="text-input" id="name" type="text" v-model="inputValues.name" autocomplete="name" >
                </div>
                <div>
                    <label for="rank">מה הדרגה שלך?</label>
                    <input class="text-input" id="rank" type="text" v-model="inputValues.rank">
                </div>
                <div>
                    <label for="role">מה התפקיד שלך?</label>
                    <input class="text-input" id="role" type="text" v-model="inputValues.role">
                </div>
                <div>
                    <label for="description">תיאור הלומדה: (לא חובה)</label>
                    <textarea class="textarea" id="description" type="text" v-model="description"></textarea>
                </div>
                <div class="bhd-father">
                    <label for="DropDown">בחרו בה"ד</label>
                    <DropDown class="dropdown text-input" id="DropDown" type="text" :optionList="bahadim" placeholder='יש לבחור בה"ד' 
                    @choice="(chosen) => {inputValues.bhd = chosen}" />
                </div>
                <div>
                    <label for="icon">תרצו להכניס סמל ללומדה \ סמל הבה"ד? <span class='small-font'>(לא חובה)</span></label>
                    <input type="file" ref="imgInput" class="opacity" @change="updateInput" name="icon" id="icon" accept=".jpg, .jpeg, .png, .svg">
                    <button class="image-btn" @click.prevent="$refs.imgInput.click()"> בחירת תמונה </button>
                </div>
                <img v-if="icon" alt="תצוגה מקדימה" :src="chosenMediaURL" class="image-preview" @click.prevent="$refs.imgInput.click()"/>
                <p v-else class="pic-error">לא נבחרה תמונה</p>
                <button class="submit" @click.prevent="validateInput">המשך</button>
                <div class="error"> {{ error }}</div>
            </form>
            
    </div>
</template>

<script>
import DropDown from './DropDown.vue';



export default {
    name: 'InfoScreen',
    data() {
        return {
            inputValues: {
                name: '',
                rank: '',
                role: '',
                bhd: ''
            },
            description: '',
            error: '',
            icon: null,
            iconFile: undefined,
            bahadim: {"6בהד": 'בה"ד 6 - לוגיסטיקה',"7בהד": 'בה"ד 7 - תקשוב', "10בהד": 'בה"ד 10 -רפואה', "11בהד": 'בה"ד 11 - משאבי אנוש'
            , "13בהד": 'בה"ד 13 - משטרה צבאית', "20בהד": 'בה"ד 20 - טכנולוגיה ואחזקה', "חינוך":'בה"ד חינוך', "מפקדה":'מפקדה'}
        }
    },
    components: { DropDown },
    methods: {
        validateInput () {
            let isAllValid = true;
            if (this.inputValues.bhd === '') {
                this.error = '*יש לבחור את שם הבה"ד';
                return
            }
            for (const key in this.inputValues) {
                if (this.inputValues[key].length <= 1 && key !== 'bhd') {
                    isAllValid = false;
                    this.error = "*כל השדות צריכים להיות מלאים וארוכים מאות אחת";
                    break
                }
            }


            //  continues to next stage
            if (isAllValid) {
                // creating an object that contains both inputValues
                this.$emit("next", this.inputValues, this.icon, this.description)
            }
        },
        // image input functions
        updateInput() {
            let fileList = this.$refs.imgInput.files;
            if (this.isFileValid(fileList[0])) {
                this.saveAsBase64(fileList[0]);
                this.iconFile = fileList[0];
            } else {
                this.iconFile = "invalid";
                this.icon = null;
            }
        },
        isFileValid(file) {
            const pic = [
                "image/apng",
                "image/bmp",
                "image/gif",
                "image/jpeg",
                "image/pjpeg",
                "image/png",
                "image/svg+xml",
                "image/tiff",
                "image/webp",
                "image/x-icon"
            ];

            if (!file) {
                return false;
            }

            return (pic.includes(file.type));
        },
        saveAsBase64(file) {
            let context = this
            let reader = new FileReader();
            reader.onloadend = function() {
                context.icon = reader.result;
            }
            reader.readAsDataURL(file);
        },
    },
    computed: {
        // Image and video computed
        chosenMediaURL() {
            if (this.iconFile instanceof File) {
                return (URL.createObjectURL(this.iconFile));
            } else {
                return undefined;
            }
        },
    }
}

</script>

<style scoped>
.icon-container {
    direction: ltr;
    justify-self: strech;
    display: flex;
    justify-content: space-between;
    padding: 0rem 1rem;
    height: 6rem;
    align-items: center;
}

.icon {
    max-width: 5rem;
    z-index: 3;
}

.grid {
    display: grid;
    gap: 1.5rem;
    /* rows are implicit - added based on number of children */
    max-width: fit-content;
    margin: auto;
}

.form * {
    grid-column: 2;
}

.submit {
    font-family: Rubik-semiBold;
    font-size: 1.6rem;
    background-color: #1c3f55;
    color: white;
    border-radius: 0.9rem;
    width: fit-content;
    padding: 1vh 1vw;
    justify-self: center;
    text-align: center;
    cursor: pointer;
}

label {
    font-size: 1.5rem;
    line-height: 1.4;
    margin-bottom: 1rem;
    width: 30vw;
}
.small-font {
    color: rgb(83, 83, 83);
    font-size: 0.7em;
}

:deep(.text-input) {
    border-radius: 0.4rem;
    border: solid black 1px;
    padding: 0.2rem 0.6rem;
    margin-right: 0.8rem;
    /* line-height: 1.5; */
    font-size: 1.2rem;
    color: rgb(69, 69, 69);
}

.error {
    box-sizing: border-box;
    color: rgb(198, 45, 45);
    font-size: 1.3rem;
    /* height: 1.8rem; */
    padding: 0rem 0.5rem;
    margin-bottom: 0.3rem;
}

.opacity {
    opacity: 0;
    height: 0;
    width: 0;
}

.image-preview {
    position: relative;
    display: block;
    max-height: 8rem;
    max-width: 100%;
    justify-self: center;
    cursor: pointer;
}

.image-btn {
    box-sizing: border-box;
    display: inline;
    cursor: pointer;
    color: #1c3f55;
    padding: 7px 12px;
    border-radius: 5px;
    border: 1px solid #1c3f55;
    margin-top: 0.5rem;
    margin-right: 0.7rem;
    font-family: Rubik-semiBold;
    font-size: 1.1rem;
}

.pic-error {
    font-family: Rubik-semiBold;
    text-align: center;
    box-sizing: border-box;
    font-size: 1.3rem;
    margin: 0rem;
}

/* overriding DropDown component inner styles (Because I used them somewhere else so I can't delete them) */

.bhd-father:deep(.dropdown) {
    border: 1px solid black;
    display: inline-flex;
    min-height: 1.6em;
    font-size: 1em;
}

.bhd-father:deep(#DropDown) {
    display: inline-block;
    font-size: 1.2rem;
}


.bhd-father:deep(.options-container ) {
    gap: 0em;
    padding: 0;
    z-index: 1;
}

.bhd-father:deep(.option) {
    padding-right: 1em;
    padding-block: 0.35em;
}

.bhd-father:deep(.option:not(.disabled):hover) {
    background-color: rgb(201, 201, 201);
    background-color: rgba(131, 208, 244, 0.688)}

.bhd-father:deep(.disabled, .disabled:hover) {
    /* In father component */
    background-color: rgba(128, 128, 128, 0.594);
    cursor: default;
}





.textarea {
    box-sizing: border-box;
    resize: none;
    font-size: 1rem;
    border-radius: 0.4rem;
    display: block;
    min-width: 74%;
    margin-top: 0.6rem;
    min-height: 4.1rem;
    font-size: 1.2rem;
    padding: 0.3rem 0.6rem;
}
</style>