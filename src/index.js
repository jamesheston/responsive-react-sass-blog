import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import Site from './Site'

import './index.css'
// import registerServiceWorker from './registerServiceWorker'

ReactDOM.render((
  <HashRouter>
    <Site />
  </HashRouter>
), document.getElementById('root'))
// registerServiceWorker()
