import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from "../../models/user";
import { UserService } from "../../services/user/user.service";
import { FormCanDeactivate } from "../../guards/form-can-deactivate";
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent extends FormCanDeactivate implements OnInit  {

  @ViewChild('form', { static: true })
  form: NgForm;

  formGroup: FormGroup;

  user: User;
  id: number = 0;

  constructor(private _formBuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute,
    private userService: UserService) { 
      super();
    }

  ngOnInit() {    
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.userService.getUser(this.id)
      .subscribe(data => {
        this.user = data;
        this.formGroup.setValue({
          id: this.user.id,
          name: this.user.name,
          username: this.user.username,
          email: this.user.email,
          phone: this.user.phone
        });
      }, error => console.log(error));
    }
    this.formGroup = this._formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  get firstCtrl(): any {
    return this.formGroup.get('firstCtrl');
  }

  onSubmit() {
    this.user = {...this.user, ...this.formGroup.value};
    if(this.id) {
      this.userService.updateUser(this.id, this.user)
      .subscribe(data => console.log(data), error => console.log(error));
    } else {
      this.userService.createUser(this.user)
        .subscribe(data => console.log(data), error => console.log(error));
    }
    
    this.router.navigate(['/user-list']);
  }

}
