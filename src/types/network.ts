import { postType } from './common';

//提交 评论项 类型
export interface submitCommentItem {
    Pid: number;
    replyCid: number | null;
    content: string;
    username: string;
}

//添加 帖子 的参数 类型
export interface submitPostItem {
    title: string;
    desc: string;
    type: postType;
    keywords: string;
    content: string;
}

//数据返回类型  泛型
export interface resData<T> {
    data: T;
    ok: number;
}
//列表泛型
export interface resListData<T> {
    data: T[];
    ok: number;
}

//postQuery 查询参数
export interface postQueryParams {
    type: postType|'all';
    keyword: string;
    offset: number;
    limit: number;
}
