// Import defaults.
import { TITLE, DESCRIPTION, CARD_IMAGE } from '@root/webconfig'

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
        title: meta.title ? `${meta.title} - ${TITLE}` : TITLE,
        description: meta.description ? `${meta.description}` : DESCRIPTION,
        card: meta.card ? `${meta.card}` : CARD_IMAGE,
        statusCode: meta.statusCode ? meta.statusCode : 200
      }
    }
  }
}

function clientMeta( data ) {

  const meta = getMeta( data )

  // Retrieve list of <meta> in head.
  let metaList = document.getElementsByTagName( 'meta' )

  if ( meta ) {
    document.title = meta.title ? `${meta.title} - ${TITLE}` : TITLE
    metaList[3].content = meta.description ? `${meta.description}` : DESCRIPTION // description
    metaList[4].content = meta.title ? `${meta.title} - ${TITLE}` : TITLE // og:title
    metaList[5].content = meta.description ? `${meta.description}` : DESCRIPTION // og:description
    metaList[6].content = meta.card ? `${meta.card}` : CARD_IMAGE // og:image
  }

  // Always update URL.
  document.querySelector( 'meta[name=og:url]' ).setAttribute( 'content', window.location.href )
}

const clientMetaMixin = {

  mounted() {
    clientMeta( this )
  },
  watch: {
    '$route': function( to, from ) {
      clientMeta( this )
    }
  }
}

export default process.env.VUE_ENV === 'server' ? serverMetaMixin : clientMetaMixin
