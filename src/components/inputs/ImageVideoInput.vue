<template>
    <div class="input-container">
        <button class="image-btn" @click="$refs.fileInput.click()"> {{ imageOrVideo.inputPrompt }} </button>
        <input type="file" class="opacity" id="file-input" name="file-input" :accept="imageOrVideo.AcceptedFormats"
            @change="updateInput" ref="fileInput" />
        <div v-if="error"
            class="error error-message">
            <img src="@/assets/colorNeutralAssets/triangle-warning-red.svg" alt="warning symbol" class="picture-warning" />
            <span class="error-text text"> {{ this.error }}</span>
        </div>
        <div class="preview" v-else>
            <div class="image-details">
                <img v-if="cardInfo.cardType === 'picAndText'" :alt="imageOrVideo.alt" :src="chosenMediaURL"
                    class="image-preview" />
                <video v-else :alt="imageOrVideo.alt" class="image-preview" ref="video" controls>
                    <source :src="chosenMediaURL" type="video/mp4">
                    הדפדפן לא תומך בהצגת סרטונים
                </video>
            </div>
        </div>
        <textarea class="textarea" v-model="cardInfo.content" placeholder="הכניסו טקסט הסבר (לא חובה)"></textarea>
    </div>
</template>

<script>
import { useDataStore } from '../../stores/data';
import { mapState } from 'pinia';

export default {
    data() {
        return {
            error: this.cardInfo.cardType === 'picAndText' ? "לא בחרתם תמונה" : "לא בחרתם סרטון"
        }
    },
    props: ["cardInfo"],
    methods: {
        // Image and video functions
        updateInput() {
            this.updateImageDisplay();
            if (this.cardInfo.cardType === 'videoAndText') {
                this.loadVideo();
            }
        },
        async loadVideo() {
            await this.$nextTick;
            this.$refs.video.load();
        },
        updateImageDisplay() {
            let fileList = this.$refs.fileInput.files;
            const fileErr = this.fileError(fileList[0], this.imageOrVideo.propertyName);
            this.error = fileErr;
            console.log(this.error);
            if (fileErr === null) {
                this.saveAsBase64(fileList[0]);
                this.cardInfo[`${this.imageOrVideo.propertyName}File`] = fileList[0];
            } else {
                if (!fileList[0]) {
                    this.cardInfo[`${this.imageOrVideo.propertyName}File`] = ''
                    // this.cardInfo[this.imageOrVideo.propertyName] = ''
                } else {
                    this.cardInfo[`${this.imageOrVideo.propertyName}File`] = "invalid";
                }
            }
        },
        /**
         * 
         * @param {File} file 
         * @param {String} presumedType either "pic" or "video"
         * @returns error messsage - if null, than the file is valid. Otherwise, a string that describes what's wrong
         */
         fileError(file, presumedType = "pic") {
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
            const video = [
                "video/mp4"
            ]

            if (!file) {
                return (presumedType === "pic" ? "לא בחרתם תמונה" : "לא בחרתם סרטון");
            }

            if (file.size > 32097152 /* = 30.6MB */) {
                return("הקובץ גדול מדי");
            }

            switch (presumedType) {
                case "pic": {
                    return (pic.includes(file.type) ? null : 'סוג הקובץ לא מתאים לאפשרויות הקיימות');
                } case "video": {
                    return (video.includes(file.type) ? null : 'סוג הקובץ לא מתאים לאפשרויות הקיימות');
                } default: {
                    throw new Error("presumedType argument in fileError is missing or invalid");
                }
            }
        },
        saveAsBase64(file) {
            let context = this
            let reader = new FileReader();
            reader.onloadend = function () {
                context.cardInfo[context.imageOrVideo.propertyName] = reader.result;
            }
            reader.readAsDataURL(file);
        },
    },
    computed: {
        ...mapState(useDataStore, { theme: "THEME" }),
        // Image and video computed
        chosenMediaURL() {
            if (this.cardInfo[`${this.imageOrVideo.propertyName}File`] instanceof File) {
                return (URL.createObjectURL(this.cardInfo[`${this.imageOrVideo.propertyName}File`]));
            } else {
                return undefined;
            }
        },
        imageOrVideo() {
            if (this.cardInfo.cardType === 'picAndText') {
                return {
                    AcceptedFormats: ".jpg, .jpeg, .png, .svg",
                    inputPrompt: "איזו תמונה תרצו לצרף? (PNG, JPG, SVG)",
                    previewAlt: "התמונה שבחרתם",
                    propertyName: "pic"
                }
            } else if (this.cardInfo.cardType === 'videoAndText') {
                return {
                    AcceptedFormats: ".mp4",
                    inputPrompt: "איזה סרטון תרצו לצרף? (MP4)",
                    previewAlt: "הסרטון שבחרתם",
                    propertyName: "video"
                }
            } else {
                console.error(`invalid cardType: ${this.cardInfo.cardType}`)
                return undefined
            }
        },
    },
}
</script>

<style scoped>
.opacity {
    opacity: 0;
    height: 0;
    width: 0;
}

.image-preview {
    max-height: 10rem;
    max-width: 100%;
    margin: 0.5rem 0;
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
    align-self: center;
    text-align: center;
    box-sizing: border-box;
}


.error {
    max-height: 7rem;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem 1rem;;
    width: 85%;
}

.error .text {
    font-weight: 800;
    color: #710101;
    /* text-align: right; */
    text-align: center;
    outline: red;
}

.picture-warning {
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