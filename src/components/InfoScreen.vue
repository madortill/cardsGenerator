<template>
    <div id="InfoScreen">
        <div class="icon-container">
            <img src="@/assets/symbols/madortill.svg" alt='סמל מדור טי"ל' class="icon">
            <img src="@/assets/symbols/hadracha.png" alt='סמל ענף הדרכה' class="icon">
        </div>
        <div class="flex">
        <form class="form">
                <h1>כמה פרטים לפני שמתחילים...</h1>
                <div>
                    <label for="name">איך קוראים לך?</label>
                    <input class="text-input" id="name" type="text" v-model="inputValues.name" @input="hideMessages">
                    <div class="error"> {{ errors.name }}</div>
                </div>
                <div>
                    <label for="rank">מה הדרגה שלך?</label>
                    <input class="text-input" id="rank" type="text" v-model="inputValues.rank" @input="hideMessages">
                    <div class="error"> {{ errors.rank }}</div>
                </div>
                <div>
                    <label for="role">מה התפקיד שלך?</label>
                    <input class="text-input" id="role" type="text" v-model="inputValues.role" @input="hideMessages">
                    <div class="error"> {{ errors.role }}</div>
                </div>
                <label for="icon">תרצו להכניס סמל ללומדה \ סמל הבה"ד?</label>
                <input type="file">
                <button class="submit" @click="validateInput">המשך</button>
            </form>
        </div>
            
    </div>
</template>

<script>
import CustomInput from './CustomInput.vue';


export default {
    name: 'InfoScreen',
    data() {
        return {
            inputValues: {
                name: '',
                rank: '',
                role: '',
            },
            errors: {
                name: '',
                rank: '',
                role: ''
            },
        }
    },
    methods: {
        validateInput(e) {
            e.preventDefault();
            let isAllValid = true
            for (const key in this.inputValues) {
                if (this.inputValues[key].length <= 1) {
                    isAllValid = false;
                    this.errors[key] = "*הערך צריך להיות ארוך יותר מאות אחת!"
                }
            }


            //  continues to next stage
            if (isAllValid) {
                this.$emit("next", this.inputValues, this.icon)
            }
        },
        hideMessages (event) {
            console.log(event.currentTarget.value)
            if (event.currentTarget.value.length > 0) {
                this.errors[event.currentTarget.id] = '';
            }
        }
    },
    components: { CustomInput }
}

</script>

<style scoped>
.icon-container {
    direction: ltr;
    justify-self: strech;
    display: flex;
    justify-content: space-between;
    padding: 0rem 1rem;
    height: 6rem;
    align-items: center;
}

.icon {
    max-width: 5rem;
    z-index: 3;
}

.flex {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}

.form {
    max-width: fit-content;
}

.submit {
    font-family: Rubik-semiBold;
    font-size: 1.6rem;
    background-color: #1c3f55;
    color: white;
    border-radius: 0.9rem;
    width: fit-content;
    padding: 1vh 1vw;
    /* align-self: center; */
    margin: 1vh auto;
    text-align: center;
    cursor: pointer;
}

label {
    font-size: 1.5rem;
    line-height: 1.4;
    margin-bottom: 1rem;
    width: 30vw;
}

.text-input {
    border-radius: 0.4rem;
    border: solid black 1px;
    padding: 0.2rem 0.6rem;
    margin-right: 0.8rem;
    /* line-height: 1.5; */
    font-size: 1.2rem;
    color: rgb(69, 69, 69);
}

.error {
    box-sizing: border-box;
    color: rgb(198, 45, 45);
    font-size: 1.1rem;
    height: 1.8rem;
    padding: 0.1rem 0.5rem 0.4rem;
    margin-bottom: 0.3rem;
}
</style>