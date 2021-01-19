import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from "../../models/user";
import { UserService } from "../../services/user/user.service";
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: User[] = []
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource<User>();
  searchValue = '';
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  hasValues = false;

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) {
     }

  ngOnInit() {
    this.getUsers();
    this.route
      .queryParams
      .subscribe(params => {        
        this.searchValue = params['search'];     
        if(this.searchValue) this.searchUsers();   
      });
  }

  searchUsers() {
    this.userList = this.userService.searchUsers(this.searchValue); 
    if (this.userList.length > 0) {
      this.hasValues = true;
    } else {
      this.hasValues = false;
    }        
    this.dataSource = new MatTableDataSource<User>(this.userList);
    this.dataSource.paginator = this.paginator;
  }

  getUsers() {
    //this.userService.getUsers().subscribe(data => {
        this.userList = this.userService.getUsers();   
        if (this.userList.length > 0) {
          this.hasValues = true;
        } else {
          this.hasValues = false;
        }        
        this.dataSource = new MatTableDataSource<User>(this.userList);
        this.dataSource.paginator = this.paginator;
    //});
  }

  deleteUser(id) {
    this.userService.deleteUser(id).subscribe(data => {
      this.getUsers();        
    });
  }

}
