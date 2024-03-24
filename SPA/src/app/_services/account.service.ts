import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { IUser } from '../_models/iuser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<IUser | null>(null);
  currentUser$ = this.currentUserSource.asObservable(); //el signo de peso significa que es un observable


  constructor(private http: HttpClient) { }


  login(model: IUser){
    return this.http.post<IUser>(this.baseUrl + "account/login", model).pipe(
      map((response: IUser) => {
        const user = response;
        if (user){
          this.setCurrentUser(user);
        }
      })
    );
  }

  register(model: any){
    return this.http.post<IUser>(this.baseUrl + "account/register", model).pipe(
      map(user =>{
        if(user){
          this.setCurrentUser(user);
        }
      })
    );
  }


  //Cualquier cambio que se necesite guardar 
  setCurrentUser(user: IUser){
    localStorage.setItem("user",JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem("user");
    this.currentUserSource.next(null);
  }
}
