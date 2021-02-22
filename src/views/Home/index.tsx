import React, { useState, Suspense } from 'react';
import { Layout, Menu, Modal } from 'antd';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import {
    UnorderedListOutlined,
    EditOutlined,
    PoweroffOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import './index.less';
import { adminRouter } from '../../router';
import { REMOVEINFO } from '../../redux/constont';
const { Content, Sider } = Layout;
//要显示的菜单列表
const menuList = adminRouter.filter((item) => item.isShow);
//菜单图标
const menuIcons: { [key: string]: JSX.Element } = {
    '/home/postList': <UnorderedListOutlined />,
    '/home/postAdd': <EditOutlined />,
};
export default function Home() {
    const dispatch = useDispatch();

    const [collapsed, setCollapsed] = useState(false); //侧边导航是否折叠

    const history = useHistory();
    const defaultKeys: string[] = history.location.pathname.includes('/postAdd')
        ? ['/home/postAdd']
        : ['/home/postList'];
    const [selectedKeys, setKeys] = useState(defaultKeys);

    function changeKeys({ key, path }: { key: string; path: string }) {
        console.log(key);

        history.push(path);
        setKeys([key]);
    }
    // console.log(selectedKeys);

    function logOutHandler() {
        Modal.confirm({
            title: '此操作会退出系统，确认继续操作？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                console.log('OK');
                history.push('/login');
                dispatch({
                    type: REMOVEINFO,
                });
            },
        });
    }

    function mainMenuItemClick(key: React.ReactText) {
        if (typeof key === 'string') {
            if (key === 'exit') return logOutHandler();
            // console.log(key);
            changeKeys({
                key,
                path: key,
            });
        }
    }

    return (
        <Layout style={{ minHeight: '100vh' }} className="home">
            <Layout className="site-layout">
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={() => setCollapsed(!collapsed)}
                    width={150}
                >
                    <section className="home_header">
                        <div>reactBlog</div>
                        <div>管理页面</div>
                    </section>

                    <Menu
                        theme="dark"
                        mode="inline"
                        onClick={({ key }) => mainMenuItemClick(key)}
                        selectedKeys={selectedKeys}
                    >
                        {menuList.map(({ title, path }) => {
                            return (
                                <Menu.Item key={path} icon={menuIcons[path]}>
                                    {title}
                                </Menu.Item>
                            );
                        })}
                        <Menu.Item icon={<PoweroffOutlined />} key="exit">
                            退出
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content style={{ margin: '0 16px' }}>
                    <Suspense fallback={<span>data is loading</span>}>
                        <Switch>
                            {/* 渲染同时传递 函数props */}
                            {adminRouter.map((item) => (
                                <Route
                                    path={item.path}
                                    render={() => (
                                        <item.component
                                            setKeysAndPath={changeKeys}
                                        />
                                    )}
                                    key={item.path}
                                />
                            ))}
                            <Redirect from="/home" to="/home/postList" />
                        </Switch>
                    </Suspense>
                </Content>
            </Layout>
        </Layout>
    );
}
