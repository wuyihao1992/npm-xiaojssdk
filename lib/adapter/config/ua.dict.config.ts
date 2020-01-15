/////////////////////////////
/// 宿主环境navigator.userAgent匹配字符串，用于环境检测
////////////////////////////

/**
 * 晓教育app
 * FIXME
 */
const UA_XIAO = ['XiaoApp'];

/**
 * alipay
 * ios/android: Mozilla/5.0......AlipayDefined(nt:WIFI,ws:320|504|2.0) AliApp(AP/9.6.0.000001) AlipayClient/9.6.0.000001 Language/zh-Hans ProductType/dev
 */
const UA_ALI = ['AliApp', 'AlipayClient', 'AlipayDefined'];

/**
 * WeChat
 * pc: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) wxwork/2.4.991 (MicroMessenger/6.2) WeChat/2.0.4
 * ios: Mozilla/5.0 (Linux; Android 6.0; 1503-M02 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/37.0.0.0 Mobile MQQBrowser/6.2 TBS/036558 Safari/537.36 MicroMessenger/6.3.25.861 NetType/WIFI Language/zh_CN
 * android: Mozilla/5.0 (Linux; Android 9.0; BKL-AL20 Build/HUAWEIBKL-AL20; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044409 Mobile Safari/537.36 wxwork/2.7.2 MicroMessenger/6.3.22 NetType/WIFI Language/zh
 */
const UA_WX = ['MicroMessenger'];

export const uaMatch = {
    xiao: UA_XIAO,
    ali: UA_ALI,
    wx: UA_WX,
};
