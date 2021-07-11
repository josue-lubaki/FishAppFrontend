/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'products-products-search',
    templateUrl: './products-search.component.html',
    styles: []
})
export class ProductsSearchComponent implements OnInit {
    searchForm!: FormGroup;
    constructor(private modalService: NgbModal, private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this._initSearchForm();
    }

    private _initSearchForm() {
        this.searchForm = this.formBuilder.group({
            search: ['', Validators.required]
        });
    }

    openModal(modal: any) {
        this.modalService.open(modal, { centered: true });
    }
}
