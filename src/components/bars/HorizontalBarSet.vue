<template>
  <g class="bars" :transform="location">
    <g class="bar" v-for="d in data" :transform="d.location">
      <text  :x="0" :y="settings.lineHeight*0.5" dy="0.35em">{{d.name}}</text>
      <rect
        :x="settings.labelWidth"
        :y="0"
        :width="d.width"
        :height="settings.lineHeight"
        :fill="d.fill">
      </rect>
    </g>
  </g>
</template>

<style lang="stylus" scoped>
  rect:hover
    filter: drop-shadow( 3px 3px 2px rgba(0,0,0,.7) ) 
</style>

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
            location:`translate(0,${y(idx)})`,
            height:settings.lineHeight,
            width:scale(Math.max(value.value,0)),
            fill:settings.colorFunc(value.value)
          }
          return d;
        })
      },
      location:function(){
        const x = this.settings.x || 0;
        const y = this.settings.y || 0;
        if(!!x || !!y){
          return `translate(${x},${y})`
        }
      }
    }
  }
</script>
