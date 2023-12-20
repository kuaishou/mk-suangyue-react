import { Button, Divider, Input, Radio, Row, Space, Table } from "antd"
import styles from "./Apply.module.scss"
import { SearchOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { ColumnsType } from "antd/es/table";
import { Infos, getApplyAction, updateApplyList } from "../../store/modules/checks";
import { RootState, useAppDispath } from "../../store";
import { useSelector } from "react-redux";

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
    const handleApplyType = (ev: any) => {
        setSpplyType(ev.target.value)
    }
    const dispatch = useAppDispath()
    const usersInfos = useSelector((state: RootState) => state.users.infos)
    const applyList = useSelector((state: RootState) => state.checks.applyList).filter((item) => item.state === applyType && (item.note as string).includes(searchWord))
    useEffect(() => {
        dispatch(getApplyAction({ applicantid: usersInfos._id as string })).then((action) => {
            const { errcode, rets } = (action.payload as { [index: string]: unknown }).data as { [index: string]: unknown }
            if (errcode === 0) {
                dispatch(updateApplyList(rets as Infos[]))
            }
        })
    }, [usersInfos, dispatch])


    return <>
        <div>
            <Row className={styles.applyTitle} justify='space-between'>
                <Button type="primary">添加审批</Button>
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
        </div>
    </>
}

export default Apply