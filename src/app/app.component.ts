import { Component, OnInit } from '@angular/core';
import { ICryptoData } from './models/crypto.model';
import { CryptoService } from './services/crypto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string = 'Crypto Price Checker';
  cryptoData?: ICryptoData[];
  currentPageData?: ICryptoData[];
  currentPage: number = 0;
  count: number = 0;
  term: string = '';
  constructor(private cryptoAPI: CryptoService) {}

  ngOnInit(): void {
    console.log(this.count);
    if (!this.cryptoData) {
      this.cryptoAPI.getCryptoData().subscribe({
        next: (response: ICryptoData[]) => {
          console.log(response);
          this.cryptoData = response;
          this.currentPageData = this.cryptoData.slice(0, 5);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
  goRight() {
    if (this.currentPage != 19) {
      ++this.currentPage;
      this.setCurrentPageData();
    }
  }
  goLeft() {
    if (this.currentPage != 0) {
      --this.currentPage;
      this.setCurrentPageData();
    }
  }
  setCurrentPageData() {
    this.currentPageData = this.cryptoData?.slice(
      this.currentPage * 5,
      this.currentPage * 5 + 5
    );
  }
  handleTermSubmit() {
    if (this.term.length === 0) {
      this.setCurrentPageData();
    } else {
      const filtered: ICryptoData[] | undefined = this.cryptoData?.filter(
        (data) =>
          data.name.toLowerCase().substring(0, this.term.length) ===
          this.term.toLocaleLowerCase()
      );
      if (filtered) {
        this.currentPageData = filtered;
      }
    }
  }
  resetTerm() {
    this.setCurrentPageData();
    this.term = '';
  }
}
