import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Dialog, DialogRef, DIALOG_DATA, DialogModule, CdkDialogContainer } from '@angular/cdk/dialog';
import { DialogComponent } from '../_shared/dialog/dialog.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        FormsModule,
        DialogModule,
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {

    constructor(
        public dialog: Dialog,
    ) {}

    animal: string | undefined;
    name: string | undefined;

    openDialog(): void {
        const dialogRef = this.dialog.open<string>(DialogComponent, {
            width: '250px',
            data: {name: this.name, animal: this.animal},
        });

        dialogRef.closed.subscribe(result => {
            console.log('The dialog was closed', result);
            this.animal = result;
        });
    }
}
