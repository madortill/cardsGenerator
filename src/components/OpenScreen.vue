<template>
    <div class="open-screen">
        <div class="content">
            <div class="title">ברוכים הבאים למחולל לומדת כרטיסיות</div>
            <div class="text">בעזרת המחולל אתם תוכלו ליצור לומדה חדשה בעצמכם, עם תוכן שמותאם לקורס שאתם מעבירים.​
                המחולל מסדר את התוכן שאתם מכניסים בתוך כרטיסיות, שמסודרות לפי תתי-נושאים ולפי נושאים גדולים יותר. אתם יכולים גם להוסיף מבחן על החומר או תרגולים לכל נושא.​</div>
                <div class="button">בואו נצא לדרך!</div>
            </div>
            <img class="open-pic" src="@/assets/media/cardsOpenImage.png" alt="דוגמה ללומדות מוכנות" />
        </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .open-screen {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100vw;
        height: 100vh;
    }

    .open-pic {
        width: 37vw;
        height: auto;
        max-height: 95vh;
    }

    .content {
        align-self: flex-start;
        width: 45%;
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
    }
</style>