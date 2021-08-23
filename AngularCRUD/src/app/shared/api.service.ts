import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token: any;
  isAuthenticated: boolean = false;
  private subject = new Subject<boolean>();
  constructor(private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar) { }

  postEmployee(data: any) {
    return this.http.post<any>("http://localhost:5000/auth/register", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  getEmployee() {
    return this.http.get<any>("http://localhost:5000/auth/users")
      .pipe(map((res: any) => {
        return res;
      }))
  }
  updateEmployee(data: any, id: number) {
    return this.http.put<any>("http://localhost:5000/auth/update/" + id, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  deleteEmployee(id: string) {
    return this.http.delete<any>("http://localhost:5000/auth/delete/" + id)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  login(data: any) {
    return this.http.post<any>("http://localhost:5000/auth/login", data)
      .subscribe(res => {
        const token = res
        this.token = token;
        console.log(this.token)
        if (token) {
          this.isAuthenticated = true;
          this.subject.next(true)
          this.saveTokenData(this.token)
          this.router.navigate(['/dashboard'])

        }
      }, err => {
        this.subject.next(false)
        this.snackBar.open(err.error, 'Failed', {
          duration: 3000
        });
      })


  }
  Register(data: any) {
  this.http.post<any>("http://localhost:5000/auth/register", data)
      .subscribe((res) => {
        const token = res
        this.token = token;
        console.log(this.token)
        if (token) {
          this.isAuthenticated = true;
          this.subject.next(true)
          this.saveTokenData(this.token)
          this.router.navigate(['/dashboard'])

        }
      }, (err) => {
        this.subject.next(false)
      });
    }

  private saveTokenData(token: string) {
    localStorage.setItem('token', token)
  }
  logout() {
    this.token = null;
    this.subject.next(false)
    this.clearTokenData();
    this.router.navigate(['/login'])
  }
  private clearTokenData() {
    localStorage.removeItem('token')

  }
  getIsAuth() {
    return this.isAuthenticated
  }
  getMessage() {
    return this.subject.asObservable();
  }
  getAuthData() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    return {
      token: token
    };
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    this.token = authInformation.token;
    if (this.token) {
      this.isAuthenticated = true;
      this.subject.next(true);
    }
  }


  //products
  getProducts() {
    return this.http.get<any>("http://localhost:5000/auth/products",)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  deleteProduct(id: string) {
    return this.http.delete<any>("http://localhost:5000/auth/products/" + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  updateProduct(data: any, id: number) {
    return this.http.put<any>("http://localhost:5000/auth/products/" + id, data)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  postProduct(data: any) {
    return this.http.post<any>("http://localhost:5000/auth/products", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

//category
  getcategory() {
    return this.http.get<any>("http://localhost:5000/auth/category",)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  deletecategory(id: string) {
    return this.http.delete<any>("http://localhost:5000/auth/category/" + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  updatecategory(data: any, id: number) {
    return this.http.put<any>("http://localhost:5000/auth/category/" + id, data)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  postcategory(data: any) {
    return this.http.post<any>("http://localhost:5000/auth/category", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

}
