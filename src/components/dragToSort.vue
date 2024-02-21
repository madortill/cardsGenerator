<template>
    <div class="list js-list">
      <div class="list__item is-idle js-item">
        🍦 Ice cream
        <div class="drag-handle js-drag-handle"></div>
      </div>
      <div class="list__item is-idle js-item">
        🥞 Pancake
        <div class="drag-handle js-drag-handle"></div>
      </div>
      <div class="list__item is-idle js-item">
        🧇 Waffle
        <div class="drag-handle js-drag-handle"></div>
      </div>
      <div class="list__item is-idle js-item">
        🍰 Cake
        <div class="drag-handle js-drag-handle"></div>
      </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>

/* * {
  box-sizing: border-box;
}

:root {
  height: 100%;

  background: #87a5b2;

  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

body {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
} */

.list {
  max-width: 500px;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 10px 0;
}

.list__item {
  width: 100%;
  padding: 15px;
  
  display: flex;
  align-items: center;

  position: relative;

  will-change: transform;
  
  background: white;
  color: #001d29;
  border-radius: 5px;
  box-shadow: 0 4px 6px -1px #001d2910, 0 2px 4px -2px #001d2910;
  
  font-weight: 500;
  font-size: 18px;
}

.list__drag-handle {
  position: absolute;
  right: 0;
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.list__drag-handle::after {
  content: '⠿';
  font-size: 25px;
  color: #00000099;
}

.list__item.is-idle {
  transition: 0.25s ease transform;
}

.list__item.is-idle .list__drag-handle {
  cursor: grab;
}

.list__item.is-draggable,
.list__item.is-draggable .drag-handle {
  cursor: grabbing;
}

.list__item.is-draggable {
  z-index: 10;
}

</style>