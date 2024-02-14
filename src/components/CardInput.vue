<template>
    <div class="card-input" id="CardInput">
        <!-- Input type text -->
        <TextInput v-if="cardInfo.cardType === 'text'" class="input-container" :cardInfo="cardInfo"></TextInput>
        <!-- Image or Video type -->
        <ImageVideoInput v-else-if="cardInfo.cardType === 'picAndText' || cardInfo.cardType === 'videoAndText'"
            class="input-container" :cardInfo="cardInfo"></ImageVideoInput>
        <!-- Youtube type -->
        <YoutubeInput v-else-if="cardInfo.cardType === 'youtube'" class="input-container" :cardInfo="cardInfo">
        </YoutubeInput>
        <!-- Deafult option for cases of errors -->
        <div v-else> אופס! נראה שהאפשרות שבחרתם לא קיימת...</div>
    </div>
</template>

<script>
import TextInput from './inputs/TextInput.vue'
import ImageVideoInput from './inputs/ImageVideoInput.vue'
import YoutubeInput from './inputs/YoutubeInput.vue'
import { useDataStore } from '../stores/data';
import { mapActions } from 'pinia';

export default {
    name: "CardInput",
    components: { TextInput, ImageVideoInput, YoutubeInput },
    methods: {
        ...mapActions(useDataStore, ["getNestedItem"]),
    },
    computed: {
        cardInfo () {
            let value = this.getNestedItem(this.pathArray);
            if (['videoAndText', 'youtube', 'text', 'picAndText'].includes(value.cardType)) {
                return value;
            } else {
                console.error(`the item in path ${this.pathArray} contains invalid cardType`);
            }
        }
    }
}
</script>

<style scoped>
.card-input {
    font-size: 0.9rem;
}

.input-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 84%;
}
</style>
