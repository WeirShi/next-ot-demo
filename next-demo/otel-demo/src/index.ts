import OtelDemo from "./core/opentelemetry";
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  window.OtelDemo = window.OtelDemo || new OtelDemo({})
}
