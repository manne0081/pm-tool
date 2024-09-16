import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class RouterService {

    constructor(
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    /**
     *
     * @returns The ActivatedRouteSnapshot-Array
     */
    getFullRoute(): ActivatedRouteSnapshot {

        const url = this.router.routerState.snapshot.url;
        const parts = url.split('/');
        const strippedUrl = parts[2];
        console.log('Stripped url:', strippedUrl);

        const currentRoute = this.route.snapshot;
        return currentRoute;
    }

    /**
     *
     * @returns
     */
    getLastSegmentOfCurrentUrl(): string {
        const url = this.router.routerState.snapshot.url;
        const parts = url.split('/');                           // Split URL by '/'
        const strippedUrl = parts[2];                           // Get the second part (index 2) assuming the URL is like '/private/project'
        return strippedUrl;
    }






}
