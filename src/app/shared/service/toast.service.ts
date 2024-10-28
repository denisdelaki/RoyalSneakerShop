import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) {}

  showToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const config: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: type
    };
    this.snackBar.open(message, 'Close', config);
  }
}

