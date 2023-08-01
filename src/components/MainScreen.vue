<template>
    <div id="MainScreen">
        <ColorPicker :theme="theme" @change-color="changeColor"></ColorPicker>
        <div class="grid subj-container">
            <Bg_svg class="background svg" :color="theme.primaryColor"></Bg_svg>
            <div class="paper-clip-title first-paper-clip">
                <CustomInput :modelValue="title" @update:modelValue="onUpdateTitle" placeholder="הכניסו שם ללומדה" class="paper-clip-content" 
                @focusout="titleFocusOut" @input="titleInput" :parent-error-message="titleErrorMessage"></CustomInput>
            </div>
            <div class="cardsContainer scrollStyle">
                <div :class="['subjCard', isDeleteMode === true ? 'rattle-animation': '']" v-for="(value, index) in subjectArray"
                   :key="'title' + index" @click="!this.isDeleteMode ? $emit('go-to-subject', value): this.deleteSubj(value)" :ref="'subj' + index">
                   <div class="delete" v-show="isDeleteMode"></div>
                    <SubjectBtnSvg class="svg" :primaryColor="theme.primaryColor" :secondaryColor="theme.secondaryColor" ></SubjectBtnSvg>
                    <div class="subject">{{ value }}</div>
                </div>
                <div class="subjCard"  @click="() => {if (!this.isDeleteMode) {$emit('go-to-subject', 'newSubject')}}">
                    <SubjectBtnSvg class="svg" :primaryColor="theme.primaryColor" :secondaryColor="theme.secondaryColor" ></SubjectBtnSvg>
                    <div class="subject">הוספת נושא</div>
                    <div class="add-subj-btn"></div>
                </div>
                <div class="button-container">
                    <!-- <span class="button" @click="$emit('to-exam')"><img src="@/assets/colorNeutralAssets/plus-small.svg" class="plus-button" alt="plus icon"/> הוספת מבחן</span> -->
                    <!-- <span class="button" @click="$emit('to-practice')"><img src="@/assets/colorNeutralAssets/plus-small.svg" class="plus-button" alt="plus icon" />הוספת תרגול</span> -->
                    <span class="button" @click="isDeleteMode = !isDeleteMode" v-show="!isDeleteMode && subjectArray.length > 0"><img src="@/assets/colorNeutralAssets/trash-white.svg" class="trash-can" alt="trash icon" />מצב מחיקה</span>
                    <span class="button back-btn" @click="isDeleteMode = !isDeleteMode" v-show="isDeleteMode"><img src="@/assets/colorNeutralAssets/arrow-small-right.svg" class="trash-can" alt="trash icon" />חזרה</span>
                </div>
            </div>
            <div class="save-and-continue" @click="saveAndContinue">שמירה והמשך</div>
        </div>
    </div>
</template>

<script>
import ColorPicker from './ColorPicker.vue';
import SubjectBtnSvg from './svg/SubjectBtnSvg.vue';
import CircleSvg from './svg/CircleSvg.vue';
import MinusCircleSvg from './svg/MinusCircleSvg.vue';
import Bg_svg from './svg/Bg_svg.vue';
import CustomInput from './CustomInput.vue';

export default {
    name: "main-screen",
    data() {
        return {
            title: "",
            showErrorMessage: false,
            titleErrorMessage: "",
            isDeleteMode: false
        };
    },
    props: {"subjectArray": Array, "theme": Object},
    emits: ["change-color", "update-title", "go-to-subject", "delete-subject", "next-stage" ],
    methods: {
        changeColor(theme) {
            this.$emit("change-color", theme);
        },
        titleFocusOut (value) {
            if (value === "") {
                this.titleErrorMessage = "יש למלא את השדה"
            }
        },
        titleInput (value) {
            if (value !== "") {
                this.titleErrorMessage = "";
                // this.$emit('update-title', this.title)
            }
        },
        onUpdateTitle (value) {
            this.title = value;
            this.$emit('update-title', this.title)
        },
        toggleDeleteMode () {
            this.isDeleteMode = !this.isDeleteMode;
        },
        deleteSubj (subj) {
            console.log('delete subject')
            swal({
                icon: "warning",
                title: `בטוחים שאתם רוצים למחוק את הנושא ${subj}?`,
                buttons: {cancel: "לבטל", confirm: "למחוק"},
                dangerMode: true,
                className: "swal-font",
            })
            .then((willDelete) => {
              if (willDelete) {
                this.isDeleteMode = false;
                this.$emit('delete-subject', subj)
              }
            });
        },
        saveAndContinue () {
            swal({
                icon: "info",
                title: `בטוחים שאתם רוצים להמשיך? אחרי שתמשיכו אי אפשר יהיה לשנות את התוכן.`,
                buttons: {cancel: "ביטול", confirm: "המשך"},
                className: "swal-font",
            })
            .then((willContinue) => {
              if (willContinue) {
                if (this.title === '') {
                    swal({
                    title: "איך אתם רוצים לקרוא ללומדה?",
                    buttons: {confirm: "אישור"},
                    className: "swal-font",
                    content: "input", 
                    })
                    .then((value) => {
                      this.title = value;
                      this.$emit("next-stage", this.title)
                    });
                } else {
                    this.$emit("next-stage", this.title)
                }
              }
            });

        }
    },
    components: { ColorPicker, SubjectBtnSvg, CircleSvg, Bg_svg, CustomInput, MinusCircleSvg },
}

</script>

<style scoped>
.grid {
  position: absolute;
  left: 0;
  display: grid;
  grid-template-rows: 1fr 7.3fr 0.7fr;
}
.subj-container {
    height: 100vh;
    width: 66.67vw;
}

.background {
    height: 100vh;
    width: 66.67vw;
}

/* Title input styles */
.first-paper-clip {
    width: 24rem;
    grid-area: 1/ 1/ span 1 / span 1;
}

.paper-clip-title {
  background-image: url("@/assets/colorNeutralAssets/home_header.svg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 2rem 0rem 1rem 2rem;
  height: fit-content;
  justify-self: center;
  box-sizing: border-box;
  width: 24rem;
}

.paper-clip-content {
  width: 24rem;
  font-size: 1.7rem;
  border: none;
  background-color: transparent;
  text-align: center;
  padding: 0.6rem 1.3rem 0.8rem;
  margin-top: 0.5rem;
  border-radius: 0.8rem;
  box-sizing: border-box;
}

.paper-clip-content:focus-within { 
    outline: black solid 2px;
}

/* general styles */
.cardsContainer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    align-content: flex-start;
    grid-area: 2 / 1 / span 1 / span 1;
    width: 94.4%;
    gap: 1rem;
    overflow-y: auto;
    transform: translateX(0%);
    justify-self: center;
}

.subjCard {
    height: 16rem;
    width: 24rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    text-align: center;
    position: relative;
    cursor: pointer;
}

.subject {
    color: v-bind("theme.textColor");
    width: 71%;
    text-overflow: ellipsis;
    overflow: hidden;
}

.icon {
    width: 1.6em;
    height: 1.6em;
    top: 3em;
    left: 0.4em;
    margin-top: 1rem;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
}

.button-container {
    display: block;
    margin: auto;
    width: 100%;
    display: flex;
    justify-content: center;
}

.button {
    color: white;
    border: white solid 0.1rem;
    border-radius: 0.7rem;
    padding: 0.1rem 2rem 0.7rem;
    margin: 1rem 1rem;
    cursor: pointer;
}


.plus-button {
    width: 1.5rem;
    border: white solid 0.1rem;
    border-radius: 50%;
    position: relative;
    top: 0.5rem;
    margin-left: 0.4rem; 
}

.trash-can {
    width: 1.8rem;
    border: white solid 0.1rem;
    border-radius: 50%;
    position: relative;
    top: 0.5rem;
    margin-left: 0.4rem; 
    padding: 0.3rem;
    box-sizing: border-box;
}

.save-and-continue {
    background-color: v-bind('theme.buttonsColor');
    color: white;
    z-index: 1;
    padding: 0.5rem 1rem;
    margin-left: 2rem;
    border-radius: 0.4rem;
    font-size: 1.1rem;
    grid-area: 3/ 1/ span 1/ span 1;
    align-self: center;
    justify-self: flex-end;
    width: fit-content;
    cursor: pointer;
}

.add-subj-btn {
    position: relative;
    margin-top: 1rem;
    width: 2rem;
    height: 2rem;
}

.add-subj-btn:before {
    height: 56%;
	/* transform: translate(40%,39%); */
	transform: translate(47%,36%);
    
}
.add-subj-btn:after {
    height: 56%;
	transform: translate(40%,39%) rotate(90deg);
}

/* Delete mode */
.delete {
    position: absolute;
    right: 12%;
    top: 20%;
    width: 2rem;
    height: 2rem;
}

.delete, .add-subj-btn{
    border-radius: 50%;
    background: v-bind("theme.buttonsColor");
    opacity: 1;
    transition: .4s ease;
    z-index: 1;
}



.delete:before, .delete:after, .add-subj-btn:before, .add-subj-btn:after {
    content: '';
    width: 9%;
    position: absolute;
    background: #fff;
    border-radius: 6px;
}
.delete:before {
    height: 59%;
	transform: translate(40%,30%) rotate(45deg);
}
.delete:after {
    height: 59%;
	transform: translate(40%,30%) rotate(-45deg);
}

@keyframes rattle {
    0% {
        transform: rotate(-0.5deg);
    } 50% {
        transform: rotate(0.5deg);
    } 100% {
        transform: rotate(-0.5deg);
    }
}
.rattle-animation {
    animation: rattle 0.2s ease-in-out infinite;
}

.back-btn {
    padding: 0.1rem 1rem 0.7rem;
}
</style>