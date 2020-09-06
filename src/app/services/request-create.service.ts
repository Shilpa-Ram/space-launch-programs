import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestCreateService {

  constructor(private http: HttpClient) { }

  apiurl: string = 'http://api.spaceXdata.com/v3/launches';

  getCardsData(): Observable<any> {
    return this.http.get(this.apiurl);
  }

  getFilteredData(querystring: string, data: any): Observable<any> {
    if ((querystring) && (querystring.trim().length >= 0)) {
      querystring = '?' + querystring;
    }
    return this.http.get(this.apiurl + querystring + data);
  }
}
