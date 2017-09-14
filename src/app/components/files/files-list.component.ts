import { Component, Input } from '@angular/core'

@Component({
  selector: 'ftp-files-list',
  templateUrl: './files-list.component.html'
})
export class FilesListComponent {
  @Input() private filesList: any[] 
}