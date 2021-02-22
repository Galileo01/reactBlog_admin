import { GETINFO, REMOVEINFO } from '../constont';
import { userinfo, actionType } from '../../types/redux';

const init: userinfo = {
    username: '',
    Uid: 0,
};

export default function userReducer(
    preState: userinfo = init,
    { type, payload }: actionType<userinfo>
) {
    switch (type) {
        //获取用户数据 登录
        case GETINFO:
            return payload;
        // 移除数据 退出登录
        case REMOVEINFO:
            return init;
        default:
            return preState;
    }
}
