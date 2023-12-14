import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { EventData } from 'src/app/helpers/EventData';
import { EventBusService } from 'src/app/helpers/event.service';
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
  selectedBackup: string = '';

  constructor(
    private mainService: MainService,
    private namePipe: BackupNamePipe,
    private snackbar: MatSnackBar,
    private eventBusService: EventBusService
  ) {}

  ngOnInit() {
    this.loadBackups();
  }

  loadBackups() {
    this.loading = true;
    this.mainService.getFileBackups()
    .subscribe({
      next: (response: BackupsResponse) => {
        this.backupsList = [];
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
        if (error.status === 403)
          this.eventBusService.emit(new EventData('logout', null));

        this.snackbar.open('ERROR retrieving the backups', 'OK')
        this.loading = false;
      }
    })
  }

  enterBackup(name: string) {
    this.selectedBackup = name;
    this.enterFolder('');
  }

  enterFolder(name: string) {
    this.loading = true;
    let dir = this.path;
    dir += !!this.path && !!name ? '/' : '';
    dir += !!name ? name : '';

    this.mainService.getFiles(this.selectedBackup, dir)
    .subscribe({
      next: (response: BackupsResponse) => {
        this.filesList = [];
        response.data.forEach(e => {
          let el: BackupFile = {
            name: e.slice(-1) === '/' ? e.slice(0,e.length-1) : e,
            path: this.path,
            isDir: e.slice(-1) === '/'
          }
          this.filesList.push(el);
        });

        this.path = dir;

        this.dataSource = new MatTableDataSource(this.filesList);
        this.loading = false;

      },
      error: (error) => {
        if (error.status === 403)
          this.eventBusService.emit(new EventData('logout', null));

        this.snackbar.open('ERROR retrieving the folder', 'OK');
        this.loading = false;
      }
    })
  }

  recoverFiles(name: string, isBackup: boolean = false) {
    this.loading = true;
    let bck: string = '';
    let dir: string = '';
    let nom: string = '';
    if(isBackup) {
      bck = name;
    }
    else {
      bck = this.selectedBackup;
      dir = this.path;
      nom = name;
    }

    this.mainService.recoverFiles(bck, dir, nom)
    .subscribe({
      next: (response: GenericResponse) => {
        this.snackbar.open('Backup recovered successfully!', 'OK')
        this.loading = false;
      },
      error: (error) => {
        if (error.status === 403)
          this.eventBusService.emit(new EventData('logout', null));
        
        this.snackbar.open('ERROR recovering backup', 'OK')
        this.loading = false;
      }
    })
  }

  goBack() {
    this.loading = true;
    if(this.path === '') {
      this.selectedBackup = '';
      this.loadBackups();
    }
    else {
      let list = this.path.split('/');
      if(list.length>1) {
        let aux = list.pop();
        if(!!aux) this.path = aux.toString();
      }
      else {
        this.path = '';
      }
      this.enterFolder('');
    }

  }

}
