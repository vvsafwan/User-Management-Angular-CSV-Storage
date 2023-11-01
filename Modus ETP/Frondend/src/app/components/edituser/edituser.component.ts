import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  email1!: string;
  mobile1!: string;
  firstname1!: string;
  lastname1!: string;
  address1!: string;

  UserForm!: FormGroup;

  constructor(
    private service: UserService,
    private routes: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
      const email = this.routes.snapshot.paramMap.get('email')
      this.service.getUser(email)
      .subscribe((res:any) => {
        this.email1 = res[0].email;
        this.mobile1 = res[0].mobile;
        this.firstname1 = res[0].firstname;
        this.lastname1 = res[0].lastname;
        this.address1 = res[0].address;
        this.UserForm = new FormGroup({
          email: new FormControl(this.email1),
          mobile: new FormControl(this.mobile1),
          firstname: new FormControl(this.firstname1),
          lastname: new FormControl(this.lastname1),
          address: new FormControl(this.address1)
        })
      },(err) => {
        this.toastr.error("Something went wrong");
      })

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
    const email = this.routes.snapshot.paramMap.get('email');
    const user = this.UserForm.getRawValue();
    this.service.updateUser(email,user)
    .subscribe((res:any) => {
      this.toastr.success(res.message);
      this.router.navigate(['/listuser']);
    },(err) => {
      this.toastr.error("Something went wrong");
    })
    
  }
}
