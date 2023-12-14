import { Outlet } from 'react-router-dom'
import styles from '../Home.module.scss'
interface IProps {
    name?: string
}
const HomeMain: React.FC<IProps> = (props) => {

    return <>
        <div>
            <Outlet />

        </div>
    </>
}

export default HomeMain