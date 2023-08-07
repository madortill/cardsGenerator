<template>
    <div class="black-screen">
        <div :class="['odot-div', isVisable ? '': 'zero-height']">
            <div class="exit" @click="disappearAnimation"></div>
            <h1>אודות</h1>
            <div>
                <h2>פיתוח: &nbsp</h2><span>רב"ט תמר סטופ</span>
            </div>
            <div>
                <h2>גרפיקה: &nbsp</h2><span>סמל דור סגיב</span>
            </div>
            <div>
                <h2>איפיון: &nbsp</h2><span>רב"ט תמר סטופ</span>
            </div>
            <div>
                <h2>רת"ח מו"פ: &nbsp</h2><span>רס"ל אביב אואנונו </span>
            </div>
            <div>
                <h2>רמ"ד טי"ל: &nbsp</h2><span>רס"מ שלומי אוגרן</span>
            </div>
            <div>
                <h2>גרסה: &nbsp</h2><span>אוגוסט 2023</span>
            </div>
            <br>
            <h2>צור קשר:</h2>
            <div class="contact">
                טלפון אביב אואנונו: <a href="tel:052-8394566">052-8394566</a>
            </div>
            <div class="contact">
                טלפון שלומי אוגרן: <a href="tel:052-5364232">052-5364232</a>
            </div>
            <div class="contact">
                מייל: <a href="mailto:madortill@gmail.com">madortill@gmail.com</a>
            </div>
            <img class="till-logo" src="@/assets/colorNeutralAssets/till-logo-text-black.svg">
        </div>
    </div>
</template>

<script>
export default {
    name: "about-screen",
    emits: ['hide-odot'],
    data () {
        return {
            isVisable: true,
            animationDuration: 1
        }
    },
    methods: {
        disappearAnimation() {
            this.isVisable = false;
            setTimeout(this.afterTimeOut, this.animationDuration * 1000)
        },
        afterTimeOut () {
            this.$emit('hide-odot');
            this.isVisable = true;
        }
    }
}
</script>

<style>
.black-screen {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.461);
    z-index: 2;
}

.odot-div {
    background-color: white;
    min-width: 50%;
    padding: 3% 6%;
    border-radius: 0.7rem;
    display: flex;
    flex-direction: column;
   align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 42%;
    padding: 3% 10%;
    max-height: 70%;
    /* transition: transform v-bind("animationDuration + 's'"); */
}

.odot-div h1 {
    font-size: 3em;
    margin-bottom: 0.4em;
    margin-top: 0.4rem;
}

.odot-div h2 {
    margin-bottom: 0.4em;
    margin-top: 0;
    display: inline-block;
    font-weight: bold;
    padding-top: 0.5em;
}

.odot-div span,
.odot-div h2,
.contact {
    font-size: 1.5em;
}

.exit {
    position: absolute;
    width: 3.5rem;
    height: 3.5rem;
    right: 4%;
    top: 4%;
    border-radius: 50%;
    transition: 0.4s ease;
    z-index: 1;
    cursor: pointer;
}

.exit:before,
.exit:after {
    content: '';
    width: 10%;
    height: 70%;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    background: #000;
    border-radius: 6px;
}

.exit:before {
    transform: translate(-50%, -50%) rotate(45deg);

}

.exit:after {
    transform: translate(-50%, -50%) rotate(-45deg);
}


.till-logo {
    max-width: 10vw;
    position: absolute;
    height: 3.5rem;
    left: 4%;
    top: 4.5%;
}

.zero-height {
    animation: zeroHeight v-bind("animationDuration + 's'") forwards;
}

.zero-height * {
    visibility: hidden;
}

@keyframes zeroHeight {
    0% {
        transform: translate(-50%, -50%) scale(100%, 100%);
    } 50% {
        transform: translate(-50%, -50%) scale(100%, 0.1%);
    } 100% {
        transform: translate(-50%, -50%) scale(0%, 0.1%); 
    }
}
</style>