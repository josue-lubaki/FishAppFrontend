/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { User, UsersService, LocalstorageService } from '@ghost/users';

@Component({
    selector: 'ngshop-user-page',
    templateUrl: './user-page.component.html',
    styles: []
})
export class UserPageComponent implements OnInit {
    constructor(
        private userService: UsersService,
        private localstorage: LocalstorageService
    ) {}
    user!: User;

    ngOnInit(): void {
        this._bindUser();
        console.log('User', this.user);
    }

    _bindUser() {
        const id = this.localstorage.getUserCurrent() || '60e40dfee3da709f18177a39';
        this.userService.getUser(id).subscribe((user: User) => {
            this.user = user;
        });
    }
}
