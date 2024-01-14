# Cards Lomda Generator
## Create new Lomda
1. ask the client to fill in the form at [https://github.com/madortill/generic-cards.git](madortill.github.io/cardsGenerator)
2. clone this repository: [https://github.com/madortill/generic-cards.git](https://github.com/madortill/generic-cards.git)
3. follow the instructions in the word file in the repository you cloned

## clarity of code:  
 >\> theme = color set  
 >\> title = the name of the site as written in chrome tab (`<title>` tag)  
 >\> subject = main subject (נושא ראשי)  
 >\> secondary = secondary subject (תת-נושא)  
 >\> topic = card title  
 >\> page = the part of the card we see (and can switch between)  

 ## So, how do things work around here?
 - There is a CardsData object which all components inherit. Each component recieves the part it needs as a prop and they can change it reactivly.  

 - All the values in inputs are props ("modalValue"). It means none of the input components change the value of the input by themselves, but just emit an event with the desired value as parmeter and the parent component updates it.    
 - The parent of CustomInput.vue also get the value as prop and creats a computed (subject, secondary, topic) which updates based on the prop (chosenSubject, secondaryName, cardTopic) but sets the value to empty if it includes the words "subject", "secondary" and "topic" (matching), so there won't be two duplicate empty keys in the data object. Only the grandParent of CostumInput.vue changes the input value. 
 - When the user inserts an input, CustomInput.vue emits one of the following events - "input" for input event, "focusout" for focusout event and "update:ModalValue" for change event (So we can use v-modal with this component). All these events also emit "value" as parameter which is the current value of the input.   
 Disclaimer: when the events happen, the parent compnent emit another 
 **update:ModalValue**:
    1. CustomInput saves the input value as data, to be used later (on input). It also emits input event with value parameter.
    2. the parent component emits the event to the grandparent component.
    3. The grandparent call the UpdateKeyName function, which is same across all components (except InputScreen because there is no need for errorList, only one error.):
        1. The function makes sure there was a change in the input 
        2. if the value is unique (isDuplicate returns false):
            assigns the content of the old key to the new key and delete the old key.
            Than, in order to keep the items in the same order, replaces the old key in indexedKeys with the new key.
            (indexedKeys is an array that saves the keys in the order we want to display them (v-for iterates over this array), because objects does not store entries in a particular order.)
        3. if the value is not unique and is not empty, sets error message to "הכותרת כבר בשימוש"
 **focusout**: on focusout, CostumInput.vue shows placeholder, and the parent component checks if value is empty checkIfEmpty. If it is empty, sets error message to "יש למלא את השדה".
 **input**: on input, CustomInput.vue saves the current value of the input as inputValue, (because modalValue does not always match the actual value, for example when there is duplicate key).
 The grandparent component hides error messages if neccessary (sets the prop to "")

**notes:** 
- the component of CardInput.vue handles its own inputs and error messages and does not emit an event, because there is no need to check for duplicates.
- The buttons "delete", "add-subj-btn" in <MainScreen.vue> and "minus" in <Seconday.vue> are not images, they are style with ::before and ::after that     make the stripes. The father has <position: relative> so the child's precent will referce the father.
- some of the general styles are in src/assets/main.css make sure no to miss them!
- All the final checks (that no input is empty and no error messages appear) happen in EditStage.vue

* Theme is in store without library because it was more simple and I didn't want to have to use computed all the time.
* DataStore uses pina



### Not Relevant

Recommended IDE Setup:
[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

Customize configuration:
See [Vite Configuration Reference](https://vitejs.dev/config/).
