/**
 * ********************
 * 与native相关的约定
 * ********************
 */

/**
 * URL Schema方案中native拦截webview的url协议
 * @type hybridschema://hybridapi?callback=callback_id&param=
 * @usage xiao://getUser?callback=callbackId&param=&hash=
 */
const schema = 'xiao://';

/**
 * js方法注入路径，供js或native调用
 * @usage:
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

/**
 * 成功状态码
 */
const success_code = 0;
/**
 * 失败状态码
 */
const error_code = 1;

export default {
    schema,
    injector,
    response,
}
