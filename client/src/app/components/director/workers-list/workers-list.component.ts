import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IWorkerInterface } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-workers-list',
  templateUrl: './workers-list.component.html',
  styleUrls: ['./workers-list.component.css']
})
export class WorkersListComponent implements OnInit {
  workers: IWorkerInterface[] = []; // Define a type for your workers

  constructor(private authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    try {
      const data = await (await this.authService.getAllWorkers()).toPromise();
      this.workers = data as any[];
    } catch (error) {
      console.error('Error fetching workers:', error);
    }
  }
}
