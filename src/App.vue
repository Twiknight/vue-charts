<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <p>
      {{version}}
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello Vue!'
    }
  },
  computed:{
    version : function(){
      return `d3 version : ${d3.version}`
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
