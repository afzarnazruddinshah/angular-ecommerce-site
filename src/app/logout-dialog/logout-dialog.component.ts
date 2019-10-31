import { Component, OnInit } from '@angular/core';

import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LogoutData } from '../dialog-data';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.css']
})
export class LogoutDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LogoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LogoutData,
    public _authService : AuthService) {}
 
  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  logout()
  {
      this._authService.logoutUser();
  }



}
