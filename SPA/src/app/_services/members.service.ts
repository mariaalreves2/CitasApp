import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IMember } from '../_models/imember';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: IMember[] = [];
  

  constructor(private http: HttpClient) { }

  getMembers() : Observable<IMember[]>{
    if (this.members.length > 0) return of(this.members);
    return this.http.get<IMember[]>(this.baseUrl + "users").pipe(
      map(members => {
        this.members = members;
        return members;
      }),
    );
  }

  getMember(username: string) : Observable<IMember>{
    const member = this.members.find(x => x.userName === username);
    if (member) return of(member);
    return this.http.get<IMember>(this.baseUrl + "users/" + username);
  }

  updateMember(member: IMember) : Observable<void>{
    return this.http.put(this.baseUrl + "users", member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = {...this.members[index], ...member};
      }),
    );
  }

  setMainPhoto(photoId: number): Observable<Object> {
    return this.http.put(this.baseUrl + "users/photo/" + photoId, {});
  }

  deletePhoto(photoId: number): Observable<Object> {
    console.log("photoId de nuevo: " + photoId);
    return this.http.delete(this.baseUrl + "users/photo/" + photoId, {});
  }
}
