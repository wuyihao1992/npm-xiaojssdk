/**
 * ********************
 * 与native相关的约定
 * ********************
 */

/**
 * native拦截webview的schema url协议
 * 格式为：hybridschema://hybridapi?callback=callback_id&param=
 * 如：xiao://getUser?callback=callbackId&param=&hash=
 */
const schema = 'xiao://';

/**
 * js方法注入路径，供js或native调用
 * 调用方式为：
 * injector['callbackId'](response)
 * 或 window[injectorName]['callbackId'](response)
 */
const injectorName = 'hybridCallbackApi';
const injector = window[injectorName];

/**
 * native调用后的返回结果
 * @param code 状态码
 * @param msg 调用信息
 * @param data 返回结果
 */
const response = {
    code: '',
    msg: '',
    data: null,
};

export default {
    schema,
    injector,
    response,
}
