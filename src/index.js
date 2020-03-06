import React from 'react'
import ReactDOM from 'react-dom'
import App from './only-design-this'
import 'focus-visible' // polyfill for :focus-visible (https://github.com/WICG/focus-visible)

ReactDOM.render(<App />, document.getElementById('root'))
