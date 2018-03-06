import React from 'react'
import { Link } from 'react-router-dom'

export default class PostPager extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const prevPostUrl = '/post' + this.props.prevPostId
    const nextPostUrl = '/post' + this.props.nextPostId
    return (
      <div className='PostPager'>
        <Link className='prev' to={prevPostUrl}><i>&larr;</i> <span>prev post</span></Link>
        <Link className='next' to={nextPostUrl}><span>next post</span> <i>&rarr;</i></Link>  
      </div>
    )
  }
}