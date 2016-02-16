<template>
  <svg :height="settings.height" :width="settings.width">
    <axis :settings="axisSettings"></axis>
    <bars :series="series" :settings="barSettings"></bars>
  </svg>
</template>

<script>
import axis from "../components/axis/TopAxis.vue"
import bars from "../components/bars/HorizontalBarSet.vue"

  export default {
    props:{
      settings:{
        type:Object,
        default:function(){
          return {
            height:0,
            width:0,
            colorFunc:function(){return "azure"},
            valueRange:[0,0],
            paneWidth:0,
            labelWidth:0,
            lineHeight:0,
            lineSpace:0,
            axisTickLength:5,
            step:0,
            tickColor:"black",
            axisColor:"black"
          }
        }
      },
      series:{
        type:Array
      }
    },
    computed:{
      axisSettings:function(){
        const opts = this.settings
        return {
          width:opts.paneWidth,
          scale:opts.valueRange,
          tickLength:opts.axisTickLength,
          tickColor:opts.tickColor,
          axisColor:opts.axisColor,
          step:opts.step,
          x:opts.labelWidth,
          y:opts.lineHeight
        }
      },
      barSettings:function(){
        const opts = this.settings
        return {
          barWidth:opts.paneWidth,
          labelWidth:opts.labelWidth,
          lineHeight:opts.lineHeight,
          lineSpace:opts.lineSpace,
          scale:opts.valueRange,
          colorFunc:opts.colorFunc,
          x:0,
          y:opts.lineHeight+opts.lineSpace
        }
      }
    },
    components:{
      "bars":bars,
      "axis":axis
    }
  }
</script>
