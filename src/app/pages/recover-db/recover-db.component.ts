import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { EventData } from 'src/app/helpers/EventData';
import { EventBusService } from 'src/app/helpers/event.service';
import { Backup } from 'src/app/models/backup';
import { BackupsResponse } from 'src/app/models/backupsResponse';
import { GenericResponse } from 'src/app/models/genericResponse';
import { BackupNamePipe } from 'src/app/pipes/backupsNamePipe';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-recover-db',
  templateUrl: './recover-db.component.html',
  styleUrls: ['./recover-db.component.scss']
})
export class RecoverDbComponent implements OnInit {

  backupsList: Backup[] = [];
  displayColumns = ['date','actions'];
  dataSource: any;
  loading = false;

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
    this.mainService.getDbBackups()
    .subscribe({
      next: (response: BackupsResponse) => {
        this.backupsList = [];
        response.data.forEach((e) => {
          let el: Backup = {
            code: e,
            name: this.namePipe.transform(e, true)
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

  recoverDb(name: string) {
    this.loading = true;
    this.mainService.recoverDb(name)
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

}
