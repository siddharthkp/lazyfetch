const lazyfetchUrls = []

const lazyfetch = (urls, callback) => {
  /* don't load on the server */
  if (typeof window == 'undefined') return

  /*
    lazyfetch also supports single urls as well,
    convert that to an array for consistency
  */
  if (typeof urls === 'string') urls = [urls]

  /* put them in the global array */
  lazyfetchUrls.push({ urls, callback })
}

const loadUrls = () => {
  lazyfetchUrls.map(({ urls, callback }) => {
    /*
    we need to wait for all the urls to be loaded
    before executing the callback
  */
    const count = urls.length
    let loaded = 0
    const callbackHandler = () => {
      loaded++
      if (loaded === count && callback) callback()
    }

    urls.map(url => {
      const extension = url.split('.').pop()

      let tag

      if (extension === 'js') {
        tag = document.createElement('script')
        tag.src = url
      } else if (extension === 'css') {
        tag = document.createElement('link')
        tag.href = url
        tag.rel = 'stylesheet'
        tag.type = 'text/css'
      }
      tag.onload = callbackHandler

      if (['js', 'css'].includes(extension)) document.head.appendChild(tag)
      else console.warn(`lazyfetch does not know how to handle ${extension}`)
    })
  })
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') loadUrls()
  else window.onload = loadUrls
}

module.exports = lazyfetch
