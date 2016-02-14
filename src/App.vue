<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <p>
      {{version}}
    </p>
    <svg height="400" width="800">
      <axis :settings="axisSettings"></axis>
      <bars :series="barSeries" :settings="barSettings"></bars>
    </svg>
  </div>
</template>

<script>
import bars  from './components/bars/HorizontalBarSet.vue'
import axis from './components/axis/HorizontalAxis.vue'
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello Vue!',
      barSeries:[
        {name:"series1",value:40},
        {name:"series2",value:20}
      ],
      barSettings:{
        scale:[0,50],
        colorFunc:function(x){return x>30?"red":"green"},
        barWidth:700,
        labelWidth:60,
        lineSpace:5,
        lineHeight:30,
        x:0,
        y:30
      },
      axisSettings:{
        width:700,
        scale:[0,100],
        tickLength:6,
        step:20,
        x:60,
        y:20,
        tickColor:'black'
      }
    }
  },
  computed:{
    version : function(){
      return `d3 version : ${d3.version}`
    }
  },
  components:{
    'bars':bars,
    'axis':axis
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
