import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'jhi-feeds',
  templateUrl: './feeds.component.html',
  styles: []
})
export class FeedsComponent implements OnInit {

  constructor(public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe((res) => {
      console.log('query: ', res.who);
    });
  }

}
