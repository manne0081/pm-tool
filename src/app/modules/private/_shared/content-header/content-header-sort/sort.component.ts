import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

import { ContentHeaderService } from '../content-header.service';
import { DropdownBaseComponent } from '../../dropdown/dropdown-base/dropdown-base.component';

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

export class SortComponent implements OnInit{
    elementId: string = uuidv4();
    sortForm: FormGroup;
    showContent: boolean = false;  // Steuert, ob das Filter-Fenster angezeigt wird

    fieldNames?: string;
    isAddConditionLocked: boolean = false;

    constructor(
        private fb: FormBuilder,
        private contentHeaderService: ContentHeaderService,
    ) {
        this.sortForm = this.fb.group({
            conditions: this.fb.array([])  // Array für mehrere Bedingungen
        });
    }

    ngOnInit(): void {
        // console.log('elementId:',uuidv4());
        this.contentHeaderService.getActiveDropdown().subscribe(activeDropdown => {
            if (activeDropdown !== this.elementId) {
                this.showContent = false;
            }
        });
    }

    /**
     * Hilfsmethode zum Abrufen der Bedingungsgruppen
     */
    get conditions(): FormArray {
        return this.sortForm.get('conditions') as FormArray;
    }

    /**
     *
     * @param event
     */
    addCondition(event: Event) {
        event.stopPropagation();

        if (this.conditions.length < 3) {

            const conditionGroup = this.fb.group({
                field: [''],
                order: [''],
            });

            this.conditions.push(conditionGroup);

            if (this.conditions.length === 3) {
                this.isAddConditionLocked = true;
            }
        }
    }

    /**
     *
     * @param event
     * @param index
     */
    removeCondition(event: Event, index: number) {
        event.stopPropagation();
        this.conditions.removeAt(index);
        this.isAddConditionLocked = false;
    }

    /**
     *
     * @param event
     */
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
        // console.log(this.sortForm.value);
    }

    /**
     *
     * @param event
     */
    @HostListener('document:click', ['$event'])
    onClickOutside(event: Event): void {
        const target = event.target as HTMLElement;
        if (!target.closest('.sort-container') && this.showContent) {
            this.contentHeaderService.setActiveDropdown(null);
        }
    }
}
