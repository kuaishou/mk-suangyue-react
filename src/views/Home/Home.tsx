import { Outlet } from 'react-router-dom'
import styles from './Home.module.scss'
interface IProps {
    name?: string
}
const Home: React.FC<IProps> = (props) => {

    return <>
        <div>
            <h1>我是主页</h1>
            <Outlet />

        </div>
    </>
}

export default Home