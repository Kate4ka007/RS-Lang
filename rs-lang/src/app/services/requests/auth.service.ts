import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthData, BASE_URL, ENDPOINTS, UserReg, UserRegResponse, UserSingIn } from 'src/app/models/requests.model';
import { catchError, of, Observable, tap, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
    this._isSignIn = !!localStorage.getItem('userToken') || false
    this.isSignInSubj.next(this._isSignIn)
    this._isSignIn$.subscribe(value => {
      this._isSignIn = value
    })
  }

  private _isSignIn: boolean = false

  private isSignInSubj: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _isSignIn$: Observable<boolean> = this.isSignInSubj.asObservable();

  createUser(userData: UserReg): Observable<UserRegResponse | number> {
    //417 user exist
    //422 email or password error
    return this.http.post<number>(`${BASE_URL}/${ENDPOINTS.users}`, userData).pipe(
      catchError((err) => {
        return of(err.status)
      })
    )
  }

  signIn(userData: UserSingIn): Observable<AuthData | number >{
    return this.http.post<number>(`${BASE_URL}/${ENDPOINTS.signin}`, userData).pipe(
      catchError((err) => {
        return of(err.status)
      }),
      tap(res => {
        if(typeof res !== 'number') {
          this.setLocalStorage(res)
          this.isSignInSubj.next(true)
          this.router.navigate(['/'])
        }
      })
    )
  }

  get isSignIn() {
    return this._isSignIn
  }

  get isSignIn$ () {
    return this._isSignIn$
  }

  private setLocalStorage(settings: AuthData) {
    localStorage.setItem('userName', settings.name)
    localStorage.setItem('userId', settings.userId)
    localStorage.setItem('userToken', settings.token)
    localStorage.setItem('userRefreshToken', settings.refreshToken)
  }

  singOut() {
    localStorage.removeItem('userName')
    localStorage.removeItem('userId')
    localStorage.removeItem('userToken')
    localStorage.removeItem('userRefreshToken')
    this.isSignInSubj.next(false)

    this.router.navigate(['/'])
  }
}
