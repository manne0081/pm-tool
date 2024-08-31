import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../../../mocks/project-mock';
import { Client } from '../../../../mocks/client-mock';
import { PROJECT_MOCK } from '../../../../mocks/project-mock';
import { CLIENT_MOCK } from '../../../../mocks/client-mock';

@Component({
    selector: 'app-project-detail',
    standalone: true,
    imports: [
        FormsModule,
    ],
    templateUrl: './project-detail.component.html',
    styleUrl: './project-detail.component.scss'
})

export class ProjectDetailComponent {
    project: Project = {} as Project;
    clientItems = CLIENT_MOCK;
    originalProject: Project | undefined;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit(): void {
        // const projectId = Number(this.route.snapshot.paramMap.get('id'));
        // this.project = PROJECT_MOCK.find(proj => proj.id === projectId) ?? ({} as Project);

        // if (this.project) {
        //   // Deep copy of the project to allow canceling without modifying the original
        //   this.originalProject = JSON.parse(JSON.stringify(this.project));
        // }

        const projectId = Number(this.route.snapshot.paramMap.get('id'));
        this.project = PROJECT_MOCK.find(proj => proj.id === projectId) ?? ({} as Project);

    }

    onSave(): void {
        if (this.project) {
            // Update the original project in the mock data
            const index = PROJECT_MOCK.findIndex(proj => proj.id === this.project!.id);
            if (index !== -1) {
                PROJECT_MOCK[index] = this.project;
            }

            this.router.navigate(['/projects']); // Redirect to the project list or any other page after saving
        }
    }

    onCancel(): void {
        if (this.originalProject) {
            this.project = JSON.parse(JSON.stringify(this.originalProject)); // Revert changes
        }

        this.router.navigate(['/projects']); // Redirect to the project list or any other page
    }
}
