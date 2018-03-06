import React from 'react'
import ReactDOM, {render} from 'react-dom'
import { Router, Route, Switch } from 'react-router-dom'

import PostTemplate from './templates/PostTemplate'
import AboutTemplate from './templates/AboutTemplate'

class Site extends React.Component {
  render() {
    return (
      <div className='Site'>
        <Switch>
          <Route exact path='/' component={PostTemplate} />
          <Route path='/post:id' component={PostTemplate} />
          <Route path='/about' component={AboutTemplate} />
        </Switch>
      </div>
    )
  }
}

export default Site