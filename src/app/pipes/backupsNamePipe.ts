import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    standalone: true,
    name: 'backupName'
})
export class BackupNamePipe implements PipeTransform {
    transform(name: string, db: boolean = false): string {
        let parts = name.split('_');
        let i = db ? 1 : 0;
        return parts[i]+' '+parts[i+1];
    }
}