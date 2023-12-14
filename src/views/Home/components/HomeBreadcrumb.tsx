import { Outlet } from 'react-router-dom'
import styles from '../Home.module.scss'
import { Breadcrumb } from 'antd'
interface IProps {
    name?: string
}
const HomeBreadcrumb: React.FC<IProps> = (props) => {

    return <>
        <Breadcrumb className={styles.homeBreadcrumb}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
    </>
}

export default HomeBreadcrumb