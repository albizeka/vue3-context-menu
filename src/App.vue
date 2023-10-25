<template>
  <div>

    <div>
      <p @contextmenu.prevent="$refs.menu.open">
          Right click on me
      </p>    
  </div>
  
  <vue-context ref="menu">
      <li>
          <a href="#" @click.prevent="onClick($event.target.innerText)">Option 1</a>
      </li>
      <li>
          <a href="#" @click.prevent="onClick($event.target.innerText)">Option 2</a>
      </li>
  </vue-context>
  </div>
</template>

<script>
import VueContext from './js/index';
import { ref, nextTick } from 'vue';

export default {
  components: { VueContext },
  data() {
    return {
      close: true,
      closeCount: 0,
      items: [
        'Cras justo odio',
        'Dapibus ac facilisis in',
        'Morbi leo risus',
        'Porta ac consectetur ac',
        'Vestibulum at eros'
      ],
    };
  },
  methods: {
    async openMenu(event) {
      // Wait until the DOM has been updated and refs are set
      await nextTick();
      
      // Now you can safely access $refs.menu
      if (this.$refs.menu) {
        this.$refs.menu.open(event);
      }
    },
  },
};
</script>