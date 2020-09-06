import { Component, OnInit, HostListener } from '@angular/core';
import { RequestCreateService } from '../services/request-create.service';
import { Card } from '../models/card.model';

@Component({
  selector: 'app-launch-dashboard',
  templateUrl: './launch-dashboard.component.html',
  styleUrls: ['./launch-dashboard.component.scss']
})
export class LaunchDashboardComponent implements OnInit {

  applicationCards = [];
  missionIds = [];
  public cardObj: Card;
  appSelected = false;
  colSize;
  isCardsAvailable = true;
  launchYearSearch = true;
  successLaunchSearch = true;
  successLandSearch = true;
  title = 'SpaceX Launch Programs';
  constructor(private requestService: RequestCreateService) { }

  ngOnInit(): void {
    this.loadApplicationCards();
  }

  loadApplicationCards() {
    this.requestService.getCardsData().subscribe((res: any) => {
      for (let i = 0; i < res.length; i++) {
        const appNames = res[i].mission_name.split(',');
        const appNumbers = res[i].flight_number + ''.split(',');
        const appMissionId = res[i].mission_id + ''.split(',');
        this.missionIds = appMissionId + ''.split(',');
        const appLaunchYear = res[i].launch_year.split(',');
        const appLaunchSuccess = res[i].launch_success + ''.split(',');
        var appLandSuccess = res[i].rocket.first_stage.cores[0].land_success == null ? 'N/A' : res[i].rocket.first_stage.cores[0].land_success + ''.split(',');

        for (let i = 0; i < appNames.length; i++) {
          this.cardObj = new Card();
          this.cardObj.name = appNames[i];
          this.cardObj.flightNum = appNumbers[i];
          this.cardObj.missionId = (this.missionIds == undefined || this.missionIds == null) ? [] : this.missionIds[i];
          this.cardObj.launchYear = appLaunchYear[i];
          this.cardObj.launchSuccess = appLaunchSuccess[i];
          this.cardObj.landSuccess = appLandSuccess[i];
          this.applicationCards.push(this.cardObj);
        }
      }

      if (this.applicationCards.length > 3) {
        this.colSize = 4;
      } else {
        this.colSize = this.applicationCards.length;
      }

      if (!this.applicationCards.length) {
        this.isCardsAvailable = false;
      } else {
        this.isCardsAvailable = true;
      }

      this.applicationCards.forEach((tItem) => {
        if (tItem.name.trim().length > 30) {
          tItem.name = tItem.name.substring(0, 27) + "...";
        }
      });
    });
  }

  getFilterQueryString() {
    let querystring = '';
    const launchYearSearch = document.getElementById('launchYearSearch');
    const successLaunchSearch = document.getElementById('successLaunchSearch');
    const successLandSearch = document.getElementById('successLandSearch');
    if (launchYearSearch) {
      querystring += 'limit=100&launch_year=';
    } else if (successLaunchSearch) {
      querystring += 'limit=100&launch_success=';
    } else if (successLandSearch) {
      querystring += 'limit=100&land_success=';
    }

    return querystring;
  }

  applyFilter(searchVal: any) {
    const querystring: string = this.getFilterQueryString();
    this.requestService.getFilteredData(querystring, searchVal).subscribe((res: any) => {
     
      for (let i = 0; i < res.length; i++) {
        const appNames = res[i].mission_name.split(',');
        const appNumbers = res[i].flight_number + ''.split(',');
        const appMissionId = res[i].mission_id + ''.split(',');
        this.missionIds = appMissionId + ''.split(',');
        const appLaunchYear = res[i].launch_year.split(',');
        const appLaunchSuccess = res[i].launch_success + ''.split(',');
        var appLandSuccess = res[i].rocket.first_stage.cores[0].land_success == null ? 'N/A' : res[i].rocket.first_stage.cores[0].land_success + ''.split(',');

        for (let i = 0; i < appNames.length; i++) {
          this.cardObj = new Card();
          this.cardObj.name = appNames[i];
          this.cardObj.flightNum = appNumbers[i];
          this.cardObj.missionId = (this.missionIds == undefined || this.missionIds == null) ? [] : this.missionIds[i];
          this.cardObj.launchYear = appLaunchYear[i];
          this.cardObj.launchSuccess = appLaunchSuccess[i];
          this.cardObj.landSuccess = appLandSuccess[i];
          this.applicationCards = res;
          this.applicationCards.push(this.cardObj);
        }
      }
      if (this.applicationCards.length > 3) {
        this.colSize = 4;
      } else {
        this.colSize = this.applicationCards.length;
      }
    });
  }
}
