<template>
    <div class="card-input" id="CardInput">
        <div v-if="cardInfo.cardType === 'text'" class="input-container">
            <textarea class="textarea text-input"  type="text" ref="input" placeholder="הכניסו טקסט" v-model="cardInfo.content" required>
            </textarea>
            <!-- Error message -->
            <div class="error-message error-message-position text-error-message" v-show="cardInfo.content === ''">
                <div class="message">
                    <img src="@/assets/colorNeutralAssets/triangle-warning.svg" alt="warning symbol" class="warning" />
                    <span class="text"> יש למלא את השדה </span>
                </div>
                <div class="down-error-triangle"></div>
            </div>
        </div>
        <div v-else-if="cardInfo.cardType === 'picAndText'" class="input-container">
                <div class="image-btn" @click="$refs.imageInput.click()">איזו תמונה תרצו לצרף? (PNG, JPG, SVG)</div>
                <input type="file" class="opacity" id="image-input" name="image-input"
                    accept=".jpg, .jpeg, .png, .svg" @change="updateInput" ref="imageInput"/>
                <div v-if="cardInfo.pic == []" class="error error-message">
		        	<img src="@/assets/colorNeutralAssets/triangle-warning-red.svg" alt="warning symbol" class="picture-warning" />
		        	<span class="error-text text">עדיין לא בחרתם תמונה</span>
                </div>
            <div class="preview" ref="preview" v-else-if="cardInfo.pic !== 'invalid'">
                <div class="image-details">
                    <img alt="התמונה שבחרתם" :src="chosenImageURL" class="image-preview"/>
                    <!-- <p class="preview-text">שם הקובץ: {{ fileName }} <br> גודל הקובץ: {{ returnFileSize(this.cardInfo.pic.size) }}.</p> -->
                </div>
            </div>
            <div v-else class="error error-message">
                <img src="@/assets/colorNeutralAssets/triangle-warning-red.svg" alt="warning symbol" class="picture-warning" />
                <div class="error-text text">סוג הקובץ לא מתאים <br> לאפשרויות הקיימות</div>
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

/* Picture warnings */
.error {
    max-height: 7rem;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem 1rem;;
    width: 85%;
}

.error-text {
    font-weight: 800;
    color: #710101;
    text-align: right;
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
</style>
