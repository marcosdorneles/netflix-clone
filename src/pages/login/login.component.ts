import { Component, OnInit } from '@angular/core';
import { User } from 'src/common/user';
import { UserService } from 'src/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{


  user: User = new User()
  formUser!: FormGroup
  listUser: User[] = []

  createForm(user: User){
    this.formUser = new FormGroup({
      email:new FormControl (user.email, [
        Validators.required
      ]),
      password: new FormControl(user.password)
    })
  }

  get email(){
    return this.formUser.get('email')
  }

  get password(){
    return this.formUser.get('password')
  }

  createLocalStorage(booleanValue: boolean){
    localStorage.setItem('logged', `${booleanValue}`)
  }

  ngOnInit(): void {
    this.getUsersList()
    this.createForm(new User())
    this.createLocalStorage(false)
  }

   getUsersList(){
    this.userService.getUsers().subscribe((users =>{
      this.listUser = users
      
    }))
  }

  findUser() {
    this.listUser.find((user) => {
      if(user.email === this.email!.value) {
        this.user = user;
      }
    });

    if(this.user.email === undefined && this.email!.value === null) {
      this.email!.setErrors({'required': true});
      this.email!.markAsTouched();
      return false;
    }else if(this.user.email === undefined && this.email!.value != null) {
      this.email!.setErrors({'invalid': true});
      this.email!.markAsTouched();
      return false;
    }else{
      return true;
    }
  }

  correctPassword(){
    if(this.password!.value === null) {
      this.password!.setErrors({'required': true});
      this.password!.markAsTouched();
    }else{
      if(this.user.password === this.password!.value) {
        return true;
      }else{
        this.password!.setErrors({'invalid': true});
        this.password!.markAsTouched();
        return false;
      }
    }
    return false;
  }

  onSubmit() {
    if(this.findUser()){
      if(this.correctPassword()) {
        this.createLocalStorage(true);
        this.router.navigate(['/']);
      }else{
        this.createLocalStorage(false);
      }
    }else{
      this.createLocalStorage(false);
    }
  }


  constructor(private userService: UserService, private router: Router){}
}
