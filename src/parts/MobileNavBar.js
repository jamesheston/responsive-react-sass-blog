import React from 'react'
import { Link, NavLink, Route } from 'react-router-dom'

const isPostsLinkActive = (match, location) => {
  if( location.pathname === "/" || location.pathname.indexOf('post') !== -1 ) {
    return true
  } else {
    return false
  }
}
const isAboutLinkActive = (match, location) => {
  if( location.pathname.indexOf('about') !== -1 ) {
    return true
  } else {
    return false
  }  
}

export default class MobileNavBar extends React.Component {
  constructor(props) {
    super(props)
    // this.handleHamburgerClick = this.handleHamburgerClick.bind(this)
  }
  // handleHamburgerClick() {
  //   this.setState({ 'isOpen': !this.state.isOpen })
  // }
  render() {
    console.log('MobileNavBar render() props')
    console.log(this.props)

    const prevPostUrl = '/post' + this.props.prevPostId
    const nextPostUrl = '/post' + this.props.nextPostId
    let toggleButtonUrl = '/post' + this.props.currentPostId 

    console.log('this.props.mobileNavBarIsOpen')
    console.log(this.props.mobileNavBarIsOpen)

    if( this.props.mobileNavBarIsOpen ) {
      toggleButtonUrl += '?mobileView=colB&mobileNavBarIsOpen=false'
    } else {
      toggleButtonUrl += '?mobileView=colA&mobileNavBarIsOpen=true'
    }

    return (
      <div className='MobileNavBar' data-is-open={this.props.mobileNavBarIsOpen}>
        {/* 
        Left Link
        */}
        { this.props.mobileNavBarIsOpen ?
          <NavLink to='/?mobileView=colA?mobileNavBarIsOpen=true' isActive={isPostsLinkActive} className='navLink siteNav' activeClassName="active"><i></i>posts</NavLink>
        :
          <Link to={prevPostUrl} className='navLink pager prev'><i>&larr;</i> <span>prev post</span></Link>
        }
        {/* 
        Hamburger/Toggle Link
        */}
        {/*
        <a className='toggleMobileNavLink'
          onClick={this.handleHamburgerClick}
        >
          <div className='hamburger'>
            <div className='hamburger-box'>
              <div className='hamburger-inner'></div>
            </div>
          </div>
        </a>
        */}
        <Link className='toggleMobileNavLink'
          to={toggleButtonUrl}
        >
          <div className='hamburger'>
            <div className='hamburger-box'>
              <div className='hamburger-inner'></div>
            </div>
          </div>
        </Link>
        {/* 
        Right Link
        */}
        { this.props.mobileNavBarIsOpen ?
          <NavLink 
          to='/about?mobileView=colB?mobileNavBarIsOpen=true' 
          isActive={isAboutLinkActive}
          className='navLink siteNav r' activeClassName="active"><span>about</span><i></i></NavLink>
        :
          <Link to={nextPostUrl} className='navLink pager next r'><span>next post</span> <i>&rarr;</i></Link>
        }
      </div>
    )
  }
}