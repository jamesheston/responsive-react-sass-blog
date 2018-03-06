/*
Default template is post detail template.

Current code structure is based around idea that
when page loads, the state of the entire site can be
pulled from url path and query vars, and this only needs
to be done 1x in the current template component (
PostTemplate in this case).

The state is then passed down through props
to all the descendants of the template component. 

*/

import React from 'react'
import MobileNavBar from '../parts/MobileNavBar'
import SiteNavWindow from '../parts/SiteNavWindow'
import PostContentWrap from '../parts/PostContentWrap'
import PostPager from '../parts/PostPager'
import { posts } from '../data/posts'

export default class PostTemplate extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidUpdate() {
    // move view to top of post detail when a new post is loaded in  
    window.scroll(0,0) 
  }
  render() {
    const {
      mostRecentPostId,
      currentPostId,
      prevPostId,
      nextPostId,
      mobileView,
      mobileNavBarIsOpen
    } =  this.gatherProps()

    return (
      <div className='pageLayoutA' data-mobile-view={mobileView}>
        <MobileNavBar 
          mobileView={mobileView}
          mobileNavBarIsOpen={mobileNavBarIsOpen}
          currentPostId={currentPostId}
          prevPostId={prevPostId}
          nextPostId={nextPostId}
        />
        <div className='pageRow'>
          <div className='pageColA'>
            <SiteNavWindow 
              currentPostId={currentPostId}
            />
          </div>
          <div className='pageColB'>
            <div className='postContentWindow'>
              <PostContentWrap 
                currentPostId={currentPostId}
              />
              <PostPager 
                prevPostId={prevPostId}
                nextPostId={nextPostId}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
  gatherProps() {
    let mostRecentPostId 
    let currentPostId    
    let nextPostId       
    let prevPostId 
    let mobileView 
    let mobileNavBarIsOpen     

    // 1. mostRecentPostId
    mostRecentPostId = posts[0]['id']

    // 2. currentPostId
    // if we're on index page, currentPostId is mostRecentId
    if ( this.props.match.url.indexOf('post') === -1 ) {
      currentPostId = mostRecentPostId
    // otherwise (default), grab post id from url
    } else {
      currentPostId = this.props.match.url.match( /post(\d+)/ )[1]
    }

    // 3. nextPostId
    // 4. prevPostId
    // current post's index position in `posts` array. represents its list order, effectively
    let currentI = posts.findIndex( function(post) {
      return post.id == currentPostId
    }) 
    let nextI = currentI + 1
    if( nextI == (posts.length) ) { // if its _over_ limit, set to 0, which is mostRecent
      nextI = 0
    }
    const nextPostObj = posts[nextI]
    let prevI = currentI - 1
    if ( prevI < 0 ) { // if its __under__ 0, set to highest index position
      prevI = posts.length - 1
    }
    const prevPostObj = posts[prevI]
    prevPostId = prevPostObj.id
    nextPostId = nextPostObj.id  

    // 5. mobileView
    mobileView = 'colB' // UNLESS THERE IS A mobileView query var in URL
    if( this.props.location.search.indexOf('mobileView') !== -1 ){
      let mvRgx = /mobileView\=([a-zA-Z]+)/
      mobileView = this.props.location.search.match(mvRgx)[1]
    }

    // 6. mobileNavBarIsOpen
    mobileNavBarIsOpen = false
    if( this.props.location.search.indexOf('mobileNavBarIsOpen') !== -1 ){
      let nvoRgx = /mobileNavBarIsOpen\=([a-zA-Z]+)/
      mobileNavBarIsOpen = this.props.location.search.match(nvoRgx)[1]
      // convert to actual bool
      mobileNavBarIsOpen = (mobileNavBarIsOpen == 'true')
    }    

    return {
      mostRecentPostId,
      currentPostId,
      prevPostId,
      nextPostId,
      mobileView,
      mobileNavBarIsOpen,    
    }  
  }  
}

