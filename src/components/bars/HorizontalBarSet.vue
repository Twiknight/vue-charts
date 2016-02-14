<template>
  <g class="bars" :transform="location">
    <text v-for="d in data" :x="0" :y="d.y" dy="0.35em">{{d.name}}</text>
    <rect
      v-for="d in data"
      :x="d.barX"
      :y="d.barY"
      :width="d.width"
      :height="d.height"
      :fill="d.fill">
    </rect>
  </g>
</template>

<script>
/**
* series :[
*   {
*     name:...,
*     value:...
*   },
*   ...
* ],
* settings :{
*   colorFunc:function(){...},
*   barWidth:...,
*   labelWidth:...,
*   lineSpace:...,
*   lineHeight:...,
*   scale:[0,x]
* }
*/
  export default {
    props:['series', 'settings'],
    computed:{
      data:function(){
        const settings = this.settings;
        const series = this.series;
        let scale =  d3.scale.linear()
          .range([0,settings.barWidth])
          .domain(settings.scale)
        let y = function(value){
          return value*(settings.lineSpace+settings.lineHeight)
        }
        return series.map(function(value,idx){
          let d = {
            name:value.name,
            value:value.value,
            y:y(idx+0.5),
            barY:y(idx),
            barX:settings.labelWidth,
            height:settings.lineHeight,
            width:scale(Math.max(value.value,0)),
            fill:settings.colorFunc(value.value)
          }
          return d;
        })
      },
      location:function(){
        const settings = this.settings
          return `translate(${settings.x},${settings.y})`
      }
    }
  }
</script>
