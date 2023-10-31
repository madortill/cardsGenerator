<template>
    <div class="card-input" id="CardInput">
        <!-- Input type text -->
        <div v-if="cardInfo.cardType === 'text'" class="input-container">
            <div :class="isShowRedBorder ? 'error-message textarea-error-innertext' : 'none'"><span class="text">יש למלא את
                    השדה</span></div>
            <textarea :class="['textarea', 'text-input', isShowRedBorder ? 'error-message textarea-error' : '']" type="text"
                ref="input" placeholder="הכניסו טקסט" v-model="cardInfo.content"
                @focusout="() => { cardInfo.content === '' ? isShowRedBorder = true : isShowRedBorder = false }"
                required></textarea>
        </div>
        <!-- Image or Video type -->
        <div v-else-if="cardInfo.cardType === 'picAndText' || cardInfo.cardType === 'videoAndText'" class="input-container">
            <button class="image-btn" @click="$refs.fileInput.click()"> {{ imageOrVideo.inputPrompt }} </button>
            <input type="file" class="opacity" id="file-input" name="file-input" :accept="imageOrVideo.AcceptedFormats"
                @change="updateInput" ref="fileInput" />
            <div v-if="cardInfo[imageOrVideo.propertyName] == []" class="error error-message">
                <img src="@/assets/colorNeutralAssets/triangle-warning-red.svg" alt="warning symbol"
                    class="picture-warning" />
                <span class="error-text text"> {{ imageOrVideo.emptyError }}</span>
            </div>
            <div class="preview" ref="preview" v-else-if="cardInfo[imageOrVideo.propertyName] !== 'invalid'">
                <div class="image-details">
                    <img v-if="cardInfo.cardType === 'picAndText'" :alt="imageOrVideo.alt" :src="chosenMediaURL"
                        class="image-preview" />
                    <video v-else :alt="imageOrVideo.alt" class="image-preview" ref="video" controls>
                        <source :src="chosenMediaURL" type="video/mp4">
                        הדפדפן לא תומך בהצגת סרטונים
                    </video>
                </div>
            </div>
            <div v-else class="error error-message">
                <img src="@/assets/colorNeutralAssets/triangle-warning-red.svg" alt="warning symbol"
                    class="picture-warning" />
                <div class="text">סוג הקובץ לא מתאים <br> לאפשרויות הקיימות</div>
            </div>
            <textarea class="textarea" v-model="cardInfo.content" placeholder="הכניסו טקסט הסבר (לא חובה)"></textarea>
        </div>
        <!-- Youtube type -->
        <div v-else-if="cardInfo.cardType === 'youtube'" class="input-container">
            <div class="youtube-input-container">
                <input type="url" class="youtube-input" placeholder="הכניסו קישור ליוטיוב" ref="youtubeInput"
                    @focus="(event) => { event.target.select() }" v-model="youtubeLink" />
                <button class="image-btn load-youtube" @click="updateYoutubeValue">טען</button>
            </div>
            <div v-if="youtubeError" class="error error-message">
                <img src="@/assets/colorNeutralAssets/triangle-warning-red.svg" alt="warning symbol"
                    class="picture-warning" />
                <span class="text"> {{ youtubeError }} </span>
            </div>
            <div class="preview" ref="preview" v-else>
                <iframe width="280" height="165" :src="cardInfo.youtube" class="image-preview" title="סרטון יוטיוב"
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
                gyroscope; picture-in-picture; web-share" allowfullscreen ref="youtubeIframe"></iframe>
            </div>
            <textarea class="textarea" v-model="cardInfo.content" placeholder="הכניסו טקסט הסבר (לא חובה)"></textarea>
        </div>
        <!-- Deafult option for cases of errors -->
        <div v-else> אופס! נראה שהאפשרות שבחרתם לא קיימת יותר...</div>
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
    data() {
        return {
            isShowRedBorder: false,
            youtubeLink: this.cardInfo.youtube
        }
    },
    methods: {
        // Image and video functions
        updateInput() {
            this.updateImageDisplay();
            if (this.cardInfo.cardType === 'videoAndText') {
                this.$refs.video.load();
            }
        },
        updateImageDisplay() {
            let fileList = this.$refs.fileInput.files;
            if (this.isFileValid(fileList[0], this.imageOrVideo.propertyName)) {
                this.saveAsBase64(fileList[0]);
                this.cardInfo[`${this.imageOrVideo.propertyName}File`] = fileList[0];
            } else {
                this.cardInfo[`${this.imageOrVideo.propertyName}File`] = "invalid";
            }
        },
        isFileValid(file, presumedType = "pic") {
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
                return false;
            }
            switch (presumedType) {
                case "pic": {
                    return (pic.includes(file.type));
                } case "video": {
                    return (video.includes(file.type));
                } default: {
                    throw new Error("type argument in isFileValid is missing or invalid");
                }
            }
        },
        saveAsBase64(file) {
            let context = this
            let reader = new FileReader();
            reader.onloadend = function() {
                context.cardInfo[context.imageOrVideo.propertyName] = reader.result;
            }
            reader.readAsDataURL(file);
        },
        // Youtube functions
        extractYoutubeId(URL) {
            // Use regex that matches the video id if  it's embed, watch or share
            return (URL.match(/(?<=v=|youtu.be\/|embed\/)[^&]+/g)?.[0]);
        },
        updateYoutubeValue(event) {
            let inputValue = this.$refs.youtubeInput.value;
            let validateRegEx = new RegExp(/https?.*\youtu\.?be\.*/g);
            if (validateRegEx.test(inputValue)) {
                this.cardInfo.youtube = this.extractYoutubeId(inputValue) === null ? '' : `https://www.youtube-nocookie.com/embed/${this.extractYoutubeId(inputValue)}`;
            } else if (inputValue === '') {
                this.cardInfo.youtube = '';
            } else {
                this.cardInfo.youtube = 'notLink'
            }
        },
    },
    computed: {
        // Image and video computed
        chosenMediaURL() {
            if (this.cardInfo[`${this.imageOrVideo.propertyName}File`] instanceof File) {
                return (URL.createObjectURL(this.cardInfo[`${this.imageOrVideo.propertyName}File`]));
            } else {
                return undefined;
            }
        },
        fileName() {
            let tempName = this.cardInfo[`${this.imageOrVideo.propertyName}File`].name.substring(0, this.cardInfo[`${this.imageOrVideo.propertyName}File`].name.lastIndexOf('.'));
            if (tempName.length > 10) {
                return (tempName.slice(0, 10) + "...");
            } else {
                return tempName;
            }
        },
        imageOrVideo() {
            if (this.cardInfo.cardType === 'picAndText') {
                return {
                    AcceptedFormats: ".jpg, .jpeg, .png, .svg",
                    inputPrompt: "איזו תמונה תרצו לצרף? (PNG, JPG, SVG)",
                    emptyError: "לא בחרתם תמונה",
                    previewAlt: "התמונה שבחרתם",
                    propertyName: "pic"
                }

            } else if (this.cardInfo.cardType === 'videoAndText') {
                return {
                    AcceptedFormats: ".mp4",
                    inputPrompt: "איזה סרטון תרצו לצרף? (MP4)",
                    emptyError: "לא בחרתם סרטון",
                    previewAlt: "הסרטון שבחרתם",
                    propertyName: "video"
                }
            }
        },
        // youtube computed
        youtubeInputDirection() {
            if (this.youtubeLink === '' || /[\u0590-\u05fe]/g.test(this.youtubeLink)) {
                return 'rtl';
            }
            return 'ltr'

        },
        youtubeError() {
            // Actually do the computing - determine error message if the user entered a link, nothing or something that is not a link
            if (this.cardInfo.cardType === 'youtube' ) { 
                if (this.cardInfo.youtube === '') {
                    // reset the input value
                    this.youtubeLink = '';
                    return ('יש להכניס קישור');
                } else if (this.cardInfo.youtube === 'notLink') {
                    return ('הקישור שהכנסתם הוא לא של יוטיוב');
                } else {
                    return('')
                }

            }
        }
    },
}
</script>

<style scoped>
.card-input {
    font-size: 0.9rem;
}

.input-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 84%;
}

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

.textarea {
    box-sizing: border-box;
    resize: none;
    flex-basis: 5rem;
    padding: 0.3rem;
    font-size: 1rem;
    border-radius: 0.4rem;
}

.text-input {
    flex-basis: 100%;
    width: 17rem;
    padding: 0.3rem 0.5rem;
}

/* Error messages styles */
.textarea-error {
    border: none;
    outline: rgb(216, 10, 10) 2px solid;
}

.textarea-error-innertext {
    color: #d80a0a;
}

/* Picture warnings */
.error {
    max-height: 7rem;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem 1rem;
    ;
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

/* Text warnings */
.text-error-message {
    position: absolute;
    z-index: 2;
}

.error-message-position {
    top: 13%;
    right: 50%;
    transform: translateX(50%);
    min-width: max-content;
}

.down-error-triangle {
    --triangle-size: 0.5rem;
    width: 0;
    height: 0;
    border-bottom: solid transparent 0;
    border-left: solid transparent var(--triangle-size);
    border-top: solid #ffbeb7 calc(var(--triangle-size) * 49.4/28.5);
    border-right: solid transparent var(--triangle-size);
    line-height: 0px;
    margin: auto;
}

.message {
    background-color: #ffbeb7;
    width: fit-content;
    padding: 0.5rem 1rem;
    border-radius: 0.2rem;
    font-size: 1.2rem;
    font-weight: normal;
    color: black;
    display: flex;
    align-items: center;
    --shadow-color: rgba(0, 0, 0, 0.219);
    box-shadow: 0.3px 0.5px 0.7px var(--shadow-color),
        0.8px 1.6px 2px -0.8px var(--shadow-color),
        2.1px 4.1px 5.2px -1.7px var(--shadow-color),
        5px 10px 12.6px -2.5px var(--shadow-color);
}

.warning {
    height: 1.2rem;
}

.message .text {
    padding-right: 0.5em;
}

/* Youtube styles */
.youtube-input-container {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 2px;
    padding-top: 0.2rem;
}

.load-youtube {
    margin: 0;
    padding: 0.3rem;
    font-size: 1rem;
    flex-basis: 2.5rem;
}

/* Youtube-input styles */
.youtube-input {
    flex-grow: 1;
    padding: 0.3rem;
    font-size: 1rem;
    border-radius: 0.4rem;
    border: 1px ridge rgb(118, 118, 118);
    flex-basis: 2.5rem;
    text-overflow: ellipsis;
    direction: v-bind("youtubeInputDirection");
}

.youtube-input::selection {
    background-color: rgba(78, 181, 245, 0.704);
}

.youtube-input::placeholder {
    text-align: right;
}</style>
