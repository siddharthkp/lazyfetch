const lazyfetch = require('../index')

lazyfetch(['1.js', '2.js', 'style.css'], () => {
  lazyfetch('3.js')
})
