import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* first way to register component globally */
//import BaseIcon from '@/components/BaseIcon'
//Vue.component('BaseIcon', BaseIcon)

import upperFirst from 'lodash/upperFirst' //converts the first character of a string to upper case
import camelCase from 'lodash/camelCase' //converts a string to camel case

Vue.config.productionTip = false

/*
 way to automatic register component globally
 */
//require.context is a feature of Webpack
//Webpack looks for require.context() in the code while building, then requires every matching file to ensure it’s in your compiled bundle
const requireComponent = require.context(
  './components', //directory to search within
  false, //a flag indicating whether subdirectories should be searched, too
  /Base[A-Z]\w+\.(vue|js)$/ //a regular expression to match files against
)

requireComponent.keys().forEach(fileName => {
  //get the object exported using requireComponent
  const componentConfig = requireComponent(fileName)
  //convert filename to PascalCase
  //this will allow the component to be referenced as both PascalCase (e.g. <BaseIcon/>) or kebab-case (e.g. <base-icon/>)
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1')) // removes what's before and after the filename itself
  )
  //we’re registering each component globally,
  //and telling Vue to look for the component options on .default,
  //which will exist if the component was exported with export default
  Vue.component(componentName, componentConfig.default || componentConfig)
})
/*
 End
 */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
