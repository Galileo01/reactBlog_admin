import React from 'react';
import {
    Row,
    Col,
    Button,
    Input,
    Card,
    Select,
    Table,
    message,
    Popconfirm,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import './index.less';
import { postType, postItem, pageBaseProps } from '../../types/common';
import usePostQuery from './usePostQuery';
import { deletePostByPid } from '../../network/post';

const PostList: React.FC<pageBaseProps> = ({ setKeysAndPath }) => {
    const { params, setParams, postList, total, _postQuery } = usePostQuery();
    async function _deletePostByPid(Pid: number) {
        const {
            data: { ok },
        } = await deletePostByPid(Pid);
        if (ok) {
            message.success('帖子删除成功');
            _postQuery();
        } else message.error('帖子删除失败');
    }
    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
        },
        {
            title: '关键词',
            dataIndex: 'keywords',
        },
        {
            title: '类别',
            dataIndex: 'type',
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
        },
        {
            title: '操作',
            key: 'oprate',
            render(post: postItem) {
                return (
                    <div className="btns">
                        <Button
                            icon={<EditOutlined />}
                            type="primary"
                            onClick={() => {
                                setKeysAndPath({
                                    key: '/home/postEdit',
                                    path: '/home/postEdit/' + post.Pid,
                                });
                            }}
                        />
                        <Popconfirm
                            title="此操作将删除该帖子，确认继续？"
                            okText="确认"
                            cancelText="取消"
                            onConfirm={() => _deletePostByPid(post.Pid)}
                            placement="left"
                        >
                            <Button icon={<DeleteOutlined />} danger />
                        </Popconfirm>
                    </div>
                );
            },
        },
    ];

    return (
        <Card className="post_list">
            <Row>
                <Col span={12}>
                    <Input.Search
                        placeholder="输入关键词进行模糊搜索：帖子标题、描述"
                        enterButton
                        onSearch={(value) => {
                            setParams({
                                ...params,
                                keyword: value,
                            });
                        }}
                        allowClear
                    />
                </Col>
                <Col span={3}>
                    <Select
                        value={params.type}
                        onChange={(value) =>
                            setParams({
                                ...params,
                                type: value,
                            })
                        }
                    >
                        <Select.Option value="all">不限</Select.Option>
                        <Select.Option value={postType.ARTICLE}>
                            文章
                        </Select.Option>
                        <Select.Option value={postType.NOTE}>
                            笔记
                        </Select.Option>
                        <Select.Option value={postType.OTHER}>
                            其他
                        </Select.Option>
                    </Select>
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={postList}
                bordered
                className="post_table"
                size="middle"
                pagination={{
                    total,
                    current: params.offset + 1,
                    pageSize: 15,
                }}
                rowKey="Pid"
                onChange={(pagination) => {
                    setParams({
                        ...params,
                        offset: (pagination?.current as number) - 1,
                    });
                }}
            />
        </Card>
    );
};

export default PostList;
