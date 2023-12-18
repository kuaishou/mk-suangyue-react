import { Button, Calendar, Descriptions, DescriptionsProps, Row, Select, Space, Tag } from "antd"
import styles from './Sign.module.scss'
import locale from 'antd/es/date-picker/locale/zh_CN';

import 'dayjs/locale/zh-cn';
import { useState } from "react"
import { useNavigate } from "react-router-dom";
const date = new Date()


const Home: React.FC = () => {

    const [month, setMonth] = useState(date.getMonth())
    const navigate = useNavigate()
    const hangDetal = () => {
        navigate('/exception')
    }
    const detailState = {
        type: 'success' as 'success' | 'error',
        text: '正常' as '正常' | '异常'
    }
    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: '月份',
            children: <div>{month + 1}月</div>,
        },
        {
            key: 'normal',
            label: '正常出勤',
            children: 0,
        },
        {
            key: 'absent',
            label: '旷工',
            children: 0,
        },
        {
            key: 'miss',
            label: '漏打卡',
            children: 0,
        },
        {
            key: 'late',
            label: '迟到',
            children: 0,
        },
        {
            key: 'early',
            label: '早退',
            children: 0,
        },
        {
            key: 'lateAndEarly',
            label: '迟到并早退',
            children: 0,
        },
        {
            key: '8',
            label: '操作',
            children: <Button onClick={hangDetal} type="primary" ghost size="small">查看详情</Button>,
        },
        {
            key: '9',
            label: '考勤状态',
            children: <Tag color={detailState.text}>{detailState.type}</Tag>,
        },
    ];
    return <>
        <div>
            <Descriptions className={styles.descriptions} column={9} bordered layout="vertical" items={items} />
            <Calendar
                locale={locale}
                headerRender={({ value, type, onChange, onTypeChange }) => {
                    const monthOption = []
                    for (let i = 0; i < 12; i++) {
                        monthOption.push(<Select.Option key={i} value={i}>{i + 1}月 </Select.Option>)
                    }
                    return (
                        <Row className={styles.calendarHeader} justify='space-between' align='middle'>
                            <Button type="primary">在线签到</Button>
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

export default Home