import { Component, OnInit, HostListener, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {Dialog, DialogRef, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';

import { PrivateService } from './private.service';
import { ModalService } from './_shared/modal/modal.service';

import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { QuicklinksComponent } from './quicklinks/quicklinks.component';
import { AddInfoComponent } from './add-info/add-info.component';
import { ContentHeaderForListComponent } from './content-header/content-header-for-list/content-header-for-list.component';
import { ContentHeaderForDetailComponent } from './content-header/content-header-for-detail/content-header-for-detail.component';
import { ModalComponent } from './_shared/modal/modal.component';
import { DialogComponent } from './_shared/dialog/dialog.component';

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    selector: 'app-private',
    standalone: true,
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        HeaderMenuComponent,
        QuicklinksComponent,
        AddInfoComponent,
        ContentHeaderForListComponent,
        ContentHeaderForDetailComponent,
        ModalComponent,
    ],
    templateUrl: './private.component.html',
    styleUrl: './private.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Allow using custom elements (Web Components)
})

export class PrivateComponent implements OnInit {
    selectedMenuItemTitle: any;                                 // Show the object-title at the content-title-container

    isViewDashboard?: boolean;                                  // Save wether view is dashboard to show or hide some stuff

    isQuicklinksAreaVisible?: boolean;                          // Show or hide the QuicklinksArea
    isAddInfoButtonVisible?: boolean;                           // Show or hide the AddInfoButton
    isAddInfoAreaVisible?: boolean;                             // Show or hide the AddInfoArea

    viewType: string = 'list'                                   // list or detail

    constructor(
        private privateService: PrivateService,
        protected modalService: ModalService,
    ){}

    ngOnInit(): void {

        // Show or hide (AddInfoArea, ContentHeader, ContentActions, AddInfoArea)
        this.privateService.isViewDashboard$.subscribe(data => {
            this.isViewDashboard = data;
        });

        this.privateService.selectedMenuItemTitle$.subscribe(data => {
            this.selectedMenuItemTitle = data;
        });

        // Show or hide (QuicklinksArea)
        this.privateService.isQuicklinksAreaVisible$.subscribe(data => {
            this.isQuicklinksAreaVisible = data;
        });

        // Show or hide (AddInfoButton)
        this.privateService.isAddInfoButtonVisible$.subscribe(data => {
            this.isAddInfoButtonVisible = data;
        });

        // Show or hide (AddInfoArea)
        this.privateService.isAddInfoAreaVisible$.subscribe(data => {
            this.isAddInfoAreaVisible = data;
        });

        // Show the list- or the detail contentHeader
        this.privateService.viewType$.subscribe(data => this.viewType = data);

    }

    /**
     *
     */
    toggleQuicklinkVisibility(): void {
        if (this.isQuicklinksAreaVisible) {
            this.privateService.setIsQuicklinksAreaVisible(false);
        } else {
            this.privateService.setIsQuicklinksAreaVisible(true);
        }
    }

    /**
     *
     */
    toggleAddInfoVisibility(): void {
        if (this.isAddInfoAreaVisible) {
            this.privateService.setIsAddInfoAreaVisible(false);
        } else {
            this.privateService.setIsAddInfoAreaVisible(true);
        }
    }

    /**
     *
     * @param event
     */
    @HostListener('window:keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent) {
        // check if strg + s has been clicked
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();                     // cancel default (save-dialog)
            this.saveFunction();                        // call own function
        }
    }

    /**
     * maybe a save-function can be calling
     */
    saveFunction() {
        // console.log('Speichern-Funktion wurde aufgerufen');
    }



    dialog = inject(Dialog);
    animal: string | undefined;
    name: string | undefined;

    openDialog(): void {
        const dialogRef = this.dialog.open<string>(DialogComponent, {
            data: {name: this.name, animal: this.animal},
        });

        dialogRef.closed.subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;
        });
    }



}
