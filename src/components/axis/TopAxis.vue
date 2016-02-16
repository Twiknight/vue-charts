<template>
  <g class="axis" :transform="location">
    <g v-for="tick in ticks" :transform="tick.location">
      <line class='tick' x2="0" :y2="-settings.tickLength" :stroke="settings.tickColor"></line>
      <text text-anchor="middle" x="0" :y="-settings.tickLength*1.5">{{tick.value}}</text>
    </g>
    <path class="domain" :d="line" fill="none" :stroke="settings.axisColor"></path>
  </g>
</template>

<script>
  export default {
    props:["settings"],
    computed:{
      ticks:function(){
        const settings = this.settings;
        const scale = d3.scale.linear()
          .range([0,settings.width])
          .domain(settings.scale);

        if(settings.ticks){
          return settings.ticks.map(function(value){
            let t = {
              location : `translate(${scale(value)},0)`,
              value : value,
            }
            return t
          })
        }else if(settings.step){
          let ticks = []
          const step = settings.step
          const range = settings.scale
          for(let x=range[0];x<=range[1];x+=step){
            ticks.push({
              location : `translate(${scale(x)},0)`,
              value : x
            });
          }
          return ticks;
        }else{
          return settings.scale.map(function(value){
            let t = {
              location :`translate(${scale(value)},0)`,
              value :value,
            }
            return t
          })
        }
      },
      line:function(){
        const settings = this.settings
        const scale = d3.scale.linear()
          .range([0,settings.width])
          .domain(settings.scale)
        const range = settings.scale
        const height = settings.tickLength
        return `M${scale(range[0])},${-height}V0H${scale(range[1])}V${-height}`
      },
      location:function(){
        const x = this.settings.x
        const y = this.settings.y
        if(!!x && !!y){
          return `translate(${x},${y})`
        }
      }
    }
  }
</script>
