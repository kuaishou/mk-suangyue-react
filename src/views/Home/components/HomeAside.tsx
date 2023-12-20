import { Link, matchRoutes, useLocation } from 'react-router-dom'
import styles from '../Home.module.scss'
import { Menu, MenuProps } from 'antd'
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { routes } from '../../../router';
import _ from 'lodash';

const HomeAside: React.FC = () => {

    const location = useLocation()
    const matchs = matchRoutes(routes, location)
    const subPath = matchs![0].pathnameBase || ''
    const path = matchs![1].pathnameBase || ''

    const permission = useSelector((state: RootState) => state.users.infos.permission) as unknown[]
    const menus = _.cloneDeep(routes).filter((v) => {
        v.children = v?.children?.filter((v1) => v1.meta?.menu && permission?.includes(v1.name))
        return v.meta?.menu && permission?.includes(v.name)
    })
    const items: MenuProps['items'] = menus.map((v1) => {
        const children = v1.children?.map(v2 => {
            return {
                key: v1.path! + v2.path!,
                label: <Link to={v1.path! + v2.path!}>{v2.meta?.title}</Link>,
                icon: v2.meta?.icon
            }
        })

        return {
            key: v1.path!,
            label: v1.meta?.title,
            icon: v1.meta?.icon,
            children: children
        }
    })

    return <>
        <Menu
            className={styles.homeAside}
            mode="inline"
            selectedKeys={[path]}
            openKeys={[subPath]}
            items={items}
        />
    </>
}

export default HomeAside