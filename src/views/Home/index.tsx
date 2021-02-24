import React, { useState, Suspense, useEffect } from 'react';
import { Layout, Menu, Modal,Spin } from 'antd';
import {
    Route,
    Switch,
    Redirect,
    useHistory,
    useLocation,
} from 'react-router-dom';
import {
    UnorderedListOutlined,
    EditOutlined,
    PoweroffOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import './index.less';
import { adminRouter } from '../../router';
import { REMOVEINFO } from '../../redux/constont';
import Loading from '../../components/Loading';
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
    const token = sessionStorage.getItem('token');
    const [collapsed, setCollapsed] = useState(false); //侧边导航是否折叠

    const history = useHistory();
    const defaultKeys: string[] = history.location.pathname.includes('/postAdd')
        ? ['/home/postAdd']
        : ['/home/postList'];
    const [selectedKeys, setKeys] = useState(defaultKeys);

    function changeKeys({ key, path }: { key: string; path: string }) {
        console.log(key);

        history.push(path);
        // setKeys([key]);
    }
    function setPath(path: string) {
        history.push(path);
    }
    // console.log(selectedKeys);
    const location = useLocation();
    //监听location.pathname 变化 动态 更新菜单
    useEffect(() => {
        console.log('pathname changed', location.pathname);
        setKeys([location.pathname]);
    }, [location.pathname]);

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
        sessionStorage.clear();//清除所有 对话存储
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
                    <Suspense fallback={<Loading/>}>
                        <Switch>
                            {/* 未登录 强制重定向 到 登录页面 */}
                            {/* 渲染同时传递 函数props */}
                            {token? (
                                adminRouter.map((item) => (
                                    <Route
                                        path={item.path}
                                        render={() => (
                                            <item.component setPath={setPath} />
                                        )}
                                        key={item.path}
                                    />
                                ))
                            ) : (
                                <Redirect to="/login" />
                            )}
                            <Redirect from="/home" to="/home/postList" />
                        </Switch>
                    </Suspense>
                </Content>
            </Layout>
        </Layout>
    );
}
