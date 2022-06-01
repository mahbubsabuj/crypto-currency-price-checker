import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ICryptoData } from './models/crypto.model';
import { CryptoService } from './services/crypto.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface PeriodicElement {
  name: string;
  market_cap_rank: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { market_cap_rank: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { market_cap_rank: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { market_cap_rank: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { market_cap_rank: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { market_cap_rank: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { market_cap_rank: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { market_cap_rank: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { market_cap_rank: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { market_cap_rank: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { market_cap_rank: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title: string = 'Crypto Price Checker';
  displayedColumns: string[] = [
    'market_cap_rank',
    'name',
    'current_price',
    'symbol',
  ];
  dataSource?: any;
  cryptoData?: ICryptoData[];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  constructor(private cryptoAPI: CryptoService) {}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.cryptoAPI.getCryptoData().subscribe({
      next: (response: ICryptoData[]) => {
        console.log(response);
        this.cryptoData = response;
        console.log(this.cryptoData);
        this.dataSource = new MatTableDataSource(this.cryptoData);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  ngAfterViewChild(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

//market_cap_rank -> name -> current_price,
