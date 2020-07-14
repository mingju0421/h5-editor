/** 组件库入口 */

const components = []

const install = (Vue) => {
  if (install.installed) return
  install.installed = true
  components.map((component) => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

let componentsObject = {}

components.forEach((element) => {
  componentsObject[element.name] = element
})

export { componentsObject }
