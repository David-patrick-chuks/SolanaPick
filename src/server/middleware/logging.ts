import morgan from 'morgan';

// Use morgan for HTTP request logging. Replace or extend for custom logging.
export const loggingMiddleware = morgan('dev');
