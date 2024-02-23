import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent implements OnInit{
  baseUrl = "https://localhost:5001/api/";
  validationErrors: string [] = [];

  constructor(private http: HttpClient){}

  ngOnInit(): void{

  }

  get400ValidationError(): void{
    this.http.post(this.baseUrl + "account/register",{}).subscribe({
      next: response => console.log(response),
      error: error => {
        console.log(error);
        this.validationErrors = error;
      }
    })
  }

  get400Error(): void{
    this.http.get(this.baseUrl + "buggy/bad-request").subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  get401Error(): void{
    this.http.get(this.baseUrl + "buggy/auth").subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  get404Error(): void{
    this.http.get(this.baseUrl + "buggy/not-found").subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  get500Error(): void{
    this.http.get(this.baseUrl + "buggy/server-error").subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }
}
