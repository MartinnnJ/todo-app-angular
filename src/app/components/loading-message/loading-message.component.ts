import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-message',
  templateUrl: './loading-message.component.html',
  styleUrl: './loading-message.component.css'
})
export class LoadingMessageComponent {
  @Input() statusCode!: number | null;
  @Input() statusText!: string | null;
  @Input() errorMessage!: string | null;
}
