import { Button, Calendar, Descriptions, DescriptionsProps, Row, Select, Space, Tag } from "antd"
import styles from './Sign.module.scss'
import locale from 'antd/es/date-picker/locale/zh_CN';

import 'dayjs/locale/zh-cn';
import { useState } from "react"
const date = new Date()


const Home: React.FC = () => {

    const [month, setMonth] = useState(date.getMonth())
    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: '月份',
            children: <div>{month + 1}月</div>,
        },
        {
            key: '2',
            label: '正常出勤',
            children: 0,
        },
        {
            key: '3',
            label: '正常出勤',
            children: 0,
        },
        {
            key: '4',
            label: '正常出勤',
            children: 0,
        },
        {
            key: '5',
            label: '正常出勤',
            children: 0,
        },
        {
            key: '6',
            label: '正常出勤',
            children: 0,
        },
        {
            key: '7',
            label: '正常出勤',
            children: 0,
        },
        {
            key: '8',
            label: '操作',
            children: <Button type="primary" ghost size="small">查看详情</Button>,
        },
        {
            key: '9',
            label: '考勤状态',
            children: <Tag color="success">正常</Tag>,
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
                                <Select value={month} onChange={(value)=>setMonth(value)}>{monthOption}</Select>
                            </Space>

                        </Row>
                    )
                }}
            ></Calendar>
        </div>
    </>
}

export default Home