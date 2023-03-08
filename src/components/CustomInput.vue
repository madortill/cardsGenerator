<template>
	<div style="position: relative">
		<input :class="{'input': true, 'placeholder-custom-style' : placeholderStyle}" type="text" :placeholder="placeholder" :value="modelValue"
		@focus="inputFocus" @focusout="inputFocus" @input="onInput" @change="passEvent"/>
		<div class="error-message error-message-position" v-show="errorMessage">
			<div class="up-error-triangle"></div>
			<div class="message">
				<img src="@/assets/colorNeutralAssets/triangle-warning.svg" alt="warning symbol" class="warning" />
				<span class="text"> {{ errorMessage }} </span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "CustomInput",
	data() {
		return {
			isEmptyErrorMessage: "",
		};
	},
	props: {
		"placeholder": String,
		"modelValue": null,
		"placeholderStyle": {
			type: Object,
			validator: function (obj) {
				return (obj.color || obj["font-size"]);
			}
		},
		"parentErrorMessage": String
	},
	emits: ["update:modelValue", "input", "focusout"],
	methods: {
		inputFocus(event) {
			if (event.currentTarget.getAttribute("placeholder")) {
				event.currentTarget.setAttribute("placeholder", "");
			} else {
				event.currentTarget.setAttribute("placeholder", this.placeholder);
				// if (!event.currentTarget.value) {
				// 	this.isEmptyErrorMessage = "יש למלא את השדה";
				// }
				this.$emit("focusout", event.currentTarget.value);
			}
		},
		onInput(event) {
			this.$emit("input", event.currentTarget.value);
		},
		passEvent (event) {
			this.$emit("update:modelValue", event.target.value);
		}
	},
	computed: {
		errorMessage() {
			return (this.isEmptyErrorMessage === "" ? this.parentErrorMessage : this.isEmptyErrorMessage);
		}
	}
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
