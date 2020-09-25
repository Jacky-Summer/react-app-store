import React from 'react'
import LoadingImg from './loading.gif'
import './index.scss'

const Loading = ({ title }) => {
  return (
    <div className='loading'>
      <img className='loading-img' src={LoadingImg} alt='' />
      <p className='desc'>{title}</p>
    </div>
  )
}

Loading.defaultProps = {
  title: 'Loading...',
}

export default Loading
