import { Button, Calendar, Descriptions, DescriptionsProps, Row, Select, Space, Tag, message } from "antd"
import styles from './Sign.module.scss'
import locale from 'antd/es/date-picker/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispath } from "../../store";
import { Infos, getTimeAction, putTimeAction, updateInfos } from "../../store/modules/signs";
import { Dayjs } from "dayjs";
import { toZero } from "../../utils/common";
const date = new Date()


const Sign: React.FC = () => {
    const dispatch = useAppDispath()
    const usersInfos = useSelector((state: RootState) => state.users.infos)
    const signsInfos = useSelector((state: RootState) => state.signs.infos)
    const [month, setMonth] = useState(date.getMonth())
    const navigate = useNavigate()
    const hangDetal = () => {
        navigate(`/exception?month=${month + 1}`)
    }
    const initdetailState = {
        type: 'success' as 'success' | 'error',
        text: '正常' as '正常' | '异常'
    }
    const initdetailValue = {
        normal: 0,
        absent: 0,
        miss: 0,
        late: 0,
        early: 0,
        lateAndEarly: 0,
    }
    const [detailValue, setDetailValue] = useState({ ...initdetailValue })
    const [detailState, setDetailState] = useState({ ...initdetailState })

    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: '月份',
            children: <div>{month + 1}月</div>,
        },
        {
            key: 'normal',
            label: '正常出勤',
            children: detailValue.normal,
        },
        {
            key: 'absent',
            label: '旷工',
            children: detailValue.absent,
        },
        {
            key: 'miss',
            label: '漏打卡',
            children: detailValue.miss,
        },
        {
            key: 'late',
            label: '迟到',
            children: detailValue.late,
        },
        {
            key: 'early',
            label: '早退',
            children: detailValue.early,
        },
        {
            key: 'lateAndEarly',
            label: '迟到并早退',
            children: detailValue.lateAndEarly,
        },
        {
            key: '8',
            label: '操作',
            children: <Button onClick={hangDetal} type="primary" ghost size="small">查看详情</Button>,
        },
        {
            key: '9',
            label: '考勤状态',
            children: <Tag color={detailState.type}>{detailState.text}</Tag>,
        },
    ];
    const cellRender = (value: Dayjs) => {
        const month = signsInfos.time && (signsInfos.time as { [index: string]: unknown })[toZero(value.month() + 1)]
        const date = month && (month as { [index: string]: unknown })[toZero(value.date())]
        let res = ''
        if (Array.isArray(date)) {
            res = date.join(' - ')
        }
        return <div className={styles.showTime}>{res}</div>
    }
    const handSign = () => {
        dispatch(putTimeAction({ userid: usersInfos._id as string })).then((action) => {
            const { errcode, infos } = (action.payload as { [index: string]: unknown }).data as { [index: string]: unknown }
            if (errcode === 0) {
                dispatch(updateInfos(infos as Infos))
                message.success('签到成功')
            }
        })
    }
    useEffect(() => {
        if (signsInfos.detail) {
            const detailMonth = signsInfos.detail && (signsInfos.detail as { [index: string]: unknown })[toZero(month + 1)] as { [index: string]: unknown }
            console.log('toZero(value.month()', detailMonth)
            for (let attr in detailMonth) {
                switch (detailMonth[attr]) {
                    case '正常出勤':
                        initdetailValue.normal++
                        break;
                    case '旷工':
                        initdetailValue.absent++
                        break;
                    case '漏打卡':
                        initdetailValue.miss++
                        break;
                    case '迟到':
                        initdetailValue.late++
                        break;
                    case '早退':
                        initdetailValue.early++
                        break;
                    case '迟到并早退':
                        initdetailValue.lateAndEarly++
                        break;
                }
            }
            setDetailValue({ ...initdetailValue })

            for (let attr in initdetailValue) {
                if (attr !== 'normal' && initdetailValue[attr as keyof typeof initdetailValue] !== 0) {
                    setDetailState({
                        type: 'error',
                        text: '异常'
                    })
                }


            }
        }

        return () => {
            setDetailState({
                type: 'success',
                text: '正常'
            })
            for (let attr in initdetailValue) {

                initdetailValue[attr as keyof typeof initdetailValue] = 0
            }
        }

    }, [signsInfos, month])
    useEffect(() => {

        dispatch(getTimeAction({ userid: usersInfos._id as string })).then((action) => {
            const { errcode, infos } = (action.payload as { [index: string]: unknown }).data as { [index: string]: unknown }
            if (errcode === 0) {
                dispatch(updateInfos(infos as Infos))
            }
        })
    }, [usersInfos, dispatch])
    return <>
        <div>
            <Descriptions className={styles.descriptions} column={9} bordered layout="vertical" items={items} />
            <Calendar
                locale={locale}
                cellRender={cellRender}
                headerRender={({ value, type, onChange, onTypeChange }) => {
                    const monthOption = []
                    for (let i = 0; i < 12; i++) {
                        monthOption.push(<Select.Option key={i} value={i}>{i + 1}月 </Select.Option>)
                    }
                    return (
                        <Row className={styles.calendarHeader} justify='space-between' align='middle'>
                            <Button type="primary" onClick={handSign}>在线签到</Button>
                            <Space>
                                <Button>{value.year()}</Button>
                                <Select value={month} onChange={(newMonth) => {
                                    setMonth(newMonth)
                                    onChange(value.clone().month(newMonth))//控制日历月份变化
                                }}>{monthOption}</Select>
                            </Space>

                        </Row>
                    )
                }}
            ></Calendar>
        </div>
    </>
}

export default Sign