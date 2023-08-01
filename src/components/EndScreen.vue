<template>
    <div>מסך סיום</div>
    <div>קישור ללומדה: <a :href="`https://madortill.github.io/${this.lomdaTitle}/code/`">https://madortill.github.io/{{this.lomdaTitle}}/code/</a></div>
    <vue-qrcode :value="`https://madortill.github.io/${this.lomdaTitle}/code/`" tag="svg" :options="{ width: 148 }"></vue-qrcode>
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode';
export default {
    name: "loadingStage",
    props: ["lomdaTitle"],
    components: {VueQrcode}
}
</script>

<style>

</style>