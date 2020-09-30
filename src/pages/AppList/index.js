import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import Search from '@components/Search'
import Recommend from '@components/Recommend'
import ListItem from '@components/ListItem'
import Scroll from '@base/Scroll'
import Loading from '@base/Loading'
import useViewport from '@hook/useViewport'
import { getRecommendList, getAllFreeList, getFreeList, searchApp } from '@redux/list.redux'

import './index.scss'

const AppList = () => {
  const [value, setValue] = useState('')
  const [pullUpEnd, setPullEnd] = useState(false)
  const dispatch = useDispatch()
  const scrollRef = useRef()
  const { width, height } = useViewport()
  const { recommendList, page, maxPage, searchStatus } = useSelector(state => ({
    recommendList: state.list.recommendList,
    page: state.list.page,
    maxPage: state.list.maxPage,
    searchStatus: state.list.searchStatus,
  }))
  const freeList = useSelector(state => state.list.freeList)
  useEffect(() => {
    dispatch(getRecommendList())
    dispatch(getAllFreeList())
  }, [dispatch])

  useEffect(() => {
    setTimeout(() => {
      if (scrollRef) {
        scrollRef.current.refresh()
      }
    }, 20)
  }, [width, height])

  const loadMore = () => {
    dispatch(getFreeList())
    if (page === maxPage) {
      setPullEnd(true)
    }
  }

  const handleChange = value => {
    const handleSearch = _.throttle(() => {
      setValue(value)
      dispatch(searchApp(value))
    }, 150)
    handleSearch()
  }

  const showLoading = () => (freeList.length === 0 ? <Loading /> : null)

  return (
    <div>
      <Search value={value} onChange={handleChange} />
      <div className='list-content'>
        <Recommend list={recommendList} />
        <div className='free-scroll-wrapper'>
          <Scroll
            data={freeList}
            ref={scrollRef}
            direction='vertical'
            pullUpLoad={true}
            pullingUp={loadMore}
            pullUpEnd={pullUpEnd}
          >
            <div className='free-list'>
              {freeList.length > 0 &&
                freeList.map((item, index) => <ListItem key={item.id} item={item} index={index + 1} loadMore={loadMore} />)}
            </div>
          </Scroll>
          <div className='loading-wrapper'>{!searchStatus ? showLoading() : null}</div>
          <div className='empty-search-result'>
            {searchStatus && freeList.length === 0 ? <div className='empty-text'>沒有找到對應的 App</div> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppList
