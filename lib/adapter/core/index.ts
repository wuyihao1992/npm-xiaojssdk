import {envHost, envVersion, sdkSource} from '../config';
import ApiD from '../types/api';
import EnvD from '../types/env';
import WindowD from '../types/window';
import {loadScript} from '../util/element';
import {checkAliPay, checkWeChat, checkWeChatProgram, checkXiaoApp} from '../util/tool';

class XiaoJSSDK {
    // ready状态,是否初始化完成
    private readied: boolean = false;

    // 环境变量
    private env: EnvD;

    // jssdk(公司内部jssdk api未定义)
    private jssdk: object | null;

    // JS API
    private api: ApiD;

    constructor() {
        this.env = {
            version: envVersion,
            host: '',
        };

        this.jssdk = null;

        this.api = {};

        this.init();
    }

    init() {
        this.initEnv();
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
    loadSDK(type: string) {
        let url = '';
        let jssdk = () => {};

        switch (type) {
            case 'xiao':
                if ((<WindowD>window)['xiaoJSBridge']) {
                    jssdk = (<WindowD>window)['xiaoJSBridge'];
                }

                break;
            case 'alipay':
                if ((<WindowD>window)['AlipayJSBridge'] === undefined) {
                    url = sdkSource.alipay;
                }

                jssdk = (<WindowD>window)['AlipayJSBridge'];

                break;
            case 'wx':
                if ((<WindowD>window)['wx'] === undefined) {
                    url = sdkSource.wx;
                }

                jssdk = (<WindowD>window)['wx'];

                break;
            default:
                break;
        }

        loadScript(url, () => {
            this.jssdk = jssdk;
        });
    }

    ready() {

    }

    call() {
        console.log(arguments);
        if (arguments.length <= 0) {
            throw new Error('arguments is not defined');
        }

        const response = {};

        const promise = new Promise((resolve, reject) => {

        });

        return promise;
    }
}

export default XiaoJSSDK
