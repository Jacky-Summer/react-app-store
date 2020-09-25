import React, { useState, useEffect, useContext } from 'react'
import _ from 'lodash'

const viewportContext = React.createContext({})

export const ViewportProvider = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  const handleWindowResize = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  const debounceWindowSize = _.debounce(handleWindowResize, 150)

  useEffect(() => {
    window.addEventListener('resize', debounceWindowSize)
    return () => window.removeEventListener('resize', debounceWindowSize)
  }, []) // eslint-disable-line

  return <viewportContext.Provider value={{ width, height }}>{children}</viewportContext.Provider>
}

const useViewport = () => {
  const { width, height } = useContext(viewportContext)
  return { width, height }
}

export default useViewport
