import Icon from './_Icon'

const components = [Icon]

const install = ( Vue, opts = {}) => {

  if ( install.installed ) {
    return
  }

  components.map( component => {
    Vue.component( component.name, component )
  })
}

export default {
  install,
  ...components
}
