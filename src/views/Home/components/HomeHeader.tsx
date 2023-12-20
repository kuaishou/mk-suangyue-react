import { Link, Outlet } from 'react-router-dom'
import styles from '../Home.module.scss'
import { Avatar, Badge, Button, Dropdown, MenuProps, Space } from 'antd'
import classNames from 'classnames'
import { BellOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { RootState, useAppDispath } from '../../../store'
import { clearToken } from '../../../store/modules/users'
import { useEffect } from 'react'
import { Info, getRemindAction, updateNewsInfos } from '../../../store/modules/news'
interface IProps {
  name?: string
}



const HomeHeader: React.FC<IProps> = () => {

  const name = useSelector((state: RootState) => state.users.infos.name) as string
  const head = useSelector((state: RootState) => state.users.infos.head) as string
  const _id = useSelector((state: RootState) => state.users.infos._id) as string
  const newsInfo = useSelector((state: RootState) => state.news.info)
  const isDot = (newsInfo.applicant || newsInfo.approver) as boolean | undefined

  const dispatch = useAppDispath()
  const handleLoginOut = () => {
    dispatch(clearToken())
    setTimeout(() => {
      window.location.replace('./login')
    })
  }
  useEffect(() => {
    dispatch(getRemindAction({ userid: _id })).then((action) => {
      const { errcode, info } = (action.payload as { [index: string]: unknown }).data as { [index: string]: unknown }
      if (errcode === 0) {
        dispatch(updateNewsInfos(info as Info))
      }
    })
  }, [_id, dispatch])

  const items1: MenuProps['items'] = [];
  if (newsInfo.applicant) {
    items1.push({
      key: '1',
      label: (
        <Link to='/apply'>有审批结果消息</Link>
      ),
    })
  }
  if (newsInfo.approver) {
    items1.push({
      key: '2',
      label: (
        <Link to='/check'>有审批请求消息</Link>
      ),
    })
  }
  if (!newsInfo.approver && !newsInfo.applicant) {
    items1.push({
      key: '2',
      label: '暂无消息'
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
      <Badge dot={isDot}>
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