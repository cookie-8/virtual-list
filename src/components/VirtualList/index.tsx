import React, { FC, useState, useEffect, useRef, useCallback } from 'react'

import './index.scss'

interface P {
  itemSize: number
  dataSource: any[]
  height: number
  bufferSize: number
  renderItem(ele: any, index: number): React.ReactNode
}

const VirtualList: FC<P> = props => {
  const [visibleData, setVisibleData] = useState([])
  // const [offset, setOffset] = useState({ startOffset: 0, endOffset: 0, startIndex: 0, endIndex: 0 })
  const offset = useRef({ startOffset: 0, endOffset: 0, startIndex: 0, endIndex: 0 })
  const wraper = useRef<HTMLDivElement>(null)
  const visibleCount = useRef(0)
  const updateIndexRef = useRef(null)
  // const updateDataRef = useRef(null)

  const { itemSize, dataSource, height, bufferSize, renderItem } = props

  const updateVisibleData = useCallback(
    (s, e) => {
      const visibleData = dataSource.slice(s, e)

      setVisibleData(visibleData)
    },
    [dataSource],
  )

  const updateBoundaryIndex = useCallback(
    (scrollTop = 0) => {
      console.log('%c%s', 'color: #d90000', scrollTop)

      const index = scrollTop / itemSize - 1
      const startIndex = index > 0 ? index | 0 : 0
      const endIndex = startIndex + visibleCount.current
      const end = dataSource.length - 1 - endIndex
      console.log('%c%s', 'color: #ffa640', startIndex)

      // setOffset({
      //   startOffset: startIndex * itemSize,
      //   endOffset: (end < 0 ? 0 : end) * itemSize,
      //   startIndex,
      //   endIndex,
      // })
      offset.current = {
        startOffset: startIndex * itemSize,
        endOffset: (end < 0 ? 0 : end) * itemSize,
        startIndex,
        endIndex,
      }
      updateVisibleData(startIndex, endIndex)
    },
    [dataSource, itemSize],
  )

  // const handleScroll = useCallback(() => {
  //   const scrollTop = wraper.current.scrollTop
  //   updateBoundaryIndex(scrollTop)
  //   updateVisibleData()
  // }, [])

  useEffect(() => {
    updateIndexRef.current = updateBoundaryIndex
    // updateDataRef.current = updateVisibleData
    updateIndexRef.current(wraper.current.scrollTop)
    // updateDataRef.current()
  }, [dataSource, itemSize, height])

  useEffect(() => {
    visibleCount.current = Math.ceil(height / itemSize) + bufferSize
    // offset.current = {
    //   startOffset: wraper.current.scrollTop,
    //   endOffset: visibleCount.current * height,
    //   startIndex: 0,
    //   endIndex: visibleCount.current,
    // }
    // updateIndexRef.current(0)
    // updateIndexRef.current()
    const handleScroll = () => {
      const scrollTop = wraper.current.scrollTop
      updateIndexRef.current(scrollTop)
      // updateDataRef.current()
    }
    wraper.current.addEventListener('scroll', handleScroll), { passitive: true }
    return () => {
      wraper.current.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="list-wraper" ref={wraper} style={{ height }}>
      <div style={{ paddingTop: `${offset.current.startOffset}px`, paddingBottom: `${offset.current.endOffset}px` }}>
        {visibleData.map((ele, index) => {
          return renderItem(ele, offset.current.startIndex + index)
          // return (
          //   <p className="ppp" key={offset.current.startIndex + index}>
          //     {ele.txt}
          //   </p>
          // )
        })}
      </div>
    </div>
  )
}

export default VirtualList
