import log from 'loglevel';

const env = import.meta.env.MODE;

type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error';
type Logger = {
  level: LogLevel;
  message: string;
  args: unknown[];
};

const logger = (initiator = '') => {
  if (env === 'production') {
    log.setLevel('warn'); // In production, only show warnings and errors
  } else {
    log.setLevel('debug'); // In development, show all logs
  }

  const logWithInitiator = ({ level, message, args }: Logger) => {
    log.setLevel(log.getLevel()); // Reinitialize loglevel to make sure it's set correctly
    if (env === 'production' && level === 'debug') {
      return; // Skip debug logs in production
    }

    const prefix = initiator ? `[${initiator}] ` : '';
    const fullMessage = prefix + message;
    switch (level) {
      case 'trace':
        log.trace(fullMessage, ...args);
        break;
      case 'debug':
        log.debug(fullMessage, ...args);
        break;
      case 'info':
        log.info(fullMessage, ...args);
        break;
      case 'warn':
        log.warn(fullMessage, ...args);
        break;
      case 'error':
        log.error(fullMessage, ...args);
        break;
      default:
        log.debug(fullMessage, ...args);
    }
  };

  return {
    trace: (message: string, ...args: unknown[]) =>
      logWithInitiator({ level: 'trace', message, args }),
    debug: (message: string, ...args: unknown[]) =>
      logWithInitiator({ level: 'debug', message, args }),
    info: (message: string, ...args: unknown[]) =>
      logWithInitiator({ level: 'info', message, args }),
    warn: (message: string, ...args: unknown[]) =>
      logWithInitiator({ level: 'warn', message, args }),
    error: (message: string, ...args: unknown[]) =>
      logWithInitiator({ level: 'error', message, args }),
  };
};

export default logger;
