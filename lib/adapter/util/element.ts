import ElementD from '../types/element'

/**
 * 动态插入js
 * @param url
 * @param callback
 */
export function loadScript(url: string, callback: Function) {
    if (!url) {
        return;
    }

    let script: ElementD = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    if (callback && Object.prototype.toString.call(callback) === '[object Function]') {
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState === 'loaded' || script.readyState === 'complete') {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = function () {
                callback();
            };
        }
    }

    if (document.head) {
        document.head.appendChild(script);
    } else {
        document.body.appendChild(script);
    }
}
