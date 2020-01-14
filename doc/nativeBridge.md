#### 通信过程

##### eventHandler

>1. native inject function
>2. js call inject function
>3. js inject callback function
>4. native call callback function

##### Schema URL

>1. native watch URL
>2. webview iframe.src/location.href change
>3. js inject callback function
>4. native call callback function

##### 对比

名称 | Schema | eventHandler
 ----|----|----
 性能(相对) | 较差 | 较优
 注入时机 | 无需注入 | 需要注入
 调试 | 需要app debug包 | h5可模拟native注入
 跳转 | WeChat会进行拦截 | -
 
