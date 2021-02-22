import { STORE, RECOVERY } from '../constont';
import { postQueryParams } from '../../types/network';
import { actionType } from '../../types/redux';
const init: postQueryParams = {
    type: 'all',
    keyword: '',
    offset: 0,
    limit: 15,
};
export default function paramReducer(
    preState: postQueryParams = init,
    { type, payload }: actionType<postQueryParams>
) {
    switch (type) {
        //保存数据
        case STORE:
            return payload;
        default:
            return preState;
    }
}
