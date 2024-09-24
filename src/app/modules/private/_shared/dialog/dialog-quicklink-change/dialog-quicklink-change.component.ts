import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DIALOG_DATA, DialogRef, CdkDialogContainer } from '@angular/cdk/dialog';

import { Quicklinks } from '../../../../../mocks/quicklinks-mock';
import { QuicklinksService } from '../../../quicklinks/quicklinks.service';

@Component({
    selector: 'app-dialog-quicklink-change',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
    ],
    templateUrl: './dialog-quicklink-change.component.html',
    styleUrl: './dialog-quicklink-change.component.scss'
})

export class DialogQuicklinkChangeComponent {
    public editedQuicklink: Quicklinks;
    public isNew: boolean;

    constructor(
        public dialogRef: DialogRef<{ action: string, quicklink?: Quicklinks, id?: number }>,
        @Inject(DIALOG_DATA) public data: { quicklink: Quicklinks, isNew: boolean },
        private quicklinkService: QuicklinksService,
    ) {
        console.log('dialogRef + data:', dialogRef, '\n', data);
        this.editedQuicklink = { ...data.quicklink };
        this.isNew = data.isNew;  // Das Flag `isNew` wird gesetzt
    }

    onSave(): void {
        this.dialogRef.close({ action: 'save', quicklink: this.editedQuicklink });
    }

    onCancel(): void {
        if (this.isNew) {
            // Wenn der Quicklink neu ist, lösche ihn beim Abbrechen
            this.dialogRef.close({ action: 'delete', id: this.editedQuicklink.id });
        } else {
            // Ansonsten einfach nur den Dialog schließen ohne Löschung
            this.dialogRef.close({ action: 'cancel' });
        }
    }

    onDelete(): void {
        this.dialogRef.close({ action: 'delete', id: this.editedQuicklink.id });
    }
}
