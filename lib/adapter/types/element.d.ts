/**
 * 自定义dom元素
 */
interface ElementD extends HTMLElement {
    [key: string]: any;
    type?: string;
    src?: string;
}

export default ElementD
