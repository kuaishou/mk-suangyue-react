import styles from './Login.module.scss'
import { useAppDispath } from '../../store'
import { loginAction, updateToken, User } from '../../store/modules/users'
import { Button, Col, Form, Input, Row, message } from 'antd'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'


const testUsers: User[] = [
    {
        email: 'huangrong@imooc.com',
        pass: 'huangrong'
    },
    {
        email: 'hongqigong@imooc.com',
        pass: 'hongqigong'
    }
];
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispath()
    const handleLogin = (user: User) => {
        dispatch(loginAction(user)).then((action) => {
            const { errcode, token } = (action.payload as { [index: string]: unknown }).data as { [index: string]: unknown }
            if (errcode === 0) {
                dispatch(updateToken(token as string))
                message.success('登录成功')
                navigate('/')
            } else {
                message.error('登录失败')
            }
        })
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return <div className={styles.login}>
        <div className={styles.header}>
            <span className={styles.headerLogo}>
                <i className={classNames("iconfont icon-react", styles['icon-react'])}></i>
                <i className={classNames("iconfont icon-icon-test", styles['icon-icon-test'])}></i>
                <i className={classNames("iconfont icon-typescript", styles['icon-typescript'])}></i>
            </span>
            <span className={styles.headerTitle}>在线考勤系统</span>
        </div>
        <div className={styles.desc}>
            零基础从入门到进阶，系统掌握前端三大热门技术(Vue、React、TypeScript)
        </div>
        <Form
            className={styles.main}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={handleLogin}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<User>
                label="邮箱"
                name="email"
                rules={[
                    { required: true, message: '请输入邮箱' },
                    { type: 'email', message: '请输入正确的邮箱' }
                ]}
            >
                <Input placeholder='请输入邮箱' />
            </Form.Item>

            <Form.Item<User>
                label="密码"
                name="pass"
                rules={[{ required: true, message: '请输入密码' }]}
            >
                <Input.Password visibilityToggle={false} placeholder='请输入密码' />
            </Form.Item>


            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    登录
                </Button>
            </Form.Item>
        </Form>
        <div className={styles.users}>
            <Row>
                {testUsers.map((item) => <Col key={item.email} span={12}>
                    <h3>
                        测试账号，<Button onClick={() => handleLogin(item)}>一键登录</Button>
                    </h3>
                    <p>邮箱：{item.email}</p>
                    <p>密码：{item.pass}</p>
                </Col>)}

            </Row>
        </div >
    </div >
}

export default Login