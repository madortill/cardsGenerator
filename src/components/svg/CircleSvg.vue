<template>
    <svg id="CircleSvg" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 94 94">
        <defs>
            <clipPath id="clip-path">
                <rect class="cls-1" x="-1294.34" y="-1141.6" width="1080" height="3095" />
            </clipPath>
        </defs>
        <g class="cls-2">
            <g id="b066baa8-578f-4438-a1fd-b71b29d2244e">
                <g id="ae9bc7be-dcc4-476e-95d8-ca656b3e9f4b">
                    <g id="b9442d7e-fdd1-4185-a8dd-43be37d85bf3">
                        <g id="ae12efdc-39eb-4579-b170-cec11f5419fa">
                            <g id="ec3a8793-ad61-4131-b005-f7a9267340f1">
                                <g id="fd76d6b2-3133-4365-a71d-18639a997c9c">
                                    <circle id="adce953e-108c-4f79-8b66-5ba0e09efa53" class="cls-3" cx="30" cy="72"
                                        r="47" />
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </g>
        <g id="adea663a-0356-43ba-b75c-2c0eb5563ffd">
            <circle id="f20517e6-9024-48f8-a5fd-fa88cb93b73c" class="cls-3" cx="47" cy="47" r="47" />
        </g>
        <path class="cls-4"
            d="M60.44,44.31H49.69V33.56A2.69,2.69,0,0,0,47,30.88h0a2.69,2.69,0,0,0-2.69,2.68V44.31H33.56A2.69,2.69,0,0,0,30.88,47h0a2.69,2.69,0,0,0,2.68,2.69H44.31V60.44A2.69,2.69,0,0,0,47,63.12h0a2.69,2.69,0,0,0,2.69-2.68V49.69H60.44A2.69,2.69,0,0,0,63.12,47h0A2.69,2.69,0,0,0,60.44,44.31Z" />
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
}
</style>