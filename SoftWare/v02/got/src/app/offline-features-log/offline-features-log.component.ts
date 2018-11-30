import { Component, OnInit, Input } from '@angular/core';
import { OfflineFeaturesLogService } from '../offline-features-log.service'

@Component({
  selector: 'app-offline-features-log',
  templateUrl: './offline-features-log.component.html',
  styleUrls: ['./offline-features-log.component.scss']
})

export class OfflineFeaturesLogComponent implements OnInit {
  @Input() comment: string = ''
  constructor(public logService: OfflineFeaturesLogService) { }

  ngOnInit() {
  }

}
