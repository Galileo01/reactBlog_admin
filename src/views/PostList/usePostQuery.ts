import { useEffect, useState } from 'react';
import { message } from 'antd';
import { postItem } from '../../types/common';
import { postQueryParams } from '../../types/network';
import { postQuery } from '../../network/post';
export default function usePostQuery() {
    const [postList, setList] = useState<postItem[]>([]);
    const [params, setParams] = useState<postQueryParams>({
        type: 'all',
        keyword: '',
        offset: 0,
        limit: 15,
    });
    const [total, setTotal] = useState(0);
    const [isFirst, setValue] = useState(true);
    async function _postQuery() {
        // console.log(params);

        const {
            data: {
                data: { postList, total },
                ok,
            },
        } = await postQuery(params);
        if (!ok) return message.error('数据请求失败');
        // console.log(isFirst);
        if (postList.length === 0)
            return message.info('没有符合条件的数据，换个关键词吧');
        else if (!isFirst) message.success('数据请求成功');
        setList(postList);
        setTotal(total);
        setValue(false);
    }
    //params 参数变化重新  请求
    useEffect(() => {
        _postQuery();
    }, [params]);

    return {
        params,
        setParams,
        postList,
        total,
        _postQuery
    };
}
