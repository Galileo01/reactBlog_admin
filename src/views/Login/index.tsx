import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import md5 from 'blueimp-md5';
import { GETINFO } from '../../redux/constont';
import { login } from '../../network/user';
import './index.less';

export default function Login() {
    const dispatch = useDispatch();
    const [form] = Form.useForm<{ username: string; password: string }>();
    const history = useHistory();
    function finishHandler() {
        form.validateFields()
            .then(async ({ password, username }) => {
                const {
                    data: { ok, data },
                } = await login({ username, password: md5(password) });

                if (!ok) return message.error(data);
                //保存到store
                dispatch({
                    type: GETINFO,
                    payload: {
                        username,
                        Uid: data,
                    },
                });                
                message.success('登录成功');
                history.push('/admin'); //进入管理页面
            })
            .catch((err) => {
                console.log(err);
                message.error('出错了');
            });
    }
    return (
        <Card className="login_wapper" title="reactBlog系统管理界面" bordered>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={finishHandler}
                form={form}
            >
                <Form.Item
                    name="username"
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Username"
                        allowClear
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                >
                    <Input
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                        allowClear
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}
