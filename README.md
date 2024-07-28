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
Each parent gives prop (pathArray) to the child with the path to the child, meaning the entries to reach
the parent + the level name of the child ('DATA', 'learningContent', 'topic') and its index

svg gets colors from the father component

components that ends with "Input" change their own (do not use a setter)

InfoScreen sends its info to editStage and editStage updates the store

In secondary.vue, we rerender the DragToOrder component when we add / remove card so it could get the new array as prop and save it  to its data.
(for performance reasons, all changes on drag are done on array in the component data inside DragToOrder, and they update the parent component only on drop)
**notes:** 
- the component of CardInput.vue handles its own inputs and error messages and does not emit an event, because there is no need to check for duplicates.
- The buttons "delete", "add-subj-btn" in <MainScreen.vue> and "minus" in <Seconday.vue> are not images, they are style with ::before and ::after that     make the stripes. The father has <position: relative> so the child's precent will referce the father.
- some of the general styles are in src/assets/main.css make sure no to miss them!
- All the final checks (that no input is empty and no error messages appear) happen in EditStage.vue

* DataStore uses pina


----------- Explanation -------------------  
Each parent gives prop (pathArray) to the child with the path to the child, meaning the entries to reach
 the parent + the level name of the child ('DATA', 'learningContent', 'topic') and its index

svg gets colors from the father component

components that ends with "Input" change their own (do not use a setter)

InfoScreen sends its info to editStage and editStage updates the store

In secondary.vue, we rerender the DragToOrder component when we add / remove card so it could get the new array as prop and save it  to its data.
(for performance reasons, all changes on drag are done on array in the component data inside DragToOrder, and they update the parent component only on drop)

-----------------------------------------------

### Not Relevant

Recommended IDE Setup:
[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

Customize configuration:
See [Vite Configuration Reference](https://vitejs.dev/config/).
