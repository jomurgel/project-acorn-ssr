// Import defaults.
import { TITLE } from '@root/siteconfig'

const getMeta = vm => {
  const { meta } = vm.$options

  if ( meta ) {
    return typeof meta === 'function'
      ? meta.call( vm )
      : meta
  }
}

const serverMetaMixin = {

  created() {
    const meta = getMeta( this )
    /**
     * If getMeta returns undefined, you should not set this.$ssrContext.meta a value,otherwise, `Cannot read property 'ssrContext' of undefined` error will be thrown.
     */
    if ( meta ) {

      this.$ssrContext.meta = {
        title: `${meta.title} - ${TITLE}`,
        description: meta.description,
        card: meta.card
      }

    }
  }
}

const clientMetaMixin = {

  mounted() {
    const meta = getMeta( this )
    if ( meta ) {
      document.title = `${meta.title} - ${TITLE}`
    }
  }
}

export default process.env.VUE_ENV === 'server' ? serverMetaMixin : clientMetaMixin
