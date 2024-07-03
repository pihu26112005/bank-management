import React from 'react'

const Header = ({type= "title", title, subtext, user}: HeaderBoxProps) => {
  return (
    <div className='header-box'>
        <h1 className='header-box-title'>
            {title}
            {type === 'greeting' && <span className='text-bankGradient'> {user}</span>}
        </h1>
        {<span className='header-box-subtext'> {subtext}</span>}
    </div>
  )
}

export default Header