import { log } from '../../utils/logger';

export function requestMiddleware(req: any, res: any, next: any) {
  log(`Request: ${req.method} ${req.url}`, 'info');
  next();
}
