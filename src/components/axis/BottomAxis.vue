<template >
  <g class="axis" :transform="location">
    <line class="domain" :stroke="settings.color" :x2="settings.length" y2="0"></line>
    <g v-for="tick in ticks" :transform="tick.location">
      <line class="tick" x2="0" :y2="-settings.tickLength" :stroke="settings.color"></line>
      <text text-anchor="middle" x="0" :y="settings.tickLength*0.5" dy="1em">{{tick.value}}</text>
    </g>
  </g>
</template>

<script>
export default{
  props:["settings"],
  computed:{
    ticks:function(){
      const settings = this.settings;
      const scale = d3.scale.linear()
        .range([0,settings.length])
        .domain(settings.scale);

      if(settings.ticks){
        return settings.ticks.map(v=>
          {
            return {
              location:`translate(${scale(v)},0)`,
              value:v
            }
          });
      }else if(settings.step){
        const step = settings.step;
        const range = settings.scale;
        let ticks = [];
        for(let x=range[0];x<=range[1];x+=step){
          ticks.push({
            location : `translate(${scale(x)},0)`,
            value : x
          });
        }
        return ticks;
      }else{
        return settings.scale.map(v=>
        {
          return {
            location:`translate(${scale(v)},0)`,
            value:v
          }
        });
      }
    },
    location:function(){
      const x = this.settings.x || 0;
      const y = this.settings.y || 0;
      if(!!x || !!y){
        return `translate(${x},${y})`;
      }
    }
  }
}
</script>
