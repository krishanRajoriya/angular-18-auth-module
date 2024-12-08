import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = environment.apiBaseUrl;
  const token = localStorage.getItem('authToken');

  const clonedReq = req.clone({
    url: `${baseUrl}${req.url}`, 
    setHeaders: token ? { Authorization: `Bearer ${token}` } : {}, 
  });

  return next(clonedReq).pipe(
    catchError((error) => {
      console.error('HTTP Error:', error);
      if (error.status === 400) {
        console.log(error)
        // alert(error.error.message)
        Swal.fire({
          title: "Error",
          text: error.error.message,
          icon: "warning",
        });
      }
       else if (error.status === 401) {
        Swal.fire({
          title: "Error",
          text: 'Unauthorized access - redirect to login',
          icon: "warning",
        });
      }
      else if (error.status === 500 || error.status === 0) {
         Swal.fire({
          title: "Error",
          text: 'Internal server error',
          icon: "warning",
        });
      }
      return throwError(() => error);
    })
  );
};
