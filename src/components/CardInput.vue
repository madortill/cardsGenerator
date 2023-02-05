<template>
    <div class="card-input">
        <div v-if="cardType === 'text'">
            <textarea type="text" ref="input"></textarea>
        </div>
        <div v-else-if="cardType === 'picAndText'">
            <!-- <input type="file" id="pic1" name="pic1" accept="image/*" /> -->
            <div>
                <label for="image-input">בחר תמונות להעלות <br> (PNG, JPG, SVG)</label>
                <input type="file" class="no-opacity" id="image-input" name="image-input"
                    accept=".jpg, .jpeg, .png, .svg" @change="updateImageDisplay" ref="input" />
                <!-- .apng, .bmp, .gif, .jpeg, .pjpeg, .png, .svg+xml, .tiff, .webp, .x-icon -->
            </div>
            <div class="preview" ref="preview">
                <p v-if="currFiles.length === 0">No files currently selected for upload</p>
                <div v-else-if="isImageValid">
                    <img alt="your chosen image" :src="chosenImageURL"/>
                    <p>שם הקובץ: {{ this.currFiles[0].name }}, גודל הקובץ: {{ returnFileSize(this.currFiles[0].size) }}.</p>
                </div>
                <div v-else>
                    <p>הקובץ {{ this.currFiles[0].name }} לא תואם לסוג הקובץ המצופה. נסו לבחור קובץ אחר!</p>
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
            console.log(this.currFiles);
            this.$refs.preview.replaceChildren();
            if (this.validFileType(this.currFiles[0])) {
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
        }
    },
    computed: {
        isImageValid() {
            const fileTypes = [
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
            return fileTypes.includes(this.currFiles[1].type);
        }
    }
}

</script>

<style>
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
</style>
