// 获取一个时间： 显示 早上 | 上午 | 下午 | 晚上
export const getTimeText = () => {
    const hours = new Date().getHours()

    if (hours <= 9) {
        return '早上'
    }

    if (hours <= 12) {
        return '上午'
    }

    if (hours <= 18) {
        return '下午'
    }

    return '晚上'
}
