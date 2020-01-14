import {uaMatch} from '../config/ua.dict.config';
import WindowD from '../types/window';

/**
 * 判断是否为晓教育app
 * @return {boolean}
 */
export function checkXiaoApp(): boolean {
    const ua = navigator.userAgent.toLowerCase();

    return uaMatch.xiao.some(value => ua.indexOf(value.toLowerCase()) > -1);
}

/**
 * 判断是否为支付宝
 * @return {boolean}
 */
export function checkAliPay(): boolean {
    const ua = navigator.userAgent.toLowerCase();

    return uaMatch.ali.some(value => ua.indexOf(value.toLowerCase()) > -1);
}

/**
 * 判断是否为微信
 * @return {boolean}
 */
export function checkWeChat(): boolean {
    const ua = navigator.userAgent.toLowerCase();

    return uaMatch.wx.some(value => ua.indexOf(value.toLowerCase()) > -1);
}

/**
 * 判断是否为微信小程序
 * @return {boolean}
 */
export function checkWeChatProgram() {
    return (<WindowD>window)['__wxjs_environment'] === 'miniprogram';
}

/**
 * 判断是否为iOS
 * @return {boolean}
 */
export function checkIOS(): boolean {
    const ua = navigator.userAgent;
    const match = ua.match(/iPhone|iPod|iPad|iOS/i);

    return !!match;
}

/**
 * 判断是否为Android
 * @return {boolean}
 */
export function checkAndroid(): boolean {
    const ua = navigator.userAgent;
    const match = ua.match(/Android|Linux/i);

    return !!match;
}

/**
 * 判断是否为Mac
 * @return {boolean}
 */
export function checkMAC(): boolean {
    const ua = navigator.userAgent;
    const match = ua.match(/Mac/i);

    return !!match;
}
