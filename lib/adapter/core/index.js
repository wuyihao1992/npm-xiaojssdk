import {envHost, envVersion, sdkSource} from '../config';
import {loadScript} from '../util/element';
import {checkAliPay, checkWeChat, checkWeChatProgram, checkXiaoApp} from '../util/tool';
import {default as defaultFunction} from './function';

class JSSDK {
    // 环境变量
    env = {
        version: envVersion,
        host: '',
    };

    // 保存jssdk，公司内部jssdk api未定义
    jssdk = null;

    // function
    option = {};

    constructor() {
        this.init();
    }

    init() {
        this.initOption();
        this.initEnv();
    }

    /**
     * 初始化默认方法
     */
    initOption() {
        this.option = {...defaultFunction};
    }

    /**
     * 环境检测
     */
    initEnv() {
        let host = envHost.browser;
        const isXiaoApp = checkXiaoApp();
        const isAliPay = checkAliPay();
        const isWeChat = checkWeChat();

        if (isXiaoApp) {
            host = envHost.xiaoApp;
            this.loadSDK('xiao');
        } else if (isAliPay) {
            host = envHost.aliPay;
            this.loadSDK('alipay');
        } else if (isWeChat) {
            const isWeChatProgram = checkWeChatProgram();

            if (isWeChatProgram) {
                host = envHost.weChatProgram;
            } else {
                host = envHost.weChat;
            }

            this.loadSDK('wx');
        }

        this.env.host = host;
    }

    /**
     * 加载第三方sdk,防止重复加载
     */
    loadSDK(type) {
        let url = '';
        let jssdk = () => {};

        switch (type) {
            case 'xiao':
                if (xiaoJSBridge) {
                    jssdk = xiaoJSBridge;
                }

                break;
            case 'alipay':
                if (AlipayJSBridge === undefined) {
                    url = sdkSource.alipay;
                }

                jssdk = AlipayJSBridge;

                break;
            case 'wx':
                if (wx === undefined) {
                    url = sdkSource.wx;
                }

                jssdk = wx;

                break;
            default:
                break;
        }

        loadScript(url, () => {
            this.jssdk = jssdk;
        });
    }

    connectBridge() {

    }
}

JSSDK.prototype.call = function () {
    console.log(arguments);
    // return new Promise()
};

const xiaoJSSDK = new JSSDK();

export default xiaoJSSDK
