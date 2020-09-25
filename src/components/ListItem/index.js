import React, { memo } from 'react'
// import LazyLoad from 'react-lazy-load'
import './index.scss'

const ListItem = ({ item, index }) => {
  return (
    <div className='free-item'>
      <div className='free-item-num'>{index}</div>
      <div className='free-item-info-wrapper'>
        <div className='free-item-info'>
          <div className='item-img-wrapper'>
            {/* <LazyLoad offsetVertical={1000}> */}
            <img className={`item-img ${!!(index % 2) ? '' : 'circle'}`} src={item.artworkUrl100} alt={item.name} />
            {/* </LazyLoad> */}
          </div>
          <div className='item-info'>
            <div className='item-name ellipsis-two'>{item.name}</div>
            <div className='item-cate'>{item.genres[0].name}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ListItem)
