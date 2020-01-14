import {nativeConfig} from '../config';
import {checkIOS, checkAndroid} from '../util/tool';

/**
 * js调用native方法
 * native实现对web view url的观察者模式，app解析url
 * @param url 完整的url，长度限制（2k）
 */
export function webCallNativeApi(url: string) {
    const isIOS = checkIOS();
    const isAndroid = checkAndroid();

    if (isIOS) {
        (<any>window).location = url;
    } else if (isAndroid) {
        let iframe: HTMLElement|any = document.createElement('iframe');
        iframe.style.cssText = 'display: none; width: 0; height: 0;';
        iframe.src = url;

        document.body.appendChild(iframe);

        setTimeout(function () {
            iframe.remove();
            iframe = null;
        }, 500);
    }
}

/**
 * native调用js方法（使用场景较少）
 * 将一组API绑定在web view的window对象中
 * @param functionId js注入的方法ID
 */
export function appCallWebApi(functionId: string) {
    const response = {...nativeConfig.response};
    nativeConfig.injector[functionId](response);
}

/**
 * FIXME
 * 格式化完整的url
 * @param funName
 * @param callbackId
 */
export function formatSchemaUrl(funName: string, callbackId: string) {
    let url = '';
    const hash = Date.now();

    url = `${nativeConfig.schema}${funName}?callback=${callbackId}&param=&hash=${hash}`;

    return url;
}

export function findCallback() {

}

/**
 * 注册native回调方法
 * @param callbackId
 * @param callback
 */
const registerHybridCallback = function (callbackId: string, callback: Function) {
    if(!nativeConfig.injector) {
        nativeConfig.injector = {};
    }

    nativeConfig.injector[callbackId] = callback;
};

/**
 * 删除native回调方法
 * @param callbackId
 */
const unRegisterHybridCallback = function (callbackId: string) {
    if(!nativeConfig.injector) {
        return;
    }

    delete nativeConfig.injector[callbackId];
};
