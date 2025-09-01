import { pino } from 'pino';

type Logger = {
  debug: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
};

// biome-ignore lint/suspicious/noEmptyBlockStatements: <documentation requirement>
const noop = () => {};

const isDev =
  typeof window !== 'undefined' && window.location.hostname === 'localhost';

const logger: Logger = isDev
  ? pino({ browser: { asObject: true }, level: 'debug' })
  : { debug: noop, info: noop, warn: noop, error: noop };

export default logger;
