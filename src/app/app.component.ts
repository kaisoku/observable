import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated: boolean;
  private activatedSub: Subscription;
  constructor(private userService: UserService) {}
  ngOnDestroy() {
    this.activatedSub.unsubscribe();
  }

  ngOnInit() {
    this.activatedSub = this.userService.activatedEmitter.subscribe(
      (isActivated: boolean) => (this.userActivated = isActivated)
    );
  }
}
