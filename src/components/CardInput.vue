<template>
    <div class="card-input" id="CardInput">
        <div v-if="cardInfo.cardType === 'text'">
            <textarea type="text" ref="input" v-model="cardInfo.content"></textarea>
        </div>
        <div v-else-if="cardInfo.cardType === 'picAndText'" class="input-container">
                <div class="image-btn" @click="$refs.imageInput.click()">איזו תמונה תרצו לצרף? (PNG, JPG, SVG)</div>
                <input type="file" class="opacity" id="image-input" name="image-input"
                    accept=".jpg, .jpeg, .png, .svg" @change="updateInput" ref="imageInput"/>
                <!-- .apng, .bmp, .gif, .jpeg, .pjpeg, .png, .svg+xml, .tiff, .webp, .x-icon -->
                <div v-if="cardInfo.pic == []" class="error error-message">
		        	<img src="@/assets/colorNeutralAssets/triangle-warning-red.svg" alt="warning symbol" class="warning" />
		        	<span class="text">עדיין לא בחרתם תמונה</span>
                </div>
            <div class="preview" ref="preview" v-else-if="cardInfo.pic !== 'invalid'">
                <!-- <p v-if="cardInfo.pic == []">עדיין לא בחרתם תמונה</p> -->
                <div class="image-details">
                    <img alt="התמונה שבחרתם" :src="chosenImageURL" class="image-preview"/>
                    <!-- <p class="preview-text">שם הקובץ: {{ fileName }} <br> גודל הקובץ: {{ returnFileSize(this.cardInfo.pic.size) }}.</p> -->
                </div>
            </div>
            <div v-else class="error error-message">
                <img src="@/assets/colorNeutralAssets/triangle-warning-red.svg" alt="warning symbol" class="warning" />
                <div class="text">סוג הקובץ לא מתאים <br> לאפשרויות הקיימות</div>
            </div>
            <textarea class="textarea" v-model="cardInfo.content" placeholder="הכניסו טקסט הסבר (לא חובה)"></textarea>
        </div>
        <div v-else> {{ cardInfo.cardType }}</div>
    </div>
</template>

<script>
export default {
    name: "CardInput",
    props: {
        "cardInfo": {
            type: Object,
            required: true,
            validator(value) {
                return ['videoAndText', 'youtube', 'text', 'picAndText'].includes(value.cardType);
            }
        },
        theme: {
            type: Object,
        }
    },
    methods: {
        updateInput() {
            this.updateImageDisplay();
            console.log(URL.createObjectURL(this.cardInfo.pic));
        },
        updateImageDisplay() {
            console.log(this.$refs.imageInput);
            let fileList = this.$refs.imageInput.files;
            if (this.isFileValid(fileList[0], "image")) {
                this.cardInfo.pic = fileList[0];
            } else {
                this.cardInfo.pic = "invalid";
            }
        },
        returnFileSize(number) {
            if (number < 1024) {
                return `${number} bytes`;
            } else if (number >= 1024 && number < 1048576) {
                return `${(number / 1024).toFixed(1)} KB`;
            } else if (number >= 1048576) {
                return `${(number / 1048576).toFixed(1)} MB`;
            }
        },
    isFileValid(file, presumedType = "image") {
            const image = [
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
            const video = []

            if (!file) {
                return false;
            }
            switch (presumedType) {
                case "image": {
                    return (image.includes(file.type));
                } case "video": {
                    return (video.includes(file.type));
                } default: {
                    throw new Error("type argument in isFileValid is missing or invalid");
                }
            }
        }
    }, 
    computed: {
        chosenImageURL() {
            console.log("chosen file: ", this.cardInfo.pic);
            if (this.cardInfo.pic instanceof File) {
                return (URL.createObjectURL(this.cardInfo.pic));
            } else {
                // this.cardInfo.pic = "invalid";
                return undefined;
            }
        },
        fileName () {
            let tempName = this.cardInfo.pic.name.substring(0, this.cardInfo.pic.name.lastIndexOf('.'));
            if (tempName.length > 10) {
                return (tempName.slice(0, 10) + "...");
            } else {
                return tempName;
            }
        }
    },
}

</script>

<style scoped>
.card-input {
    /* width: 90%;
    height: 90%; */
    font-size: 0.9rem;
}

.input-container {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    height: 100%;
}

.opacity {
    opacity: 0;
    height: 0;
    width: 0;
}

.image-preview {
    max-height: 9rem;
    max-width: 17.5rem;
    margin: 0.5rem;
}

.image-btn {
    cursor: pointer;
    background-color: v-bind("theme.secondaryColor + '78'");
    color: black;
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px ridge rgb(118, 118, 118);
    width: fit-content;
    margin-top: 0.5rem;
}

/* Error message style */
.error {
    max-height: 7rem;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem 1rem;;
    width: 85%;
}

.text {
    font-weight: 800;
    color: #710101;
    text-align: right;
}

.warning {
	height: 1.5rem;
    margin-left: 0.4rem;
}

.textarea {
    box-sizing: border-box;
    resize: none;
    flex-basis: 5rem;
    padding: 0.3rem;
    font-size: 1rem;
    border-radius: 0.4rem;
}

</style>
