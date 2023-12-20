import { Button, DatePicker, Divider, Form, Input, Modal, Radio, Row, Select, Space, Table, message } from "antd"
import styles from "./Apply.module.scss"
import { SearchOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { ColumnsType } from "antd/es/table";
import { Infos, PostApply, getApplyAction, postApplyAction, updateApplyList } from "../../store/modules/checks";
import { RootState, useAppDispath } from "../../store";
import { useSelector } from "react-redux";
import locale from 'antd/es/date-picker/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs'
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const columns: ColumnsType<Infos> = [
    {
        title: '申请人',
        dataIndex: 'applicantname',
        key: 'applicantname',
        width: 100
    },
    {
        title: '审批事由',
        dataIndex: 'reason',
        key: 'reason',
    },
    {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        render(value) {
            return value.join('--')
        },
    },
    {
        title: '备注',
        dataIndex: 'note',
        key: 'note',
    },
    {
        title: '审批人',
        key: 'approvername',
        dataIndex: 'approvername',
        width: 180
    },
    {
        title: '状态',
        key: 'state',
        dataIndex: 'state',
    },
];
const applyTypeOption = [
    { label: '全部', value: '全部' },
    { label: '待审批', value: '待审批' },
    { label: '已通过', value: '已通过' },
    { label: '未通过', value: '未通过' }
]
const Apply = () => {
    const [applyType, setSpplyType] = useState('全部')
    const [searchWord, setSearchWord] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const handleApplyType = (ev: any) => {
        setSpplyType(ev.target.value)
    }
    const dispatch = useAppDispath()
    const usersInfos = useSelector((state: RootState) => state.users.infos)
    const applyList = useSelector((state: RootState) => state.checks.applyList).filter((item) => (item.state === applyType || applyType === '全部') && (item.note as string).includes(searchWord))
    useEffect(() => {
        dispatch(getApplyAction({ applicantid: usersInfos._id as string })).then((action) => {
            const { errcode, rets } = (action.payload as { [index: string]: unknown }).data as { [index: string]: unknown }
            if (errcode === 0) {
                dispatch(updateApplyList(rets as Infos[]))
            }
        })
    }, [usersInfos, dispatch])
    const showModal = () => {
        setIsModalOpen(true);

    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        handleReset()
    };
    const handleSubmit = (values: PostApply) => {
        values.time[0] = dayjs(values.time[0]).format('YYYY-MM-DD HH:mm:ss')
        values.time[1] = dayjs(values.time[1]).format('YYYY-MM-DD HH:mm:ss')
        const params = {
            ...values,
            applicantid: usersInfos._id as string,
            applicantname: usersInfos.name as string,
            approverid: Array.isArray(usersInfos.approver) && usersInfos.approver.find((item) => item.name === values.approvername)._id,
        }
        dispatch(postApplyAction(params)).then((action) => {
            const { errcode } = (action.payload as { [index: string]: unknown }).data as { [index: string]: unknown }
            if (errcode === 0) {
                message.success('提交成功')
                handleCancel()
                dispatch(getApplyAction({ applicantid: usersInfos._id as string })).then((action) => {
                    const { errcode, rets } = (action.payload as { [index: string]: unknown }).data as { [index: string]: unknown }
                    if (errcode === 0) {
                        dispatch(updateApplyList(rets as Infos[]))
                    }
                })
            }
        })
    }
    const handleReset = () => {
        form.resetFields()
    }

    return <>
        <div>
            <Row className={styles.applyTitle} justify='space-between'>
                <Button type="primary" onClick={showModal}>添加审批</Button>
                <Space>
                    <Input value={searchWord} onChange={(value) => { setSearchWord(value.target.value) }} type="text" placeholder="请输入关键词" />
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
            <Table
                rowKey='_id'
                className={styles.applyTable}
                columns={columns}
                dataSource={applyList}
                bordered
                size="small"
            // pagination={false}
            />
            <Modal title="添加审批"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={false}>
                <Form
                    className={styles.main}
                    name="basic"
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={handleSubmit}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="审批人"
                        name="approvername"
                        rules={[
                            { required: true, message: '选择审批人' },
                        ]}
                    >
                        <Select placeholder='选择审批人' allowClear>
                            {Array.isArray(usersInfos.approver) && usersInfos.approver.map((item) => <Select.Option key={item._id} value={item.name}>{item.name}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="审批事由"
                        name="reason"
                        rules={[
                            { required: true, message: '选择审批事由' },
                        ]}
                    >
                        <Select placeholder='选择审批事由' allowClear>
                            <Select.Option value="年假">年假</Select.Option>
                            <Select.Option value="事假">事假</Select.Option>
                            <Select.Option value="病假">病假</Select.Option>
                            <Select.Option value="外出">外出</Select.Option>
                            <Select.Option value="补签卡">补签卡</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="时间"
                        name="time"
                        rules={[{ required: true, message: '请选择时间' }]}
                    >
                        <RangePicker locale={locale} showTime />
                    </Form.Item>
                    <Form.Item
                        label="备注"
                        name="note"
                        rules={[{ required: true, message: '请输入备注' }]}
                    >
                        <TextArea placeholder="请输入备注" rows={4} />
                    </Form.Item>
                    <Row justify='end'>
                        <Space>
                            <Button onClick={handleReset}>重置</Button>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </Space>
                    </Row>
                </Form>
            </Modal>
        </div>
    </>
}

export default Apply