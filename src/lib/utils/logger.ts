/**
 * Logger Utility
 * Centralized logging that respects environment settings
 * In production, sensitive console.log statements are suppressed
 */

const isProduction = import.meta.env.PROD;
const isDevelopment = import.meta.env.DEV;

/**
 * Log levels
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

/**
 * Logger configuration
 */
interface LoggerConfig {
  enabledInProduction: boolean;
  minLevel: LogLevel;
}

const defaultConfig: LoggerConfig = {
  enabledInProduction: false,
  minLevel: LogLevel.INFO,
};

/**
 * Logger class for controlled logging
 */
class Logger {
  private config: LoggerConfig;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  private shouldLog(level: LogLevel): boolean {
    // Always log errors and warnings
    if (level === LogLevel.ERROR || level === LogLevel.WARN) {
      return true;
    }

    // In development, log everything
    if (isDevelopment) {
      return true;
    }

    // In production, respect config
    return this.config.enabledInProduction;
  }

  debug(message: string, ...args: any[]): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.log(`[INFO] ${message}`, ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  error(message: string, ...args: any[]): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(`[ERROR] ${message}`, ...args);
    }
  }

  /**
   * Log only in development
   */
  devOnly(message: string, ...args: any[]): void {
    if (isDevelopment) {
      console.log(`[DEV] ${message}`, ...args);
    }
  }
}

// Export singleton instance
export const logger = new Logger();

// Export function for creating custom loggers
export function createLogger(config?: Partial<LoggerConfig>): Logger {
  return new Logger(config);
}
