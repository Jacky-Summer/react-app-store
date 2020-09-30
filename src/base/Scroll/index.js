import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle, useMemo } from 'react'
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import _ from 'lodash'
import PropTypes from 'prop-types'
import Loading from '@base/Loading'
import './index.scss'

BScroll.use(Pullup)

const Scroll = forwardRef((props, ref) => {
  const [isLoading, setIsLoading] = useState(false)
  const [bScroll, setBScroll] = useState()
  const scrollContaninerRef = useRef()

  const { onScroll, direction, pullUpLoad, pullingUp, pullUpEnd, data, click } = props

  let pullingUpDebounce = useMemo(() => {
    return _.debounce(pullingUp, 500)
  }, [pullingUp])

  useEffect(() => {
    const scroll = new BScroll(scrollContaninerRef.current, {
      scrollX: direction === 'horizontal',
      scrollY: direction === 'vertical',
      click: click,
      probeType: 3,
      pullUpLoad: pullUpLoad,
      bounce: {
        top: true,
        bottom: true,
      },
      disableMouse: false,
      disableTouch: false,
    })
    setBScroll(scroll)
    return () => {
      setBScroll(null)
    }
  }, []) // eslint-disable-line

  useEffect(() => {
    if (!bScroll || !onScroll) return
    bScroll.on('scroll', onScroll)
    return () => {
      bScroll.off('scroll', onScroll)
    }
  }, [onScroll, bScroll])

  // handle pullUp
  useEffect(() => {
    if (!bScroll || !pullUpLoad) return

    const handlePullUp = async () => {
      if (bScroll.y <= bScroll.maxScrollY + 40) {
        if (pullUpEnd) {
          return
        }
        setIsLoading(true)
        pullingUpDebounce()
        bScroll.finishPullUp()
        bScroll.refresh()
        setTimeout(() => {
          setIsLoading(false)
        }, 16)
      }
    }
    bScroll.on('scrollEnd', handlePullUp)
    return () => {
      bScroll.off('scrollEnd', handlePullUp)
    }
  }, [bScroll, pullUpLoad, pullingUpDebounce]) // eslint-disable-line

  useEffect(() => {
    if (bScroll) {
      bScroll.refresh()
    }
  }, [bScroll, data])

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        setTimeout(() => {
          bScroll.refresh()
        }, 20)
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll
      }
    },
  }))

  return (
    <div className='scroll-wrapper' ref={scrollContaninerRef}>
      {props.children}
      {pullUpLoad && isLoading ? (
        <div className='scroll-loading'>
          <Loading />
        </div>
      ) : null}
    </div>
  )
})

Scroll.defaultProps = {
  direction: 'horizontal',
  click: true,
  onScroll: () => {},
  pullUpLoad: false,
  pullingUp: () => {},
  pullUpLoading: false,
  pullUpEnd: false,
}

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  click: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullUpEnd: PropTypes.bool,
}

export default Scroll
