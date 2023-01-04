<template>
    <div>
        <div class="card">
            <CardSvg :color="theme.secondaryColor" class="svg learningCard"></CardSvg>
            <div> {{ cardData.cardType}} </div>
            <button class="add-card"></button>
            <button class="next-card"></button>
            <button class="previous-card"></button>
            <button class="remove-card"></button>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>