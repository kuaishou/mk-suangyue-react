import React from 'react';
import { Layout, theme } from 'antd';
import HomeHeader from './components/HomeHeader';
import HomeAside from './components/HomeAside';
import HomeBreadcrumb from './components/HomeBreadcrumb';
import styles from './Home.module.scss'
import HomeMain from './components/HomeMain';

const { Header, Content, Sider } = Layout;

const Home: React.FC = () => {


    return (
        <Layout>
            <Header>
                <HomeHeader></HomeHeader>
            </Header>
            <Layout>
                <Sider width={300} theme='light'>
                    <HomeAside></HomeAside>
                </Sider>
                <Layout style={{ padding: '20px' }}>
                    <HomeBreadcrumb></HomeBreadcrumb>
                    <Content
                        className={styles.homeMain}
                    >
                        <HomeMain></HomeMain>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default Home;
