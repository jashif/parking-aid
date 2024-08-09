export function errorMiddleware(err: any, req: any, res: any, _next: any) {
  const responseBody = err.data || {
    message: err.message,
  };
  const isValidationError = err.name === 'Bad Request';

  return res.status(isValidationError ? 400 : err.status ?? 500).send(responseBody);
}
