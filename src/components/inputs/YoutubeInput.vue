<template>
    <div class="input-container">
        <div class="youtube-input-container">
            <input type="url" class="youtube-input" placeholder="הכניסו קישור ליוטיוב" ref="youtubeInput"
                @focus="(event) => { event.target.select() }" v-model="youtubeLink" @keydown.enter="updateYoutubeValue"/>
            <button class="load-youtube" @click="updateYoutubeValue">טען</button>
        </div>
        <div v-if="youtubeError" class="error error-message">
            <img src="@/assets/colorNeutralAssets/triangle-warning-red.svg" alt="warning symbol" class="picture-warning" />
            <span class="text"> {{ youtubeError }} </span>
        </div>
        <div class="preview" v-else>
            <iframe width="280" height="165" :src="cardInfo.youtube" class="image-preview" title="סרטון יוטיוב"
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
                gyroscope; picture-in-picture; web-share" allowfullscreen ref="youtubeIframe"></iframe>
        </div>
        <textarea class="textarea" v-model="cardInfo.content" placeholder="הכניסו טקסט הסבר (לא חובה)"></textarea>
    </div>
</template>

<script scoped>
import { useDataStore } from '../../stores/data';
import { mapState } from 'pinia';

export default {
    data() {
        return {
            youtubeLink: this.cardInfo.youtube,
        }
    },
    props: ["cardInfo"],
    methods: {
        // Youtube functions
        extractYoutubeId(URL) {
            // Use regex that matches the video id if  it's embed, watch or share
            return (URL.match(/(?<=v=|youtu.be\/|embed\/)[^&]+/g)?.[0]);
        },
        updateYoutubeValue(event) {
            let inputValue = this.$refs.youtubeInput.value;
            let validateRegEx = new RegExp(/https?.*\youtu\.?be\.*/g);
            if (validateRegEx.test(inputValue) && !inputValue.includes("/results?search_query")) {
                console.log(this.extractYoutubeId(inputValue))
                this.cardInfo.youtube = this.extractYoutubeId(inputValue) === null ? '' : `https://www.youtube-nocookie.com/embed/${this.extractYoutubeId(inputValue)}`;
            } else if (inputValue === '') {
                this.cardInfo.youtube = '';
            } else {
                this.cardInfo.youtube = 'notLink'
            }
        },
    },
    computed: {
        ...mapState(useDataStore, {theme: "THEME"}),
        youtubeInputDirection() {
            if (this.youtubeLink === '' || /[\u0590-\u05fe]/g.test(this.youtubeLink)) {
                return 'rtl';
            }
            return 'ltr'

        },
        youtubeError() {
            // Actually do the computing - determine error message if the user entered a link, nothing or something that is not a link
            if (this.cardInfo.cardType === 'youtube') {
                if (this.cardInfo.youtube === '') {
                    // reset the input value
                    this.youtubeLink = '';
                    return ('יש להכניס קישור');
                } else if (this.cardInfo.youtube === 'notLink') {
                    return ('הקישור שהכנסתם הוא לא של יוטיוב');
                } else {
                    return ('')
                }

            }
        }
    }
}
</script>

<style>
.image-preview {
    max-height: 10rem;
    max-width: 100%;
    margin: 0.5rem 0;
}

.textarea {
    box-sizing: border-box;
    resize: none;
    flex-basis: 5rem;
    padding: 0.3rem;
    font-size: 1rem;
    border-radius: 0.4rem;
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
    cursor: pointer;
    background-color: v-bind("theme.secondaryColor + '78'");
    color: black;
    border-radius: 5px;
    border: 1px ridge rgb(118, 118, 118);
    width: fit-content;
    align-self: center;
    text-align: center;
    box-sizing: border-box;
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
}

/* Error message */
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
</style>