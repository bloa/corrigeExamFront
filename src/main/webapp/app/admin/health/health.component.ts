import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { HealthService } from './health.service';
import { Health, HealthDetails, HealthStatus } from './health.model';
import { HealthModalComponent } from './modal/health-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgIf, NgFor, NgClass, KeyValuePipe } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TranslateDirective } from '../../shared/language/translate.directive';

@Component({
  selector: 'jhi-health',
  templateUrl: './health.component.html',
  standalone: true,
  imports: [TranslateDirective, FaIconComponent, NgIf, NgFor, NgClass, KeyValuePipe, TranslateModule],
})
export class HealthComponent implements OnInit {
  health?: Health;

  constructor(
    private modalService: NgbModal,
    private healthService: HealthService,
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  getBadgeClass(statusState: HealthStatus): string {
    if (statusState === 'UP') {
      return 'bg-success';
    }
    return 'bg-danger';
  }

  refresh(): void {
    this.healthService.checkHealth().subscribe({
      next: health => (this.health = health),
      error: (error: HttpErrorResponse) => {
        if (error.status === 503) {
          this.health = error.error;
        }
      },
    });
  }

  showHealth(health: { key: string; value: HealthDetails }): void {
    const modalRef = this.modalService.open(HealthModalComponent);
    modalRef.componentInstance.health = health;
  }
}
