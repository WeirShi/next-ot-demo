import { WebTracerProvider } from '@opentelemetry/sdk-trace-web'
import { Resource } from '@opentelemetry/resources'
import { ZoneContextManager } from '@opentelemetry/context-zone'
import { CustomIdGenerator } from './generator'
import { version } from '../../package.json'
class DuOtel {
  constructor(config) {
    this.init();
  }
  async init() {
    // 初始化trace
    const provider = new WebTracerProvider({
      idGenerator: new CustomIdGenerator(),
      resource: new Resource({
        sdkVersion: version,
        timeOrigin: performance.timeOrigin,
      }),
    })
    provider.register({
      // contextManager: new ZoneContextManager(),
    })
  }
}

export default DuOtel;
