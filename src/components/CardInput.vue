<template>
    <div class="card-input" id="CardInput">
        <div v-if="cardType === 'text'">
            <textarea type="text" ref="input"></textarea>
        </div>
        <div v-else-if="cardType === 'picAndText'" class="input-container">
            <!-- <input type="file" id="pic1" name="pic1" accept="image/*" /> -->
            <div>
                <label for="image-input">איזו תמונה תרצו לצרף? <br> (PNG, JPG, SVG)</label>
                <input type="file" class="no-opacity" id="image-input" name="image-input"
                    accept=".jpg, .jpeg, .png, .svg" @change="updateImageDisplay" ref="input" />
                <!-- .apng, .bmp, .gif, .jpeg, .pjpeg, .png, .svg+xml, .tiff, .webp, .x-icon -->
            </div>
            <div class="preview" ref="preview">
                <p v-if="currFiles.length === 0">עדיין לא בחרתם תמונה</p>
                <div v-else-if="isFileValid(this.currFiles[0], 'image')" class="image-details">
                    <img alt="התמונה שבחרתם" :src="chosenImageURL" class="image-preview"/>
                    <p>שם הקובץ: {{ this.currFiles[0].name }}, גודל הקובץ: {{ returnFileSize(this.currFiles[0].size) }}.</p>
                </div>
                <div v-else>
                    <p>הקובץ {{ this.currFiles[0].name }} לא תואם לסוג הקובץ המצופה. נסו לבחור קובץ אחר.</p>
                </div>
            </div>
        </div>
        <div v-else> {{ cardType }}</div>
    </div>
</template>

<script>
export default {
    name: "CardInput",
    props: {
        "cardType": {
            type: String,
            required: true,
            validator(value) {
                // The value must match one of these strings
                return ['videoAndText', 'youtube', 'text', 'picAndText'].includes(value);
            }
        }
    },
    data() {
        return {
            currFiles: [],
            chosenImageURL: ""
        }
    },
    methods: {
        updateImageDisplay() {
            this.currFiles = this.$refs.input.files;
            if (this.isFileValid(this.currFiles[0], "image")) {
                this.chosenImageURL = URL.createObjectURL(this.currFiles[0]);
            } else {
                this.currFiles = "";
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
}

</script>

<style scoped>
.card-input {
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.no-opacity {
    /* opacity: 0; */
}

img[alt] {
    font-size: 1.3rem;
}

.image-preview {
    max-height: 25%;
    max-width: 90%;
    height: 64px;
    order: 1;
}

.preview {
    max-height: 25%;
    max-width: 90%;
}
</style>
