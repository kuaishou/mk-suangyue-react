import { Outlet } from 'react-router-dom'
import styles from '../Home.module.scss'
import { Avatar, Badge, Button, Dropdown, MenuProps, Space } from 'antd'
import classNames from 'classnames'
import { BellOutlined } from '@ant-design/icons'
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
const items2: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        ),
    },

];

const HomeHeader: React.FC<IProps> = (props) => {

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
                <Avatar src='' />
                邢浩东
            </Space>
        </Dropdown>
        {/* <el-dropdown>
      <el-badge :is-dot="isDot">
        <el-icon :size="20"><Bell /></el-icon>
      </el-badge>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleNavigate('/apply')" v-if="newsInfo.applicant">有审批结果消息</el-dropdown-item>
          <el-dropdown-item @click="handleNavigate('/check')" v-if="newsInfo.approver">有审批请求消息</el-dropdown-item>
          <el-dropdown-item v-if="!newsInfo.applicant && !newsInfo.approver">暂无消息</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown>
      <el-space class="home-header-space">
        <el-avatar :src="(head as string)" /> {{ name }}
      </el-space>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown> */}
    </div>
}

export default HomeHeader