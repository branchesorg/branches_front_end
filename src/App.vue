<template>
  <div id="app">
    <h2> This is Renaissance </h2>
  <hello color='blue'></hello>
  <facts></facts>
   {{msg}}
  </div>
</template>

<script>
import Hello from './hello.vue';
import Facts from './facts.vue';
export default {
  name: 'app',<
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    Hello
    , SampleVue
    , Facts
  }
}
</script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.3.4/vue.min.js"> </script>
    <title>Learning Vue.js! :D</title>
  </head>
  <body>
    <div id="app">
      <input v-model="message"><br />
      {{ message }}
      <ul>
        <li v-for="doggo in doggos">{{ doggo }}</li>
      </ul>
      <button v-on:click="buttonClick">ayy</button>
    </div>
    <script>
      new Vue({
        el: '#app',
        data: {
          'message': 'Hello World',
          'doggos': ['shiba inu', 'golden retriever']
        },
        methods: {
          buttonClick: function() {
            alert('lmao')
          }
        }
      });
    </script>
<style lang="scss">
</style>
