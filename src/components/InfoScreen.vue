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
                    <input class="text-input" id="name" type="text" v-model="inputValues.name">
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
                    <label for="icon">תרצו להכניס סמל ללומדה \ סמל הבה"ד? <span class='small-font'>(לא חובה)</span></label>
                    <input type="file" ref="imgInput" class="opacity" @change="updateInput" name="img-input" accept=".jpg, .jpeg, .png, .svg">
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
import CustomInput from './CustomInput.vue';


export default {
    name: 'InfoScreen',
    components: { CustomInput },
    data() {
        return {
            inputValues: {
                name: '',
                rank: '',
                role: '',
            },
            error: '',
            icon: null,
            iconFile: undefined
        }
    },
    methods: {
        validateInput () {
            let isAllValid = true;
            for (const key in this.inputValues) {
                if (this.inputValues[key].length <= 1) {
                    isAllValid = false;
                    this.error = "*כל השדות צריכים להיות מלאים וארוכים מאות אחת"
                }
            }


            //  continues to next stage
            if (isAllValid) {
                this.$emit("next", this.inputValues, this.icon)
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

.text-input {
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
</style>