import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  UserForm!: FormGroup;

  constructor( 
    private service: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.UserForm = new FormGroup({
        email: new FormControl(""),
        mobile: new FormControl(""),
        firstname: new FormControl(""),
        lastname: new FormControl(""),
        address: new FormControl("")
      })
  }

  get email(): FormControl{
    return this.UserForm.get("email") as FormControl 
  }

  get mobile(): FormControl{
    return this.UserForm.get("mobile") as FormControl
  }

  get firstname(): FormControl{
    return this.UserForm.get("firstname") as FormControl
  }

  get lastname(): FormControl{
    return this.UserForm.get("lastname") as FormControl
  }

  get address(): FormControl{
    return this.UserForm.get("address") as FormControl
  }

  onSubmit(){
    const user = this.UserForm.getRawValue();
    if(!(user.firstname=='' || user.lastname=='' || user.address=='' || user.mobile=='' || user.email=='')){
      this.service.userCreate(user)
      .subscribe((res:any)=>{
        this.toastr.success(res.message);
        this.router.navigate(['/listuser'])
      },
      (err) => {
        this.toastr.error(err.error.message)
      }
      )
      console.log(user);
    }else{
      this.toastr.error("Fill every input correctly");
    }
  }

}
