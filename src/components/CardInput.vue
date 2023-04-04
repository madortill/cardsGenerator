<template>
    <div class="card-input" id="CardInput">
        <div v-if="cardInfo.cardType === 'text'">
            <textarea type="text" ref="input" v-model="cardInfo.content"></textarea>
        </div>
        <div v-else-if="cardInfo.cardType === 'picAndText'" class="input-container">
            <div>
                <span class="image-btn" @click="$refs.imageInput.click()">איזו תמונה תרצו לצרף? (PNG, JPG, SVG)</span>
                <input type="file" class="no-opacity" id="image-input" name="image-input"
                    accept=".jpg, .jpeg, .png, .svg" @change="updateInput" ref="imageInput" required/>
                <!-- .apng, .bmp, .gif, .jpeg, .pjpeg, .png, .svg+xml, .tiff, .webp, .x-icon -->
            </div>
            <div class="preview" ref="preview">
                <p v-if="cardInfo.pic == []">עדיין לא בחרתם תמונה</p>
                <div v-else-if="cardInfo.pic !== 'invalid'" class="image-details">
                    <img alt="התמונה שבחרתם" :src="chosenImageURL" class="image-preview"/>
                    <p class="preview-text">שם הקובץ: {{ fileName }} <br> גודל הקובץ: {{ returnFileSize(this.cardInfo.pic.size) }}.</p>
                </div>
                <div v-else>
                    <p>הקובץ {{ this.cardInfo.pic.name }} לא תואם לסוג הקובץ המצופה. נסו לבחור קובץ אחר.</p>
                </div>
            </div>
            <input type="text" v-model="cardInfo.content" placeholder="אופציונלי"/>
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
        }
    },
    methods: {
        updateInput() {
            this.updateImageDisplay();
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

.no-opacity {
    opacity: 0;
    height: 0;
    width: 0;
}

.image-preview {
    max-height: 7rem;
}

.preview {
    margin-top: 1rem;
}

.preview-text {
    margin: 0;
}

.image-btn {
    cursor: pointer;
    background-color: #7f9ccb;
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px ridge black;
    width: 4rem;
}
</style>
