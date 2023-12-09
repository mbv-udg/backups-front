import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-recover-files',
  templateUrl: './recover-files.component.html',
  styleUrls: ['./recover-files.component.scss']
})
export class RecoverFilesComponent implements OnInit  {

  constructor(
    private mainService: MainService
  ) {}

  ngOnInit() {

  }

}
