<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="104" height="88.526" viewBox="0 0 104 88.526" :class="type"
        @click="$emit('btn-pressed', type)" id="PageButtonSvg">
        <title> {{ title }} </title>
        <g v-if="type === 'next'" id="Group_361" data-name="Group 361" transform="translate(-332.686 -1002.877)">
            <rect id="Rectangle_47" data-name="Rectangle 47" class="cls-1" width="98" height="82.526" rx="27"
                transform="translate(335.686 1005.877)" />
            <g id="Group_353" data-name="Group 353" transform="translate(380.399 1037.61)">
                <g id="Group_354" data-name="Group 354" transform="translate(0 0)">
                    <path id="Path_468" data-name="Path 468" class="cls-2" d="M10.022,19.524l-9.5-9.5,9.5-9.5"
                        transform="translate(-0.52 -0.52)" />
                </g>
            </g>
        </g>
        <g v-else-if="type === 'back'" id="Group_361" data-name="Group 361"
            transform="translate(436.686 1091.404) rotate(180)">
            <rect id="Rectangle_47" data-name="Rectangle 47" class="cls-1" width="98" height="82.526" rx="27"
                transform="translate(335.686 1005.877)" />
            <g id="Group_353" data-name="Group 353" transform="translate(380.399 1037.61)">
                <g id="Group_354" data-name="Group 354" transform="translate(0 0)">
                    <path id="Path_468" data-name="Path 468" class="cls-2" d="M10.022,19.524l-9.5-9.5,9.5-9.5"
                        transform="translate(-0.52 -0.52)" />
                </g>
            </g>
        </g>
        <g v-else-if="type === 'add'">
            <rect class="a" x="3" y="3.00104" width="98" height="82.526" rx="27" />
            <path class="b"
                d="M63.68181,41.92768H54.33636V32.58223A2.33636,2.33636,0,0,0,52,30.24586h0a2.33636,2.33636,0,0,0-2.33636,2.33637v9.34545H40.31819A2.33635,2.33635,0,0,0,37.98183,44.264h0a2.33635,2.33635,0,0,0,2.33636,2.33636h9.34545v9.34545A2.33635,2.33635,0,0,0,52,58.28221h0a2.33635,2.33635,0,0,0,2.33636-2.33636V46.6004h9.34545A2.33635,2.33635,0,0,0,66.01817,44.264h0A2.33635,2.33635,0,0,0,63.68181,41.92768Z" />
        </g>
    </svg>
</template>

<script>
export default {
    name: "pageButtomSvg",
    props: {
        "color":
        {
            type: String,
            required: true,
        },
        "type": {
            type: String,
            required: true,
            validator(value) {
                // The value must match one of these strings
                return ['next', 'back', 'add', 'remove-page'].includes(value);
            }
        }
    },
    computed: {
        title() {
            switch (this.type) {
                case 'next':
                    return 'לעמוד הבא';
                    break
                case 'back':
                    return 'לעמוד הקודם';
                    break
                case 'add':
                    return 'הוספת עמוד';
                    break
                case 'remove-page':
                    return 'מחיקת עמוד';
                    break
                default:
                    return 'כפתור';
            }
        }
    }
}
</script>

<style scoped>
.cls-1 {
    fill: #fff;
    stroke: #dbdbdb;
    stroke-width: 6px;
}

.cls-1,
.cls-2 {
    stroke-linecap: round;
    stroke-linejoin: round;
}

.cls-2 {
    fill: none;
    stroke: v-bind("color");
    stroke-width: 5px;
}


.a {
    fill: none;
    stroke: #dbdbdb;
    stroke-width: 6px;
}

.a,
.b {
    stroke-linecap: round;
    stroke-linejoin: round;
}

.b {
    fill: v-bind("color");
    stroke: v-bind("color");
}
</style>