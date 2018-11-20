/*eslint-disable no-unused-vars */
import React, { Component, PropTypes } from 'react'

const Counter = ({ value, onFetchData, isFetch}) => {
  let tips = isFetch ? '数据加载中...' : '数据加载完成'
  return (
    <div>
      <button onClick={onFetchData}>
        onFetchData
      </button>
      <hr />
      <p>{tips}</p>
      <div>
        数据内容: {JSON.stringify(value)}
      </div>
    </div>
  )
}

Counter.propTypes = {
  value: PropTypes.object.isRequired,
  onFetchData: PropTypes.func.isRequired
}

export default Counter
