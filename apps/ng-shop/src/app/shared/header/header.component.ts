/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalstorageService, UsersService } from '@ghost/users';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/* Fonction qui permet à l'icône "Hamburger" d'afficher la barre de menu */
declare function showMenu(navId: any): void;

@Component({
    selector: 'ngshop-header',
    templateUrl: './header.component.html',
    styleUrls: []
})
export class HeaderComponent implements OnInit, OnDestroy {
    myName?: any;
    endSubs$: Subject<any> = new Subject();
    constructor(
        private localstorageService: LocalstorageService,
        private usersService: UsersService
    ) {}

    ngOnInit(): void {
        const idUser = this.localstorageService.getUserCurrent();
        if (idUser && idUser !== null) {
            this.usersService
                .getUser(idUser)
                .pipe(takeUntil(this.endSubs$))
                .subscribe((user) => {
                    this.myName = user.name;
                });
        }
    }

    ngOnDestroy(): void {
        this.endSubs$.next();
        this.endSubs$.complete();
    }

    openMenuBar() {
        showMenu('blocMenu');
    }
}
