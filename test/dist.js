(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
let lazyfetchUrls = []

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

  if (document.readyState === 'complete') loadUrls()
  else window.addEventListener('load', loadUrls)
}

const loadUrls = () => {
  let clonedUrls = lazyfetchUrls.slice(0)
  lazyfetchUrls = []

  clonedUrls.map(({ urls, callback }) => {
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

module.exports = lazyfetch

},{}],2:[function(require,module,exports){
const lazyfetch = require('../index')

lazyfetch(['1.js', '2.js'], () => {
  lazyfetch('3.js')
})

},{"../index":1}]},{},[2]);
