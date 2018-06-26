
import {of as observableOf,  Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SpyObject } from './spyobject';
import Spy = jasmine.Spy;

export class MockActivatedRoute extends ActivatedRoute {

    constructor(parameters?: any) {
        super();
        this.queryParams = observableOf(parameters);
        this.params = observableOf(parameters);
        this.data = observableOf({ ...parameters, pagingParams: {
            page: 10,
            ascending: false,
            predicate: 'id'
        }});
    }
}

export class MockRouter extends SpyObject {
    navigateSpy: Spy;

    constructor() {
        super(Router);
        this.navigateSpy = this.spy('navigate');
    }
}
