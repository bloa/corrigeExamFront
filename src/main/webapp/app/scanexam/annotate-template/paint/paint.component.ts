import { Component, Input } from '@angular/core';
import { IExam } from '../../../entities/exam/exam.model';
import { Subject } from 'rxjs';
import { EventHandlerService } from './event-handler.service';
import { QuestionpropertiesviewComponent } from './questionpropertiesview/questionpropertiesview.component';
import { GraphicalToolbarComponent } from './toolbar/toolbar.component';
import { TranslateDirective } from '../../../shared/language/translate.directive';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ButtonDirective } from 'primeng/button';
import { FabricCanvasComponent } from './fabric-canvas/fabric-canvas.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'jhi-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    FabricCanvasComponent,
    ButtonDirective,
    FaIconComponent,
    TranslateDirective,
    GraphicalToolbarComponent,
    QuestionpropertiesviewComponent,
  ],
})
export class PaintComponent {
  @Input()
  content: any;
  @Input()
  exam?: IExam;

  numero = new Subject<string>();

  constructor(public eventHandlerService: EventHandlerService) {}

  previousState(): void {
    window.history.back();
  }

  updateNumero(numero: string): void {
    this.numero.next(numero);
  }
}
