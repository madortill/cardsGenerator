// store.js
import { reactive } from 'vue'

export const theme = reactive({
    themeColor: {
    name: "lightBlue",
    primaryColor: "#20c5f2",
    secondaryColor: "#1de8f7",
    textColor: "#1c3f55",
    gradient: "#27c5f2",
    buttonsColor: "#1c3f55"
},
changeColor(newTheme) {
  this.themeColor = newTheme;
  console.log(this.themeColor)
  },
})