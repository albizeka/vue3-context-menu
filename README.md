# Note
This library is derived by ([vue-context](https://github.com/rawilk/vue-context "vue-context")) library where main functionality hasn't changed.

# vue3-context-menu

[![VueJS version](https://img.shields.io/badge/vue.js-3.x-green.svg?style=for-the-badge)](https://vuejs.org)

`context-menu-vue3` provides a simple yet flexible context menu for Vue. It is styled for the standard `<ul>` tag, but any menu template can be used.

The menu is lightweight with its only dependency being `vue3-click-outside`. The menu has some basic styles applied to it, but they can be easily 
overridden by your own styles.
<br><br>
The menu disappears when you expect by utilizing `vue3-click-outside` and it also optionally disappears when clicked on.

![Screenshot](docs/images/screenshot.jpg)

## Getting Started

The following instructions will help you get the vue-context menu up and running on
your project.

### Installation

Using npm:
```bash
npm i @albizeka/context-menu-vue3
```

## Basic Usage

Import the component and use it in your app.

```js
import VueContext from "@albizeka/context-menu-vue3";
import { ref, nextTick } from "vue";

// Context items
const items = ref(["Item 1", "Item 2"]);

// Action
function onClick(param) {
  console.log("Item clicked");
}
```

Next add an element to the page that will trigger the context menu to appear, and also add the context menu to the page.

```html
<div id="app">

    <div class="button">
      <p @contextmenu.prevent="$refs.menu.open">Right click on me</p>
    </div>
    
    <VueContext ref="menu">
      <li v-for="item in items">
        <a href="#" @click.prevent="onClick($event.target.innerText)">{{
          item
        }}</a>
      </li>
    </VueContext>
    
</div>
```

## Documentation

 **Notice:**  The code in full documentation is written in VUE2 but all functions are the same so everything should work fine

For full documentation, go here: https://randallwilk.dev/docs/vue-context.

If you would like to contribute to the documentation, you can edit the docs found here: https://github.com/rawilk/vue-context/tree/master/docs

## Contributors

This project exists thanks to all the people who contribute. [[Contribute]](CONTRIBUTING.md).

- [rawilk](https://github.com/rawilk)
- [wol-soft](https://github.com/wol-soft)
- [nachodd](https://github.com/nachodd)
- [Nberezhnoy](https://github.com/Nberezhnoy)

## Alternatives

- [vue-context-menu](https://github.com/vmaimone/vue-context-menu)
- [@overcoder/vue-context-menu](https://github.com/MicroDroid/vue-context-menu)

See [awesome-vue](https://github.com/vuejs/awesome-vue#context-menu) for other alternatives.

## License

`@albizeka/context-menu-vue3` uses the MIT License (MIT). Please see the [license file](https://github.com/rawilk/vue-context/blob/master/LICENSE) for more information.
