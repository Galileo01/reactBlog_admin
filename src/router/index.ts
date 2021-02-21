import { lazy } from 'react';
import Login from '../views/Login';
const Home = lazy(() => import('../views/Home'));
const PostList = lazy(() => import('../views/PostList'));
const PostAdd = lazy(() => import('../views/PostAdd'));
//主路由
export const router = [
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/home',
        component: Home,
    },
];
//管理页面路由
export const adminRouter = [
    {
        path: '/home/postList', //'/home'
        component: PostList,
        title: '帖子列表',
        isShow:true
    },
    {
        path: '/home/postAdd',
        component: PostAdd,
        title: '添加帖子',
        isShow:true
    },
    {
        path: '/home/postEdit/:Pid',
        component: PostAdd,
        title: '编辑帖子',
        isShow:false
    },
];
