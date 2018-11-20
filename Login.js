import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
class Login extends React.Component{
  render () {
    const {userInfo, onLogin, onLogout} = this.props
    return (
      <div>
        <hr/>
        <button onClick={onLogin}>
          登陆
        </button>
        {' '}
        <button onClick={onLogout}>
          退出
        </button>
        <p>用户数据：{JSON.stringify(userInfo)}</p>
        <p style={userInfo.err ? {color: 'red'} : {}}>错误提示: {userInfo.err ? userInfo.err.stack : '暂无'}</p>
      </div>
    )
  }
}
Login.propTypes = {
  userInfo: PropTypes.object.isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.loginRequest
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: () => {
      dispatch ({
        type: 'LOGIN_REQUEST',
        username: 'daiwei',
        pwd: 'Daiwei19940320'
      })
    },
    onLogout () {
      dispatch ({
        type: 'LOGIN_OUT'
      })
    }
  }
}

const MineLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
export default MineLogin
