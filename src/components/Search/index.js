import React, { useState, useEffect, useRef } from 'react'
import './index.scss'

const Search = ({ value, onChange }) => {
  const [isFocus, setIsFocus] = useState(false)
  const inputBarRef = useRef()
  const handleChange = e => {
    onChange(e.target.value)
  }

  const handleFocus = () => {
    setTimeout(() => {
      setIsFocus(true)
    }, 20)
  }

  const handleBlur = () => {
    setIsFocus(false)
  }

  useEffect(() => {
    if (isFocus || (!isFocus && value)) {
      inputBarRef.current.style.flexGrow = '0'
    } else if (!isFocus && !value) {
      inputBarRef.current.style.flexGrow = '1'
    }
  }, [isFocus, value])

  return (
    <div className='search-wrapper'>
      <div className='search-bar'>
        <div className='search-bar-input-container'>
          <div className='search-bar-placeholder-wrapper' ref={inputBarRef}>
            <i className='iconfont icon-search'></i>
            <span className='search-bar-placeholder'>{isFocus || value ? '' : '搜尋'}</span>
          </div>
          <input type='text' className='search-bar-input' onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
          <div className='search-bar-clear' style={{ display: 'none' }}>
            {/* <span className="search-bar-clear"></span> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
