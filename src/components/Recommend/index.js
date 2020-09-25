import React, { memo, useEffect, useRef } from 'react'
import Scroll from '@base/Scroll'
import Loading from '@base/Loading'
import useViewport from '@hook/useViewport'

import './index.scss'

const Recommend = ({ list }) => {
  const { width, height } = useViewport()
  const scrollRef = useRef()

  useEffect(() => {
    if (scrollRef) {
      scrollRef.current.refresh()
    }
  }, [width, height])

  return (
    <div className='recommend-con'>
      <div className='recommend-wrapper'>
        <h2 className='recommend-label'>推介</h2>
        <Scroll data={list} ref={scrollRef}>
          <div className='recommend-list'>
            {list.length > 0 &&
              list.map(item => {
                return (
                  <div key={item.id} className='item-wrapper'>
                    <div className='item-icon'>
                      <img className='icon-img' src={item.artworkUrl100} alt='' />
                    </div>
                    <div className='item-info'>
                      <div className='item-name ellipsis-two'>{item.name}</div>
                      <div className='item-cate'>{item.genres[0].name}</div>
                    </div>
                  </div>
                )
              })}
          </div>
        </Scroll>
        <div className='loading-wrapper'>{list.length > 0 ? null : <Loading />}</div>
      </div>
    </div>
  )
}

export default memo(Recommend)
