import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import cx from 'classnames'
// import { testService } from '@src/api'
import VirtualList from '@src/components/VirtualList'
import './index.scss'

type P = RouteComponentProps & {}
type S = {
  data: any[]
}

class Index extends Component<P, S> {
  state: S = {
    data: [
      { id: 1, txt: 1 },
      { id: 2, txt: 2 },
      { id: 3, txt: 3 },
    ],
  }
  componentDidMount() {
    // this.fetchList()
    // this.props.history.push('/')
    const data = Object.keys(Array.from(Array(1000))).map(ele => {
      return { id: ele, txt: ele }
    })
    this.setState({ data })
  }

  getA = () => {
    console.log(1, window.a)
  }

  // fetchList = async () => {
  //     const res = await testService.getList()
  //     console.log('fetchList -> res', res)
  //     // 接口异常错误处理
  //     if (res.code !== 200) {
  //         /**
  //          *
  //          */
  //         return
  //     }
  //     // 接口请求成功
  // }

  renderItem = (item: any, index) => {
    // console.log(item)
    return <div key={index}>{item.txt}</div>
  }

  render() {
    const { data } = this.state
    return (
      <div>
        <div className={cx('text')}>Index</div>
        <VirtualList
          itemSize={30}
          height={160}
          dataSource={data}
          bufferSize={5}
          renderItem={this.renderItem}
        ></VirtualList>
      </div>
    )
  }
}

export default withRouter(Index)
