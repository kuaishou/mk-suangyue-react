import { Button, Card, Col, Empty, Row, Select, Space, Timeline } from "antd"
import styles from './Exception.module.scss'
import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import TimelineItem from "antd/es/timeline/TimelineItem"
import { RootState, useAppDispath } from "../../store"
import { useSelector } from "react-redux"
import { Infos, getTimeAction, updateInfos } from "../../store/modules/signs"
import { toZero } from "../../utils/common"
import { getApplyAction, updateApplyList } from "../../store/modules/checks"

const date = new Date()
const year = date.getFullYear()
const Exception = () => {

    const dispatch = useAppDispath()
    const [searchParams, setSearchParams] = useSearchParams()
    const usersInfos = useSelector((state: RootState) => state.users.infos)
    const signsInfos = useSelector((state: RootState) => state.signs.infos)
    const applyList = useSelector((state: RootState) => state.checks.applyList)
    const [month, setMonth] = useState(searchParams.get('month') ? (Number(searchParams.get('month')) - 1) : date.getMonth())
    const monthOption = []
    for (let i = 0; i < 12; i++) {
        monthOption.push(<Select.Option key={i} value={i}>{i + 1}月 </Select.Option>)
    }
    let detail;
    if (signsInfos.detail) {
        const monthDetail = signsInfos.detail && (signsInfos.detail as { [index: string]: unknown })[toZero(month + 1)] as { [index: string]: string }
        detail = Object.entries(monthDetail).filter((v) => v[1] !== '正常出勤').sort()
    }
    const contentRender = (values: string) => {
        const res = ((signsInfos.time as { [index: string]: unknown })[toZero(month + 1)] as { [index: string]: unknown })[values]
        if (Array.isArray(res)) {
            return res.join(' - ')
        } else {
            return "暂无打卡记录"
        }
    }
    const applyListMonth = applyList.filter((item) => {
        const startTime = (item.time as string[])[0].split(' ')[0].split('-')
        const enttTime = (item.time as string[])[1].split(' ')[0].split('-')
        return startTime[1] <= toZero(month + 1) && enttTime[1] >= toZero(month + 1)
    })
    useEffect(() => {
        dispatch(getTimeAction({ userid: usersInfos._id as string })).then((action) => {
            const { errcode, infos } = (action.payload as { [index: string]: unknown }).data as { [index: string]: unknown }
            if (errcode === 0) {
                console.log(infos)

                dispatch(updateInfos(infos as Infos))
            }
        })
        dispatch(getApplyAction({ applicantid: usersInfos._id as string })).then((action) => {
            const { errcode, rets } = (action.payload as { [index: string]: unknown }).data as { [index: string]: unknown }
            if (errcode === 0) {
                dispatch(updateApplyList(rets as Infos[]))
            }
        })
    }, [usersInfos, dispatch])
    return <>
        <div className={styles.exception}>
            <Row justify='space-between' align='middle'>
                <Link to='/Apply'>
                    <Button type="primary">异常处理</Button>
                </Link>

                <Space>
                    <Button>{year}</Button>
                    <Select value={month} onChange={(newMonth) => {
                        setMonth(newMonth)
                        setSearchParams({ month: newMonth + 1 + '' })
                    }}>{monthOption}</Select>
                </Space>
            </Row>
            <Row className={styles.exceptionLine} gutter={20}>
                <Col span='12'>
                    {detail
                        ?
                        <Timeline>
                            {detail.map((item) => {
                                return <Timeline.Item key={item[0]}>
                                    <h3>{year}/{month + 1}/{item[0]}</h3>
                                    <Card className={styles.itemCard}>
                                        <Space>
                                            <h4>{item[1]}</h4>
                                            <p>考勤详情：{contentRender(item[0])}</p>
                                        </Space>
                                    </Card>
                                </Timeline.Item>
                            })}

                        </Timeline>
                        : <Empty description='暂无考勤记录' imageStyle={{ height: 200 }} />
                    }
                </Col>
                <Col span='12'>
                    {applyListMonth.length > 0 ?
                        <Timeline>
                            {applyListMonth.map((item) => {
                                return <Timeline.Item key={item._id as string}>
                                    <h3>{item.reason as string}</h3>
                                    <Card className={styles.itemCard}>
                                        <h4>{item.state as string}</h4>
                                        <p className={styles.itemContent}>申请日期 : {(item.time as string[]).join('-')}</p>
                                        <p className={styles.itemContent}>申请详情 : {item.note as string}</p>
                                    </Card>
                                </Timeline.Item>
                            })}

                        </Timeline>
                        : <Empty description='暂无申请审批' imageStyle={{ height: 200 }} />

                    }

                </Col>
            </Row>
        </div>
    </>
}

export default Exception