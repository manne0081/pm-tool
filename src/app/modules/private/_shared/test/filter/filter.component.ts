import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-filter',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    templateUrl: './filter.component.html',
    styleUrl: './filter.component.scss'
})

export class FilterComponent {
    filterForm: FormGroup;
    showFilters: boolean = false;  // Steuert, ob das Filter-Fenster angezeigt wird

    fields = ['Category', 'Price', 'Stock', 'Date'];  // Beispiel-Felder
    operators = ['equals', 'greater than', 'less than'];  // Beispiel-Operatoren

    constructor(private fb: FormBuilder) {
        this.filterForm = this.fb.group({
            conditions: this.fb.array([])  // Array für mehrere Bedingungen
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
    toggleFilters() {
        this.showFilters = !this.showFilters;
    }

    // Formular-Submit-Methode
    onSubmit() {
        console.log(this.filterForm.value);
    }

}
