<template>
    <div class="input-container">
        <div :class="isShowRedBorder ? 'error-message textarea-error-innertext' : 'none'"><span class="text">יש למלא את
                השדה</span></div>
        <textarea :class="['textarea', 'text-input', isShowRedBorder ? 'error-message textarea-error' : '']" type="text"
            ref="input" placeholder="הכניסו טקסט" v-model="cardInfo.content"
            @focusout="() => { cardInfo.content === '' ? isShowRedBorder = true : isShowRedBorder = false }"
            @input="(e) => { e.currentTarget.value !== '' ? isShowRedBorder = false : '' }" required></textarea>
    </div>
</template>

<script>
export default {
    props: ["cardInfo"],
    data() {
        return {
            isShowRedBorder: false,
        }
    }
}
</script>

<style scoped>
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
</style>