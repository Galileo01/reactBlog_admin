import axios from './index';
import { postBaseInfo, postItem } from '../types/common';
import {
    submitPostItem,
    resData,
    resListData,
    postQueryParams,
} from '../types/network';
//基础信息
type basePostListRes = resListData<postBaseInfo>;
//完整信息
type postListRes = resListData<postItem>;

//添加帖子的 返回数据
type postAddRes = resData<number>;

//查询结果
interface postQueryRes {
    data: {
        postList: postItem[];
        total: number;
    };
    ok: number;
}

export function addPost(info: submitPostItem) {
    return axios.post<postAddRes>('/post/add', info);
}

export function updatePost(info: postItem) {
    return axios.post<postAddRes>('/post/update', info);
}

//条件查询
export function postQuery(params: postQueryParams) {
    return axios
        .get<postQueryRes>('/post/query', {
            params: {
                ...params,
            },
        })
        // .catch(errHandler);
}

export function getPostByPid(Pid: number) {
    return axios.get<postListRes>('/post/getByPid', {
        params: {
            Pid,
        },
    });
}

export function deletePostByPid(Pid: number) {
    return axios.post<{
        ok: number;
    }>('/post/deleteByPid', {
        Pid,
    });
}
