import { Outlet } from 'react-router-dom'
import styles from '../Home.module.scss'
import { Menu, MenuProps } from 'antd'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
interface IProps {
    name?: string
}
const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key = String(index + 1);

        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,

            children: new Array(4).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1;
                return {
                    key: subKey,
                    label: `option${subKey}`,
                };
            }),
        };
    },
);
const HomeAside: React.FC<IProps> = (props) => {

    return <>
        <Menu
            className={styles.homeAside}
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            items={items2}
        />
    </>
}

export default HomeAside