<template>
    <div class="open-screen" id="OpenScreen">
        <div class="dialog" v-if="!isReadyToRender">
            <div class="swal-overlay swal-overlay--show-modal" tabindex="-1">
                <div class="swal-modal swal-font" role="dialog" aria-modal="true">
                    <div class="swal-title" style="">יש לכם לומדה שהתחלתם כבר. רוצים להמשיך?</div>
                    <div class="swal-footer">
                        <div class="swal-button-container">

                            <button class="swal-button swal-button--cancel" @click="discontinue">לא</button>

                            <div class="swal-button__loader">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>

                        </div>
                        <div class="swal-button-container">

                            <button class="swal-button swal-button--confirm" @click="continueWork">כן</button>

                            <div class="swal-button__loader">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="actual-component" v-else>
            <div class="icon-container">
                <img src="@/assets/symbols/madortill.svg" alt='סמל מדור טי"ל' class="icon">
                <img src="@/assets/symbols/hadracha.png" alt='סמל ענף הדרכה' class="icon">
            </div>
            <div class="content">
                <div class="title"><span class="main">ברוכים הבאים</span> למחולל הלומדות</div>
                <div class="text">בעזרת המחולל אתם תוכלו ליצור לומדה חדשה בעצמכם, עם תוכן שמותאם לקורס שאתם מעבירים.​
                    המחולל מסדר את התוכן שאתם מכניסים בתוך כרטיסיות, שמסודרות לפי תתי-נושאים ולפי נושאים גדולים יותר. אתם
                    יכולים
                    גם להוסיף מבחן על החומר או תרגולים לכל נושא.​</div>
                <div class="button" @click="$emit('next-stage')">בואו נצא לדרך!</div>
            </div>
            <img class="open-pic" src="@/assets/colorNeutralAssets/cardsOpenImage.png" alt="דוגמה ללומדות מוכנות" />
        </div>
    </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useDataStore } from '../stores/data';

export default {
    name: "open-screen",
    data() {
        return {
            allData: '',
            isReadyToRender: false
        }
    },
    component: {},
    props: [],
    methods: {
        discontinue () {
            localStorage.removeItem("savedData");
            this.isReadyToRender = true;
        },
        continueWork() {
            this.dataStore.$state = JSON.parse(localStorage.getItem('savedData')); // saves data from localStorage
            this.$emit('next-stage', true);
        }
    },
    computed: {
        ...mapStores(useDataStore)
    },
    beforeMount() {
        if (!localStorage.getItem('savedData')) {
            this.isReadyToRender = true;
        }
    },
}
</script>

<style scoped>
.open-screen {
    user-select: none;
    display: flex;
    display: grid;
    grid-template-rows: 5rem 87%;
    grid-template-columns: 4fr 2fr;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.actual-component {
    display: contents;
}

.icon-container {
    direction: ltr;
    grid-column: 1 / -1;
    justify-self: strech;
    display: flex;
    justify-content: space-between;
    padding: 0rem 1rem;
    align-items: center;
}

.icon {
    max-width: 5rem;
}

.open-pic {
    max-height: 100%;
    grid-column: -1 / -2;
    grid-row: 2 / 3;
    margin-left: 2rem;
}

.content {
    grid-column: 0 / 1;
    grid-row: 2 / 3;
    align-self: flex-start;
    justify-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    gap: 2vh;
    margin-right: 6vw;
}

.title {
    font-family: Rubik-semiBold;
    font-size: 4.5rem;
    /* line-height: 1; */
    font-weight: normal;
}

.text {
    font-size: 1.5rem;
    line-height: 1.4;
    margin-bottom: 1rem;
    width: 30vw;
}

.button {
    font-family: Rubik-semiBold;
    font-size: 1.6rem;
    background-color: #1c3f55;
    color: white;
    border-radius: 0.9rem;
    width: fit-content;
    padding: 1vh 1vw;
    /* align-self: center; */
    margin: 1vh 9rem 4rem;
    text-align: center;
    cursor: pointer;
}

.main {
    font-size: 6.5rem;
    font-family: Rubik-semiBold;
    display: block;
    margin-bottom: -2vh;
}</style>