//帖子类型 枚举
export enum postType {
    ARTICLE,
    NOTE,
    OTHER,
}

export interface postBaseInfo {
    title: string;
    desc: string;
    type: postType;
    Pid: number;
    keywords: string;
    updateTime: string;
}
export interface postItem extends postBaseInfo {
    content: string;
}

//搜索结果项
export interface suggestItem {
    title: string;
    Pid: number;
}

export interface CommentItem {
    Cid: number;
    Pid: number;
    replyCid: number;
    content: string;
    username: string;
    commentTime: string;
}

//input Ref引用
export type inputRef =
    | HTMLInputElement
    | undefined
    | HTMLTextAreaElement
    | null;

//页面组件 基础 props
export interface pageBaseProps {
    setPath: (key: string) => void;
}


//postADdd页面 帖子操作类型
