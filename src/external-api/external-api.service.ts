import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ExternalApiService {
  private readonly apiUrl = process.env.MAP_API_BASE_URL;

  constructor(private readonly httpService: HttpService) {}

  fetchData(method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', endpoint: string, data?: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    let request;

    switch (method) {
      case 'GET':
        request = this.httpService.get(url);
        break;
      case 'POST':
        request = this.httpService.post(url, data);
        break;
      case 'PUT':
        request = this.httpService.put(url, data);
        break;
      case 'PATCH':
        request = this.httpService.patch(url, data);
        break;
      case 'DELETE':
        request = this.httpService.delete(url, data);
        break;
      default:
        throw new HttpException('Method not allowed', HttpStatus.METHOD_NOT_ALLOWED);
    }

    return request.pipe(
      map((response: any) => {
        return response?.data
      }),
      catchError((error: any) => {
        return this.handleError(error)
      }),
    );
  }

  // Error handling method
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.response) {
      // Server responded with a status other than 2xx
      errorMessage = `Error: ${error.response.data.message || error.response.statusText}`;
    } else if (error.request) {
      // Request was made but no response was received
      errorMessage = 'Error: No response received from the server.';
    } else {
      // Something happened in setting up the request
      errorMessage = `Error: ${error.message}`;
    }
    // Throw an HttpException with the error message
    return throwError(new HttpException(errorMessage, HttpStatus.BAD_GATEWAY));
  }
}