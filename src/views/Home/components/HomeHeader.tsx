import { Outlet } from 'react-router-dom'
import styles from '../Home.module.scss'
import { Avatar, Badge, Button, Dropdown, MenuProps, Space } from 'antd'
import classNames from 'classnames'
import { BellOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { RootState, useAppDispath } from '../../../store'
import { clearToken } from '../../../store/modules/users'
interface IProps {
  name?: string
}

const items1: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },

];


const HomeHeader: React.FC<IProps> = () => {

  const name = useSelector((state: RootState) => state.users.infos.name) as string
  const head = useSelector((state: RootState) => state.users.infos.head) as string
  const dispatch = useAppDispath()
  const handleLoginOut = () => {
    dispatch(clearToken())
    setTimeout(() => {
      window.location.replace('./login')
    })

  }
  const items2: MenuProps['items'] = [
    {
      key: '1',
      label: <div>个人中心</div>,
    },
    {
      key: '2',
      label: <div onClick={handleLoginOut}>退出</div>,
    },
  ];
  return <div className={styles.homeHeader}>
    <span className={styles.homeHeaderLogo}>
      <i className={classNames("iconfont icon-react", styles['icon-react'])}></i>
      <i className={classNames("iconfont icon-icon-test", styles['icon-icon-test'])}></i>
      <i className={classNames("iconfont icon-typescript", styles['icon-typescript'])}></i>
    </span>
    <span className={styles.homeHeaderTitle}>在线考勤系统</span>

    <Dropdown menu={{ items: items1 }} placement="bottom" arrow>
      <Badge dot>
        <BellOutlined style={{ fontSize: 20 }} />
      </Badge>
    </Dropdown>


    <Dropdown menu={{ items: items2 }} placement="bottom" arrow>
      <Space className={styles.homeHeaderSpace}>
        <Avatar src={head} size='large' />
        {name}
      </Space>
    </Dropdown>
  </div>
}

export default HomeHeader