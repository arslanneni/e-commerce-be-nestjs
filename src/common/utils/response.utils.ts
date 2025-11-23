import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '../interface/api-response.interface';


export function buildResponse<T>(
  data: T,
  message = 'Success',
  statusCode: number = HttpStatus.OK,
): ApiResponse<T> {
  return {
    success: statusCode < 400,
    statusCode,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
}
