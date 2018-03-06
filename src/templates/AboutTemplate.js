/*
This is basically just a modified version of PostTemplate.
I may just make this a post with id of 'about' at some point.
*/

import React from 'react'
import MobileNavBar from '../parts/MobileNavBar'
import SiteNavWindow from '../parts/SiteNavWindow'
// import PostContentWrap from '../parts/PostContentWrap'
import PostPager from '../parts/PostPager'
import { posts } from '../data/posts'
import faGithub from '../styles/faGithub.svg'

export default class AboutTemplate extends React.Component {
  constructor(props) {
    super(props)
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
      <div className='pageLayoutA' data-mobile-view={mobileView} data-template='about'>
        <MobileNavBar 
          mobileView={mobileView}
          mobileNavBarIsOpen={mobileNavBarIsOpen}
          currentPostId={currentPostId}
          prevPostId={prevPostId}
          nextPostId={nextPostId}
          handleHamburgerClick={this.handleHamburgerClick}
        />
        <div className='pageRow'>
          <div className='pageColA'>
            <SiteNavWindow 
              currentPostId={currentPostId}
            />
          </div>
          <div className='pageColB'>
            <div className='postContentWindow'>
              <div className='PostContentWrap'>
                <div className='PostContent'>
                  <p>I'm James, a web developer based in the US.</p><p>This site is collection of notes on mostly web development, but I have an interest in game programming and sound design as well.
                  </p>
                  <p>A recent coding project of mine is <a href='https://github.com/jamesheston/mud-client-js' target='_blank'>mud-client-js</a>, a MUD client that runs in the browser and is written in React &amp; Redux.
                  </p>
                  <a className='block' href='https://github.com/jamesheston' target='_blank'>
                    <img className='githubSvg' width={154} src={faGithub} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  handleHamburgerClick() {

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

