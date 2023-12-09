import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Backup } from 'src/app/models/backup';
import { BackupsResponse } from 'src/app/models/backupsResponse';
import { BackupNamePipe } from 'src/app/pipes/backupsNamePipe';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-recover-db',
  templateUrl: './recover-db.component.html',
  styleUrls: ['./recover-db.component.scss']
})
export class RecoverDbComponent implements OnInit {

  backupsList: Backup[] = [];
  loading = false;

  constructor(
    private mainService: MainService,
    private namePipe: BackupNamePipe,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadBackups();
  }

  loadBackups() {
    this.loading = true;
    this.mainService.getDbBackups()
    .subscribe({
      next: (response: BackupsResponse) => {
        response.data.forEach((e) => {
          let el: Backup = {
            code: e,
            name: this.namePipe.transform(e, true)
          }
          this.backupsList.push(el);
        });

        this.loading = false;
      },
      error: (error) => {
        this.snackbar.open('ERROR retrieving the backups', 'OK')
        this.loading = false;
      }
    })
  }

}
