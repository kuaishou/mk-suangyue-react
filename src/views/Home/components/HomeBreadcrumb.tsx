import { matchRoutes, useLocation } from 'react-router-dom'
import styles from '../Home.module.scss'
import { Breadcrumb } from 'antd'
import { routes } from '../../../router'

const HomeBreadcrumb: React.FC = () => {

    const location = useLocation()
    const matchs = matchRoutes(routes, location)
    console.log(matchs)
    return <>
        <Breadcrumb className={styles.homeBreadcrumb}>
            {matchs?.map(item => {
                return <Breadcrumb.Item key={item.pathnameBase}>{item.route.meta?.title}</Breadcrumb.Item>
            })}
        </Breadcrumb>
    </>
}

export default HomeBreadcrumb