import { Component, OnInit } from '@angular/core';
import { ICryptoData } from './models/crypto.model';
import { CryptoService } from './services/crypto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title: string = 'Crypto Price Checker';
  cryptoData?: ICryptoData[];
  constructor(private cryptoAPI : CryptoService) {}
  ngOnInit(): void {
    this.cryptoAPI.getCryptoData().subscribe({
      next: (response: ICryptoData[]) => {
        console.log(response);
        this.cryptoData = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
