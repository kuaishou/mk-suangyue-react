import { Outlet } from 'react-router-dom'
import styles from '../Home.module.scss'
import { Suspense } from 'react'
interface IProps {
    name?: string
}
const HomeMain: React.FC<IProps> = (props) => {

    return (
        <Suspense>
            <Outlet />
        </Suspense>
    )

}

export default HomeMain