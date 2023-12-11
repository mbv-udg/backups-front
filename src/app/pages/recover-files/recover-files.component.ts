import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Backup } from 'src/app/models/backup';
import { BackupFile } from 'src/app/models/backupFile';
import { BackupsResponse } from 'src/app/models/backupsResponse';
import { GenericResponse } from 'src/app/models/genericResponse';
import { BackupNamePipe } from 'src/app/pipes/backupsNamePipe';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-recover-files',
  templateUrl: './recover-files.component.html',
  styleUrls: ['./recover-files.component.scss']
})
export class RecoverFilesComponent implements OnInit  {

  backupsList: Backup[] = [];
  displayColumns = ['date','actions'];
  dataSource: any;
  loading = false;

  filesList: BackupFile[] = [];
  path: string = '';

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
    this.mainService.getFileBackups()
    .subscribe({
      next: (response: BackupsResponse) => {
        response.data.forEach((e) => {
          let el: Backup = {
            code: e,
            name: this.namePipe.transform(e)
          }
          this.backupsList.push(el);
        });

        this.dataSource = new MatTableDataSource(this.backupsList);

        this.loading = false;
      },
      error: (error) => {
        this.snackbar.open('ERROR retrieving the backups', 'OK')
        this.loading = false;
      }
    })
  }

  enterFolder(name: string) {
    
  }

  recoverFiles(name: string) {
    this.loading = true;
    this.mainService.recoverFiles(name, '', '')
    .subscribe({
      next: (response: GenericResponse) => {
        this.snackbar.open('Backup recovered successfully!', 'OK')
        this.loading = false;
      },
      error: (error) => {
        this.snackbar.open('ERROR recovering backup', 'OK')
        this.loading = false;
      }
    })
  }


}
