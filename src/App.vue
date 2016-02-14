<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <p>
      {{version}}
    </p>
    <bar-chart :series="barSeries" :settings="barSettings"></bar-chart>
  </div>
</template>

<script>
import barChart from "./charts/HorizontalBarChart.vue"

export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello Vue!',
      barSeries:[
        {name:"series1",value:70},
        {name:"series2",value:20},
        {name:"series3",value:50},
        {name:"series4",value:90},
        {name:"series5",value:80}
      ],
      barSettings:{
        height:400,
        width:650,
        valueRange:[0,100],
        colorFunc:function(x){return x>60?"red":"green"},
        paneWidth:500,
        labelWidth:100,
        lineSpace:5,
        lineHeight:30,
        axisTickLength:8,
        step:20,
        tickColor:"black"
      }
    }
  },
  computed:{
    version : function(){
      return `d3 version : ${d3.version}`
    }
  },
  components:{
    "barChart":barChart
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
