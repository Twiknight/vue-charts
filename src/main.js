import Vue from 'vue'
import App from './App.vue'
import {
  d3
}
from 'd3'

//outerHTML polyfill  for SVGElements
//should be remove when update Vue to 1.0.17 releases
Object.defineProperty(SVGElement.prototype, 'outerHTML', {
  get: function() {
    let wrapper = document.createElement('div')
    wrapper.appendChild(this.cloneNode(true))
    return wrapper.innerHTML
  }
})


new Vue({
  el: 'body',
  components: {
    App
  }
})
