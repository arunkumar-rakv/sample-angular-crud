import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  private user: User;

  constructor( private userService: UserService,
    private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    let id = this.route.snapshot.params['id'];
    if(id) {
      this.userService.getUser(id)
      .subscribe(data => {
        this.user = data;        
      }, error => console.log(error));
    }
  }

  deleteUser(id) {
    this.userService.deleteUser(id).subscribe(data => {
      this.router.navigate(['/user-list']);
    })
  }

}
