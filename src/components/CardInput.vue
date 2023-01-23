<template>
    <div class="card-input">
        <div v-if="cardType === 'text'">
            <textarea type="text"></textarea>
        </div>
        <div v-else-if="cardType === 'picAndText'">
            <!-- <input type="file" id="pic1" name="pic1" accept="image/*" /> -->
            <div>
                <label for="image_uploads">Choose images to upload (PNG, JPG, SVG)</label>
                <input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png, .svg" multiple />
            </div>
            <div class="preview">
                <p>No files currently selected for upload</p>
            </div>
        </div>
            <div v-else> {{ cardType }}</div>
    </div>
</template>

<script>
export default {
    name: "CardInput",
    props: {
        "cardType": {
            type: String,
            required: true,
            validator(value) {
                // The value must match one of these strings
                return ['video-and-text', 'youtube', 'text', 'picAndText'].includes(value);
            }
        }
    }
}

</script>

<style>
    .card-input {
        width: 90%;
        height: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>
