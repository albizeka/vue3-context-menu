<template>
  <div id="app">
    <div class="button">
      <p @contextmenu.prevent="$refs.menu.open">Right click on me</p>
    </div>
    <!--  -->
    <div class="test__div" @contextmenu.prevent="$refs.menu.open">

    </div>

    <VueContext ref="menu">
      <li v-for="item in items">
        <a href="#" @click.prevent="onClick($event.target.innerText)">{{
          item
        }}</a>
      </li>
    </VueContext>
  </div>
</template>

<script setup>
import VueContext from "./js/index";
import { ref, nextTick } from "vue";

// Context items
const items = ref(["Item 1", "Item 2"]);

// Action
function onClick(param) {
  console.log("Item clicked");
}
</script>

<style>
  .test__div {
    width: 100%;
    height: 100vh;
    background: red;
  }
</style>
