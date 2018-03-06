    // this.mapArray = require('./maps/' + mapId + '/' + mapId + '2dRenderArray')['default']

import React from 'react'

export default class PostContentWrap extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const postId = this.props.currentPostId
    const PostContentComponent = require('../data/posts/Post' + postId)['default']
    
    return (
      <div className='PostContentWrap'>
        <PostContentComponent />
      </div>
    )
  }
}