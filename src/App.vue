<style>
   #app {
       display: flex;
       flex-direction: column;
   }
    #facts, #trees-graph {
        flex: 50;
    }

    .theplan {
        margin-left: 8px;
    }
</style>
<template>
   <div id="app">
       <div ><span class="version">Version: {{version}}</span><span class="theplan"><a href="https://docs.google.com/presentation/d/101sNSVZnh-olwaRi4hRR5u6KcFKF78LoV5FXYWGlIT4/edit?usp=sharing">The Plan</a></span></div>

   </div>
</template>

<script>
import newtree from './newTree.vue';
import './trees.js'
import './treesGraph.js'
import {Config} from './config.js'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
        version: Config.version
    }
  },
  components: {
     newtree
  }
}
</script>

<style lang="scss">
</style>
