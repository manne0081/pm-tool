import { Component, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

import { DropdownBaseComponent } from '../../dropdown/dropdown-base/dropdown-base.component';
import { CommonModule } from '@angular/common';
import { ContentHeaderService } from '../content-header.service';

@Component({
    selector: 'app-sort',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DropdownBaseComponent,
    ],
    templateUrl: './sort.component.html',
    styleUrl: './sort.component.scss'
})

export class SortComponent {
    elementId: string = uuidv4();
    sortForm: FormGroup;
    showContent: boolean = false;  // Steuert, ob das Filter-Fenster angezeigt wird

    fieldNames?: string;

    constructor(
        private contentHeaderService: ContentHeaderService,
        private fb: FormBuilder,
    ) {
        console.log(uuidv4());
        this.sortForm = this.fb.group({
            conditions: this.fb.array([])  // Array für mehrere Bedingungen
        });
        this.contentHeaderService.getActiveDropdown().subscribe(activeDropdown => {
            if (activeDropdown !== this.elementId) {
                this.showContent = false;
            }
        });
    }

    // Hilfsmethode zum Abrufen der Bedingungsgruppen
    get conditions(): FormArray {
        return this.sortForm.get('conditions') as FormArray;
    }

    addCondition() {
        const conditionGroup = this.fb.group({
            field: [''],
            operator: [''],
            value: ['']
        });
        this.conditions.push(conditionGroup);
    }

    removeCondition(index: number) {
        this.conditions.removeAt(index);
    }

    toggleContent(event: Event) {
        event.stopPropagation();
        this.showContent = !this.showContent;

        if (this.showContent) {
            this.contentHeaderService.setActiveDropdown(this.elementId);
        } else {
            this.contentHeaderService.setActiveDropdown(null);
        }
    }

    onSubmit() {
        console.log(this.sortForm.value);
    }

    @HostListener('document:click', ['$event'])
    onClickOutside(event: Event): void {
        const target = event.target as HTMLElement;

        if (!target.closest('.sort-container') && this.showContent) {
            console.log('test');
            this.contentHeaderService.setActiveDropdown(null);
        }
    }
}
