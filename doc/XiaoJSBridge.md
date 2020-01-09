### 1. H5App 注册

#### 1.1 H5App 是否需要注册（安全考虑 ?），注册时提供`H5 AppID`及`默认webview属性`(具体属性参照pushWindow)，如: 
 
 ```
   {
      appId: String, 
      isFullScreen: Boolean,
      ...
   }
 ```
  或 

```
   {
      appId: String,
      option: {
         isFullScreen: Boolean,
         ...
      }
   }
```
 
##### 1.2 H5 AppID: XiaoH5AppID, 进行授权验证等
 
##### 1.3 用户数据打通（如果可以，实现h5免登录 ? ）

--------------------------

### 2. native方法调用和错误处理约定

#### 2.1 形式一：native方法+回调
 
  ##### &emsp; 2.1.1 一个回调方式: Function(param, callback)
  - 回调出参：result或error
 
  ##### &emsp; 2.1.2 两个回调方式: Function(param, successCallback, failureCallback)
   - 回调出参：successCallback(result)、failureCallback(error)

#### 2.2 形式二：native方法只接收一个参数param(回调等方法塞进param)

 - 调用方式: Function(param)
   
 - 这种形式native只接受一个Object类型的参数，如: {title: 'title', ...}

 - `param属性`包含：

 ```
   {
      onSuccess: Function(result),
      onError: Function(error),
      ... 其他调用参数
   }
 ```

 - js调用native方法如：

 ```
   XiaoJSBridge.getUserInfo({
      onSuccess: function(result) {},  // 成功回调
      onError: function(error) {},     // 失败回调
      onComplate: function() {},       // 成功或失败后调用(可能某些场景用到)
      onTimeout: function(error) {},   // nativeRequest场景用到
      '其他参数': '其他参数值',           // 其他API需要的参数
   });
 ```

 - *考虑这种形式参数可能会比较混乱，是否有必要将参数和回调分开，即：接收两个参数，类型均为Object，第一个Object为API所需参数，第二个为Object回调方法的Object如{onError: Function, ...}*
 
#### 2.2 无论何种形式，回调方法(如：onSuccess)出参均为Object，返回数据塞进object.data 如:

```
   {
      code: Int   // 调用结果code, app定义 ?
      msg: String // 调用信息
      data: any   // 返回数据，类型为Object/Array/String/...
   }
```
 
#### 2.3 JSSDK 可以封装两种调用形式（promise或回调形式处理结果或错误）

--------------------------

### 3. 环境变量扩展

 名称 | 说明 | 类型 | 默认值
 ----|----|----|----
 navigator.userAgent | 浏览器内核 + app宿主信息(统一规则如: XiaoApp(v1.0) 等) | string | navigator.userAgent
 XiaoJSBridge.startupParams | 当前app的启动参数(如果需要 ?) | Object | -
 
--------------------------

### 4. 事件扩展(windows)

#### 4.1 Event 格式定义

```
   {
      eventType: String 事件类型,
      ... 其他参数/数据
   }
```

或

```
   {
      eventType: String 事件类型,
      data: {
         ... 其他参数/数据
      }
   }
```

#### 4.2 扩展事件

名称 | 说明 | 出参
----|----|----
XiaoJSBridgeReady | js bridge初始化完毕时 | Event
pause | webview界面不可见时 | Event
appPause | 客户端压后台不可见时 | Event
pagePause | 窗口压栈底不可见时 | Event
resume | webview界面重新回到栈顶时 | Event
networkChange | 网络环境发生变化时 | Event

  ##### &emsp; 4.2.1 XiaoJSBridgeReady

  - 出参

    名称 | 说明 | 类型 | 默认值
    ----|----|----|----|----
    eventType | 事件类型 | String | 'XiaoJSBridgeReady'

  ##### &emsp; 4.2.2 pause

  - 出参

    名称 | 说明 | 类型 | 默认值
    ----|----|----|----|----
    eventType | 事件类型 | String | 'pause'

  ##### &emsp; 4.2.3 appPause

  - 出参

    名称 | 说明 | 类型 | 默认值
    ----|----|----|----|----
    eventType | 事件类型 | String | 'appPause'

  ##### &emsp; 4.2.4 pagePause

  - 出参

    名称 | 说明 | 类型 | 默认值
    ----|----|----|----|----
    eventType | 事件类型 | String | 'appPause'

  ##### &emsp; 4.2.5 resume

  - 出参

    名称 | 说明 | 类型 | 默认值
    ----|----|----|----|----
    eventType | 事件类型 | String | 'resume'
    data | 其他窗口/app带过来的参数 | Object | -
    resumeParams | app resume时接收到的参数 | Object | -

  ##### &emsp; 4.2.6 networkChange

  - 出参

    名称 | 说明 | 类型 | 默认值
    ----|----|----|----|----
    eventType | 事件类型 | String | 'networkChange'
    data | 网络参数 | Object | -

  - data参数详细

    名称 | 说明 | 类型 | 默认值
    ----|----|----|----|----
    isConnected | 是否已网络连接 | Boolean | false
    networkType | 网络类型：wifi/2g/3g/4g/none/unknown | String | -

--------------------------

### 5. native方法

#### 5.1 工具类
 
名称 | 说明 | 入参 | 出参
----|----|----|----
getUserInfo | 获取登录用户信息 | - | Object
getPlatformInfo | 获取系统信息 | - | Object
getNetworkType | 获取系统信息 | - | Object
getLocation | 获取当前设备所在的地理位置信息 | - | Object
getTitleAndStatusbarHeight | 获取状态栏和titlebar的高度，用于页面调整预留高度 | - | Object: {height: Int}

  ##### &emsp; 5.1.1 getUserInfo

  - 出参

    名称 | 说明 | 类型
    ----|----|----
    userId | 用户ID | String
    userName | 用户名 | String
    appToken | appToken | String
    accessToken | 用户登录token | String

  ##### &emsp; 5.1.2 getPlatformInfo

  - 出参

    名称 | 说明 | 类型
    ----|----|----
    name | 系统名称 | String
    version | 系统版本 | String
    IMEI | IMEI码 | String
    ICCID | ICCID | String
    MEID | MEID | String

  - UUID：根据IMEI、MEID等可生成UUID，用于某些推广应用的场景使用。亦可作为网络请求的公参。

  ##### &emsp; 5.1.3 getNetworkType

  - 出参

    名称 | 说明 | 类型
    ----|----|----
    networkType | 网络类型值：UNKNOWN/NOTREACHABLE/WIFI/3G/2G/4G/WWAN | String

  ##### &emsp; 5.1.4 getLocation *(是否需要提供经纬度转换API ?)*

  - 入参

    名称 | 说明 | 类型 | 必填 | 默认值
    ----|----|----|----|----
    requestType | 操作类型, (0: 只获取经纬度, 1: 获取经纬度和详细到区县级别的逆地理) | Int | N | 0
    cacheTimeout | 可接受的缓存时间，单位ms | Int | N | 30,000ms

  - 出参

    名称 | 说明 | 类型
    ----|----|----|----
    latitude | 纬度，GCJ02 标准，适用国内地图 | Double
    longitude | 经度，GCJ02 标准，适用国内地图 | Double
    accuracy | 准确度，单位m | Float
    country | 国家名称 | String
    countryCode | 国家编号 | String
    province | 省份名称 | String
    city | 城市名称 | String
    cityAdcode | 城市adcode | String
    district | 区县名称 | String
    districtAdcode | 区县adcode | String

  ##### &emsp; 5.1.5 getTitleAndStatusbarHeight

  - 出参

    名称 | 说明 | 类型
    ----|----|----|----
    height | 高度 | Int

#### 5.2 页面上下文
 
名称 | 说明 | 入参 | 出参
----|----|----|----
pushWindow | 打开一个新的页面(h5使用时打开层级不宜超过5层) | Object | -
popWindow | 关闭当前页面 | - | -
popTo | 一次回退多级页面 | - | -
 
  ##### &emsp; 5.2.1 pushWindow
  - 入参

    名称 | 说明 | 类型 | 必填 | 默认值
    ----|----|----|----|----|----
    url | 要打开的url(完整的地址) | String | Y | -
    option | 页面的部分属性设置 | Object | N | -

  - option参数详细

    名称 | 说明 | 类型 | 默认值
    ----|----|----|----|----
    isFullScreen | 是否全屏渲染页面，true: 是，false: 只在安全区域(除去statusBar与titleBar)渲染页面 | Boolean | false
    defaultTitle | 默认标题, 在页面第一次加载之前显示在标题栏 | String | -
    readTitle | 是否读取网页标题显示在titleBar上 | Boolean | true
    titleBarColor | titlebar背景色 | String ? | -
    transparentTitle | titlebar背景色透明(不能与titleBarColor同时使用)，always/auto | String | 'auto'
    scrollDistance | 在 transparentTitle auto的情况下，滑动到透明度为0 ? 的距离 | Int | 500
    pullRefresh | 是否支持下拉刷新 | Boolean | false
    allowsBounceVertical | 是否开启滑动回弹(橡皮筋)效果 | Boolean | true
    bounceTopColor | 开启滑动回弹效果时，下拉超出时，顶部间缝颜色 | String ? | -
    bounceBottomColor | 开启滑动回弹效果时，上拉超出时，底部间缝颜色 | String ? | -
    closeCurrentWindow | 打开窗口的同时，关闭当前window(如果有) | Boolean | false
    closeAllWindow | 打开窗口的同时，关闭当前App的所有window(如果有) | Boolean | false

#### 5.3 网络请求(需要JSSDK封装成promise)
 
名称 | 说明 | 入参 | 出参
----|----|----|----
nativeRequest | 原生http请求 | Object | Object

  ##### &emsp; 5.3.1 nativeRequest
  
  - 入参

    名称 | 说明 | 类型 | 必填 | 默认值
    ----|----|----|----|----|----
    type | 请求类型, POST/GET/... | String | N | 'GET'
    contentType | contentType | String | N | -
    param | 请求参数 | Object ? | N | -
    timeout | 超时时间(毫秒) | Int | N | -

#### 5.4 原生能力
 
名称 | 说明 | 入参 | 出参
----|----|----|----
scan | 调用扫码组件(扫一扫) | Object | Object
chooseImage | 拍照或从手机相册中选图 | Object | Object[]
chooseContact | 选择本地系统通信录中的一个或多个联系电话 | Object | Object[]
chooseTime | 原生选择时间组件 | Objtct | Object
beehiveOptionsPicker | 原生select组件(目前只做单个选项，不做级联关系) | Object | Object
previewImage | 预览图片 | Objtct | -

  ##### &emsp; 5.4.1 scan
  
  - 入参

    名称 | 说明 | 类型 | 必填 | 默认值
    ----|----|----|----|----
    targetType | 扫描目标类型, qr/bar | String | N | 'qr'
    actionType | 操作类型, scan/route/... | String | N | 'scan'

  - 出参

    名称 | 说明 | 类型
    ----|----|----|----
    qrCode | 扫描所得二维码数据 | String
    barCode | 扫描所得条码数据 | String

  ##### &emsp; 5.4.2 chooseImage
  
  - 入参

    名称 | 说明 | 类型 | 必填 | 默认值
    ----|----|----|----|----
    count | 最大可选照片数 | Int | N | 9
    sourceType | 相册选取或者拍照 | String[] | N | [‘camera’,’album’]

  - 出参

    名称 | 说明 | 类型
    ----|----|----|----
    fileList ? | Array | base64图片文件
    filePath | Array | 图片文件路径

  ##### &emsp; 5.4.3 chooseContact
  
  - 入参

    名称 | 说明 | 类型 | 必填 | 默认值
    ----|----|----|----|----
    type | 选择模式，多选(multi)/单选(single) | String | N | 'multi'
    multiMax | 单次最多选择联系人数（0或-1，表示无限制选择） | Int | N | -1
    multiMaxText | 用户选择数超过上限的文案 | String | N | -

  - 出参

    名称 | 说明 | 类型
    ----|----|----|----
    name | 联系人姓名 | String
    mobile | 联系人手机号 | String

  ##### &emsp; 5.4.4 chooseTime
  
  - 入参

    名称 | 说明 | 类型 | 必填 | 默认值
    ----|----|----|----|----
    title | 选择器标题 | String | N | -
    date | 默认时间(时间戳) | Int | N | -
    dateType | 时间类型，YEAR/MONTH/DAY/TIME | String | N | 'DAY'
    dateFormat | 时间格式 | String | N | 'YYYY-MM-DD'

  - 出参

    名称 | 说明 | 类型
    ----|----|----|----
    date | 选中时间(时间戳) | Int
    dateText | 选中时间格式化text | String

  ##### &emsp; 5.4.5 beehiveOptionsPicker
  
  - 入参

    名称 | 说明 | 类型 | 必填 | 默认值
    ----|----|----|----|----
    title | 选择器标题 | String | N | -
    option | 选项 | Object[] ? | Y | -
    selectedIndex | 默认选中的index | Int | N | 0
    positiveString | 确定按钮文案 | String | N | '确定'
    negativeString | 取消按钮文档 | String | N | '取消'

  - option参数详细

    名称 | 说明 | 类型 | 默认值
    ----|----|----|----|----
    label | 选项的文字 | String | -
    value | 选项的值 | any | -

  - 出参

    名称 | 说明 | 类型
    ----|----|----|----
    selectedIndex | 选中项的index | Int
    selectedOption | 选中项 | Object

  ##### &emsp; 5.4.6 previewImage
  
  - 入参

    名称 | 说明 | 类型 | 必填 | 默认值
    ----|----|----|----|----
    urls | 要预览的图片链接列表 | Array<String> | Y | -
    current | 当前显示图片索引 | Int | N | 0

#### 5.5 界面

名称 | 说明 | 入参 | 出参
----|----|----|----
setTitle | 设置页面的标题栏，包括主标题，副标题 | Object | -
setTitleColor | 设置TitleBar的颜色 | Object | -

  ##### &emsp; 5.5.1 setTitle
  
  - 入参

    名称 | 说明 | 类型 | 必填 | 默认值
    ----|----|----|----|----
    title | 主标题 | String | Y | -
    subtitle | 副标题 | String | N | -

  ##### &emsp; 5.5.1 setTitleColor
  
  - 入参

    名称 | 说明 | 类型 | 必填 | 默认值
    ----|----|----|----|----
    color | 颜色值 | String ? | Y | -
