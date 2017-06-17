const lazyfetch = require('../index')

lazyfetch(['1.js', '2.js'], () => {
  lazyfetch('3.js')
})
