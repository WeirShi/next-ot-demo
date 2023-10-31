import { INVALID_SPANID } from '@opentelemetry/api'

export const TRACE_ID_BYTES = 16

const SPAN_ID_BYTES = 8

const FALLBACK_SPANID = '0000000000000000'

/**
 * IdGenerator that generates trace IDs conforming to AWS X-Ray format.
 * https://docs.aws.amazon.com/xray/latest/devguide/xray-api-sendingdata.html#xray-api-traceids
 */
export class CustomIdGenerator {
  /**
   * Returns a random 16-byte trace ID formatted/encoded as a 32 lowercase hex
   * characters corresponding to 128 bits. The first 4 bytes correspond to the current
   * time, in seconds, as per X-Ray trace ID format.
   */
  generateTraceId() {
    return generateTraceId(generateRandomBytes)
  }

  /**
   * Returns a random 8-byte span ID formatted/encoded as a 16 lowercase hex
   * characters corresponding to 64 bits.
   */
  generateSpanId() {
    return generateSpanId(generateRandomBytes)
  }
}

const SHARED_CHAR_CODES_ARRAY = Array(TRACE_ID_BYTES * 2)

function generateRandomBytes(bytes) {
  for (let i = 0; i < bytes * 2; i++) {
    SHARED_CHAR_CODES_ARRAY[i] = Math.floor(Math.random() * 16) + 48
    // valid hex characters in the range 48-57 and 97-102
    if (SHARED_CHAR_CODES_ARRAY[i] >= 58) {
      SHARED_CHAR_CODES_ARRAY[i] += 39
    }
  }

  return String.fromCharCode.apply(
    null,
    SHARED_CHAR_CODES_ARRAY.slice(0, bytes * 2)
  )
}

export function generateTraceId(generateRandomBytes) {
  const epoch = Math.floor(Date.now() / 1000).toString(16);
  const rand = generateRandomBytes(TRACE_ID_BYTES - SPAN_ID_BYTES);
  const prefix = generateRandomBytes(3);
  return "f5" + prefix + epoch + rand;
}

export function generateSpanId(generateRandomBytes) {
  const spanId = generateRandomBytes(SPAN_ID_BYTES)
  if (spanId === INVALID_SPANID) {
    // Random was all zero. Very low chance, but in case it happens return a non-0 span ID to ensure it is valid.
    return FALLBACK_SPANID
  }
  return spanId
}
