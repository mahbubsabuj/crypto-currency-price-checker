import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICryptoData } from '../models/crypto.model';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  constructor(private httpClient: HttpClient) {}
  baseURL: string =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';
  getCryptoData(): Observable<ICryptoData[]> {
    return this.httpClient.get<ICryptoData[]>(this.baseURL, {});
  }
}
