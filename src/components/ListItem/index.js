import React, { memo, useState } from 'react'
import listApi from '@api/list'
// import LazyLoad from 'react-lazy-load'
import './index.scss'

const ListItem = ({ item, index }) => {
  const [isLoadRating, setIsLoadRating] = useState(false) // eslint-disable-line
  if (!item.rating) {
    listApi.getRating(item.id).then(res => {
      const { userRatingCount, averageUserRating } = res.data.results[0]
      item.rating = averageUserRating.toFixed(1)
      item.ratingCount = userRatingCount
      setIsLoadRating(true)
    })
  }

  const LENGTH = 5
  const ON = 'on'
  const HALF = 'half'
  const OFF = 'off'

  const countRating = ratingCount => {
    let result = []

    let score = Math.floor(ratingCount * 2) / 2
    let hasDecimal = score % 1 !== 0
    let integer = Math.floor(score)

    for (let i = 0; i < integer; i++) {
      result.push(ON)
    }

    if (hasDecimal) {
      result.push(HALF)
    }

    while (result.length < LENGTH) {
      result.push(OFF)
    }
    return result
  }
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
            <div className='ratings-wrapper'>
              {item.rating
                ? countRating(item.rating).map((item, index) => (
                    <span key={`${item.artistId}-${index}`} className={`iconfont icon-star icon-star-${item}`}></span>
                  ))
                : null}
              {item.rating ? <span className='rating-count'>({item.ratingCount})</span> : null}
            </div>
            <div className='item-cate'>{item.genres[0].name}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ListItem)
