import { useSelector } from 'react-redux'
import styles from './Login.module.scss'
import { RootState, useAppDispath } from '../../store'
import { loginAction, updateToken } from '../../store/modules/users'
import { Button, message } from 'antd'
const Home = () => {

    const token = useSelector((state: RootState) => state.users.token)
    const dispatch = useAppDispath()
    const handleLogin = () => {
        dispatch(loginAction({ emali: 'xing.qq.comn', pass: '123' })).then((action) => {
            const { errcode, token } = (action.payload as { [index: string]: unknown }).data as { [index: string]: unknown }
            if (errcode === 0) {
                dispatch(updateToken(token as string))
                message.success('登录成功')
            } else {
                message.success('登录失败')
            }
        })
    }

    return <>
        <div>我是登录</div>
        <Button onClick={handleLogin}>点击登录</Button>
        <div>{token}</div>
    </>
}

export default Home