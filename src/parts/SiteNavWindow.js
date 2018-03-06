import React from 'react'
import { NavLink } from 'react-router-dom'

import { posts } from '../data/posts'

class SiteNavWindow extends React.Component {
  constructor(props) {
    super(props)
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this)    
  }
  handleSearchInputChange(q) {
    this.refs.$PostList.handlePostsFilterChange(q)
  }  
  render() {
    return (
      <div className='SiteNavWindow'>
        <div className='topGroup'>
          <PostSearchInput 
            handleSearchInputChange={this.handleSearchInputChange}
          />
          <PostList
            ref="$PostList"
          />          
        </div>
        <DesktopSiteNav />
      </div>
    )
  }
}




const isDesktopLinkActive = (match, location) => {
  if( location.pathname === "/" || location.pathname.indexOf('post') !== -1 ) {
    return true
  } else {
    return false
  }
}
class DesktopSiteNav extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='DesktopSiteNav'>
        <NavLink to='/' isActive={isDesktopLinkActive} activeClassName="active">posts</NavLink>
        <NavLink to='/about' activeClassName="active">about</NavLink>
      </div>
    )
  }
}




class PostSearchInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      q: ''
    }
    this.handleInput = this.handleInput.bind(this)  
  }
  render() {
    return (
      <div className='PostSearchInput'>
        <input type='text' 
          placeholder='search post titles' 
          value={this.state.q} 
          onInput={this.handleInput}
        />
      </div>
    )
  }  
  handleInput(event) {
    const { value } = event.target
    this.props.handleSearchInputChange(value)
    this.setState({ q: value })
  }
}




class PostListItem extends React.Component {
  constructor(props) {
    super(props) 
  }
  render() {
    let date = this.props.date.slice(0, 7)
    const isListItemActive = (match, location) => {
      const mostRecentPostId = posts[0]['id']
      // Condition 1 - We are on the homepage, and "this" <NavLink/> is the first post,
      // so link should be "active"
      if( location.pathname === "/" && this.props.id == mostRecentPostId ) {
        return true
      // Condition 2 - match exists
      } else if (match) {
        return true
      // Condition 3 - no match. link should be inactive
      } else {
        return false
      }
    }
    return (
      <NavLink 
        to={'/post' + this.props.id} 
        isActive={isListItemActive}
        className='PostListItem'
        activeClassName="active" 
      >
        <div className='row'>
          <div className='col date'>
            {date}
          </div>
          <div className='col title'
            dangerouslySetInnerHTML={highlightQueryMatches(this.props.title, this.props.q)}
          >
          </div>
        </div>
      </NavLink>
    )
  } 
}
function highlightQueryMatches(title, q) {
  let markup = ''
  if( q === '' ) {
    markup = title
  } else {
    var rgx = new RegExp('(' + q + ')', 'gi')
    markup = title.replace(rgx, '<strong>' + "$1" + '</strong>')    
  }
  return {__html: markup}
}




class PostList extends React.Component {
  constructor(props) {
    super(props)
    this.handlePostsFilterChange = this.handlePostsFilterChange.bind(this)   
    this.state = {
      // posts which match the filter query are displayed, others are hidden
      q: '',
      matchingPosts: posts,
    }     
  }
  handlePostsFilterChange(q) {
    const matchingPosts = this.filterPosts(posts, q) // global posts
    this.setState( { matchingPosts: matchingPosts, q: q } )
  }  
  filterPosts(posts, q) {
    const allPosts = posts.slice() // clone global/passed posts
    let filteredPosts = allPosts.filter( (post) => {
      const rgx = new RegExp(q, 'i') // case insensitive search
      return rgx.test( post.title )
    })
    return filteredPosts
  }
  render() {
    const q = this.state.q
    const listPosts = this.state.matchingPosts.map( function(post, i) {
      return (
        <PostListItem 
          key={post.id}
          id={post.id}
          date={post.date}
          title={post.title}
          q={q}
        />
      )
    })

    return (
      <div className='PostList'>
        {listPosts}
      </div>
    )
  }
}

export default SiteNavWindow