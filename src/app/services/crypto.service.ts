import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICryptoData } from '../models/crypto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  constructor(private httpClient: HttpClient) {}
  getCryptoData(): Observable<ICryptoData[]> {
    return this.httpClient.get<ICryptoData[]>(environment.baseURL, {});
  }
}
