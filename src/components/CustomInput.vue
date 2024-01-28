<template>
	<div style="position: relative">
		<input :class="{ 'input': true, 'placeholder-custom-style': placeholderStyle }" type="text"
			:placeholder="placeholder" :value="currentObj.name" @focus="inputFocus" @focusout="inputFocus" @input="(e) => this.onInput(this.pathArray, e.target.value)"
			@change="onChange" required />
		<div class="error-message error-message-position" v-show="currentObj.error">
			<div class="up-error-triangle"></div>
			<div class="message">
				<img src="@/assets/colorNeutralAssets/triangle-warning.svg" alt="warning symbol" class="warning" />
				<span class="text"> {{ currentObj.error }} </span>
			</div>
		</div>
	</div>
</template>

<script>
import { useDataStore } from '../stores/data';
import { mapState, mapActions } from 'pinia';

// console.log('what if I register the store here?')

export default {
	name: "CustomInput",
	props: {
		"placeholder": String,
		"modelValue": null,
		"placeholderStyle": {
			type: Object,
			validator: function (obj) {
				return (obj.color || obj["font-size"]);
			}
		},
		"pathArray": Array,
	},
	// emits: ["update:modelValue", "input", "focusout"],
	data() {
		return {
			// inputValue: "",
		}
	},
	methods: {
		...mapActions(useDataStore, ["getNestedItem", "handleErrors", "onInput", "onFocusout"]),
		inputFocus(event) {
			if (event.currentTarget === document.activeElement) {
				event.currentTarget.setAttribute("placeholder", "");
			} else {
				event.currentTarget.setAttribute("placeholder", this.placeholder);
				this.onFocusout(this.pathArray)
			}
		},
		onChange(event) {
			this.handleErrors(event.target.value, this.pathArray);
		},
	},
	computed: {
		currentObj () {
			return this.getNestedItem(this.pathArray);
		},

		mounted() {
			console.log(this.pathArray);
		},
	},
};
</script>

<style scoped>
.input {
	width: 100%;
	height: 100%;
	padding: 0;
	color: inherit;
	font-size: inherit;
	outline: none;
	border: none;
	background-color: inherit;
	font-weight: inherit;
	text-align: inherit;
	text-overflow: ellipsis;
}

/*  Error messages style */
.error-message {
	position: absolute;
	z-index: 2;
}

.error-message-position {
	top: 120%;
	right: 50%;
	transform: translateX(50%);
	min-width: max-content;

}

.up-error-triangle {
	--triangle-size: 0.5rem;
	width: 0;
	height: 0;
	border-bottom: solid #ffbeb7 calc(var(--triangle-size) * 49.4/28.5);
	border-left: solid transparent var(--triangle-size);
	border-top: solid transparent 0;
	border-right: solid transparent var(--triangle-size);
	line-height: 0px;
	margin: auto;
}

.message {
	background-color: #ffbeb7;
	width: fit-content;
	padding: 0.5rem 1rem;
	border-radius: 0.2rem;
	font-size: 1.2rem;
	font-weight: normal;
	color: black;
	display: flex;
	align-items: center;
	--shadow-color: rgba(0, 0, 0, 0.219);
	box-shadow: 0.3px 0.5px 0.7px var(--shadow-color),
		0.8px 1.6px 2px -0.8px var(--shadow-color),
		2.1px 4.1px 5.2px -1.7px var(--shadow-color),
		5px 10px 12.6px -2.5px var(--shadow-color);
}

.warning {
	height: 1.2rem;
}

.message .text {
	padding-right: 0.5em;
}

.placeholder-custom-style::placeholder {
	color: v-bind("placeholderStyle?.color");
	font-size: v-bind("placeholderStyle?.['font-size']");
}
</style>
