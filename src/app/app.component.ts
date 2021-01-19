import { Component } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';
import { Router } from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sample-angular-crud';
  searchBar: IonSearchbar;

  constructor(private router: Router) {}
  searchUser(value) {    
    this.router.navigate(['/user-list'], { queryParams: { search: value }});
  }
}
