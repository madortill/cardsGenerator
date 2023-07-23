<template>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns:svgjs="http://svgjs.com/svgjs" width="512" height="512" x="0" y="0" viewBox="0 0 24 24"
        style="enable-background:new 0 0 512 512" xml:space="preserve" class="">
        <g>
            <path
                d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0Zm4 13H8a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Z"
                :fill="color" data-original="#000000" class="" opacity="1"></path>
        </g>
    </svg>
</template>

<script>
export default {
    name: "CircleSvg",
    props: ["color"]
}
</script>

<style scoped>
.cls-1 {
    fill: none;
}

.cls-2 {
    clip-path: url(#clip-path);
}

.cls-3 {
    fill: v-bind("color");
}

.cls-4 {
    fill: #fff;
}</style>
