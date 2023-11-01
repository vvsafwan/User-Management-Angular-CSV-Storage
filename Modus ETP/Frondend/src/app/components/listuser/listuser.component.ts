import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/Model/UserModel';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {

  users!: UserModel[]

  constructor(
    private service: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
      this.service.userLoad()
      .subscribe((res) => {
        this.users = res;
      })
  }

  deleteUser(email:string){
    this.service.deleteUser(email)
    .subscribe((res:any)=> {
      this.toastr.success(res.message)
      this.users = res.filteredResults;
      
    },(err) => {
      this.toastr.error("Something went wrong");
    })
  }

  editUser(email:string){
    this.router.navigate(['/edituser/' + email])
  }

}
