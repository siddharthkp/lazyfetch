const lazyfetch = (urls, callback, timeout) => {
  /* don't load on the server */
  if (typeof window == 'undefined') return

  /* default timeout of 3s */
  if (!timeout) timeout = 3000

  /*
    lazyfetch also supports single urls as well,
    convert that to an array for consistency
  */
  if (typeof urls === 'string') urls = [urls]

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

  window.setTimeout(() => {
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
      else console.log(`lazy load does not know how to handle ${extension}`)
    })
  }, timeout)
}

module.exports = lazyfetch
