import axios from 'axios';
const baseURL = 'http://localhost:5000';
const ins = axios.create({
    baseURL,
    timeout: 5000,
});

 export const errHandler = (err:Error) => {
    // window.$message.error('数据请求失败，请检查网络或重试');//全局输出
    console.log(err);
    return {
        data:err,
        ok:0,
    };
};

export default ins;