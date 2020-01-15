/////////////////////////////
/// JSSDK 版本号
////////////////////////////

/**
 * 从package.json读取版本号
 */
const version = require('../../../package.json').version || '';

export default version
