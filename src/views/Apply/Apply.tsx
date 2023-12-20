import { Button, Divider, Input, Radio, Row, Space, Table } from "antd"
import styles from "./Apply.module.scss"
import { SearchOutlined } from "@ant-design/icons"
import { SetStateAction, useState } from "react"
import { ColumnsType } from "antd/es/table";
interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string;
  }
const applyTypeOption = [
    { label: '全部', value: '全部' },
    { label: '待审批', value: '待审批' },
    { label: '已通过', value: '已通过' },
    { label: '未通过', value: '未通过' }
]
const Apply = () => {
    const [applyType, setSpplyType] = useState('全部')
    const handleApplyType = (ev: any) => {
        setSpplyType(ev.target.value)
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];
    const data: DataType[] = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: 'developer',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: 'loser',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: 'teacher',
        },
    ];

    return <>
        <div>
            <Row className={styles.applyTitle} justify='space-between'>
                <Button type="primary">添加审批</Button>
                <Space>
                    <Input type="text" placeholder="请输入关键词" />
                    <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
                    <Divider style={{ color: '#000' }} type="vertical" />
                    <Radio.Group
                        options={applyTypeOption}
                        onChange={handleApplyType}
                        value={applyType}
                        optionType="button"
                        buttonStyle="solid"

                    />
                </Space>
            </Row>
            <Table className={styles.applyTable} columns={columns} dataSource={data} />
        </div>
    </>
}

export default Apply