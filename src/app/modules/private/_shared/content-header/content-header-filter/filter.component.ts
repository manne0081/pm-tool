import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

import { DropdownBaseComponent } from '../../dropdown/dropdown-base/dropdown-base.component';
import { PrivateService } from '../../../private.service';
import { ContentHeaderService } from '../content-header.service';

@Component({
    selector: 'app-filter',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DropdownBaseComponent,
    ],
    templateUrl: './filter.component.html',
    styleUrl: './filter.component.scss'
})

export class FilterComponent {
    elementId: string = uuidv4();
    filterForm: FormGroup;
    showContent: boolean = false;  // Steuert, ob das Filter-Fenster angezeigt wird

    fields = ['Category', 'Price', 'Stock', 'Date'];  // Beispiel-Felder
    operators = ['equals', 'greater than', 'less than'];  // Beispiel-Operatoren

    fieldNames?: string;

    constructor(
        private contentHeaderService: ContentHeaderService,
        private fb: FormBuilder,
    ) {
        console.log(this.elementId);

        this.filterForm = this.fb.group({
            conditions: this.fb.array([])  // Array für mehrere Bedingungen
        });
        // Beobachten des Dropdown-Zustands
        this.contentHeaderService.getActiveDropdown().subscribe(activeDropdown => {
            if (activeDropdown !== this.elementId) {
                this.showContent = false;  // Schließe, wenn ein anderer Dropdown aktiv ist
            }
        });
    }

    // Hilfsmethode zum Abrufen der Bedingungsgruppen
    get conditions(): FormArray {
        return this.filterForm.get('conditions') as FormArray;
    }

    // Hinzufügen einer neuen Bedingung
    addCondition() {
        const conditionGroup = this.fb.group({
            field: [''],
            operator: [''],
            value: ['']
        });
        this.conditions.push(conditionGroup);
    }

    // Entfernen einer Bedingung
    removeCondition(index: number) {
        this.conditions.removeAt(index);
    }

    // Anzeigen/Verstecken des Filter-Fensters
    toggleContent(event: Event) {
        event.stopPropagation();
        this.showContent = !this.showContent;

        if (this.showContent) {
            this.contentHeaderService.setActiveDropdown(this.elementId);
        } else {
            this.contentHeaderService.setActiveDropdown(null);
        }
    }

    // Formular-Submit-Methode
    onSubmit() {
        console.log(this.filterForm.value);
    }

    @HostListener('document:click', ['$event'])
    onClickOutside(event: Event): void {
        const target = event.target as HTMLElement;

        if (!target.closest('.filter-container') && this.showContent) {
            console.log('clickedOutsideFilter', target);
            this.contentHeaderService.setActiveDropdown(null);  // Schließt den Filter-Container
        }
    }
}
