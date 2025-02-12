import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IQuestion } from '../question.model';
import { QuestionService } from '../service/question.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AlertErrorComponent } from '../../../shared/alert/alert-error.component';
import { TranslateDirective } from '../../../shared/language/translate.directive';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  templateUrl: './question-delete-dialog.component.html',
  standalone: true,
  imports: [NgIf, FormsModule, TranslateDirective, AlertErrorComponent, FaIconComponent],
})
export class QuestionDeleteDialogComponent {
  question?: IQuestion;

  constructor(
    protected questionService: QuestionService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.questionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
