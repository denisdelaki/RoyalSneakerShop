import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' = 'info';
  show: boolean = false;

  showToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.message = message;
    this.type = type;
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, 3000);
  }

  ngOnInit(): void {
    console.log(this.message);
  }
}
