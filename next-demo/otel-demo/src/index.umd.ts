import OtelDemo from "./core/opentelemetry";
let instance = null;
let init = () => { };
// qiankun子应用无需初始化
if (window.__POWERED_BY_QIANKUN__) {
  console.info('OtelDemo initialization in sub-application is not supported')
} else {
  init = (params = {}) => {
    if (instance) return instance
    instance = new OtelDemo(params)
    return instance
  }
}
export { init }
export default OtelDemo
