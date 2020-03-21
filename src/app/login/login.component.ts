import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http"


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  username: string = "rob@elevenfifty.com"
  password: string = "MyNewPassword"
  description: string = "20 Pushups"
  image



  login(){
    let formData = {user:{
      username: this.username,
      password: this.password
    }}

    this.http.post<any>('http://localhost:4000/api/user/signin', formData).subscribe(
      (res) => {
        console.log(res)
        localStorage.setItem("token", res.sessionToken)
      },
      (err) => console.log(err)
    );

    

  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
      console.log(this.image)
    }
  }

  onSubmit(){
    let formData = new FormData
    formData.append("description", this.description)
    formData.append("file", this.image)
    console.log(formData.getAll)
    const reqHeaders = new HttpHeaders({
      Authorization: localStorage.getItem("token")
    });
    reqHeaders.append("Content-Type","multipart/form-data")


    this.http.post<any>('http://localhost:4000/api/log', formData, {headers: reqHeaders}).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

}
