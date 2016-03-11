<template >
  <g class="axis" :transform="location">
    <line class="domain" :stroke="settings.color" :y2="settings.height" x2="0"></line>
    <g v-for="tick in ticks" :transform="tick.location">
      <line class="tick" x2="-settings.tickLength" :y2="0" :stroke="settings.color"></line>
      <text text-anchor="end" x="-settings.tickLength*1.5" :y="0" dx="-1em">{{tick.value}}</text>
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
          return settings.ticks.map(v=>{
            return {
              location:`translate(0,${scale(v)})`,
              value:v
            };
          })
        }else if(settings.step){
          const step = settings.step;
          const range = settings.scale;
          let ticks = [];
          for(let x=range[0];x<=range[1];x+=step){
            ticks.push({
              location: `translate(0,${scale(x)})`,
              value:x
            });
          }
          return ticks;
        }else{
          return settings.scale.map(v=>{
            return {
              location:`translate(0,${scale(v)})`,
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
