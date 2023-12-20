import { Button, Divider, Input, Radio, Row, Space, Table, message } from "antd"
import styles from "./Check.module.scss"
import { CheckOutlined, CloseOutlined, SearchOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { ColumnsType } from "antd/es/table";
import { Infos, getApplyAction, putApplyAction, updateCheckList } from "../../store/modules/checks";
import { RootState, useAppDispath } from "../../store";
import { useSelector } from "react-redux";
import { Info, getRemindAction, putRemindAction, updateNewsInfos } from "../../store/modules/news";

const applyTypeOption = [
    { label: '全部', value: '全部' },
    { label: '待审批', value: '待审批' },
    { label: '已通过', value: '已通过' },
    { label: '未通过', value: '未通过' }
]
const Check = () => {
    const [applyType, setSpplyType] = useState('全部')
    const [searchWord, setSearchWord] = useState('')
    const handleApplyType = (ev: any) => {
        setSpplyType(ev.target.value)
    }
    const dispatch = useAppDispath()
    const usersInfos = useSelector((state: RootState) => state.users.infos)
    const checkList = useSelector((state: RootState) => state.checks.checkList).filter((item) => (item.state === applyType || applyType === '全部') && (item.note as string).includes(searchWord))
    console.log('checkList', checkList)
    useEffect(() => {
        dispatch(getApplyAction({ approverid: usersInfos._id as string })).then((action) => {
            const { errcode, rets } = (action.payload as { [index: string]: unknown }).data as { [index: string]: unknown }
            if (errcode === 0) {
                dispatch(updateCheckList(rets as Infos[]))
            }
        })
    }, [usersInfos, dispatch])
    const handlePutApply = (_id: string, state: "已通过" | "未通过", applicantid: string) => {
        dispatch(putApplyAction({ _id, state })).then((action) => {
            const { errcode } = (action.payload as { [index: string]: unknown }).data as { [index: string]: unknown }
            if (errcode === 0) {
                message.success('操作成功')
                dispatch(getApplyAction({ approverid: usersInfos._id as string })).then((action) => {
                    const { errcode, rets } = (action.payload as { [index: string]: unknown }).data as { [index: string]: unknown }
                    if (errcode === 0) {
                        dispatch(updateCheckList(rets as Infos[]))
                    }
                })
                dispatch(putRemindAction({ userid: applicantid, applicant: true }))
            }
        })
    }
    const _id = useSelector((state: RootState) => state.users.infos._id) as string
    const newsInfo = useSelector((state: RootState) => state.news.info)
    useEffect(() => {
        if (newsInfo.approver) {
            dispatch(putRemindAction({ userid: _id, approver: false })).then((action) => {
                const { errcode, info } = (action.payload as { [index: string]: unknown }).data as { [index: string]: unknown }
                if (errcode === 0) {
                    dispatch(updateNewsInfos(info as Info))
                }
            })
        }

    }, [_id, newsInfo, dispatch])

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
            title: '操作',
            dataIndex: 'action',
            render(value, record) {
                return (
                    <Space>
                        <Button type="primary" shape="circle" size='small' icon={<CheckOutlined />}
                            style={{ backgroundColor: '#67c23a', border: '1px #67c23a solid' }}
                            onClick={() => handlePutApply(record._id as string, '已通过', record.applicantid as string)} />
                        <Button type="primary" shape="circle" size='small' icon={<CloseOutlined />}
                            onClick={() => handlePutApply(record._id as string, '未通过', record.applicantid as string)} />
                    </Space>
                )

            }
        },
        {
            title: '状态',
            key: 'state',
            dataIndex: 'state',
        },
    ];
    return <>
        <div>
            <Row className={styles.applyTitle} justify='end'>
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
                dataSource={checkList}
                bordered
                size="small"
            // pagination={false}
            />
        </div>
    </>
}

export default Check