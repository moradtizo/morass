import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Departement, ResDepar, ResDepars } from 'src/app/models/departement';
import { DepartementService } from 'src/app/service/departement.service';
import { PopUpService } from '../tables-data/services/pop-up.service';

@Component({
  selector: 'app-tables-general',
  templateUrl: './tables-general.component.html',
  styleUrls: ['./tables-general.component.css']
})
export class TablesGeneralComponent implements OnInit {

  search : string = ''
  departement: Departement[] = [];

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  fileSelected: boolean = false;
  selectedFile: File | null = null;

  uploadProgress: number = 0;

  constructor(private elementRef: ElementRef,private departementService:DepartementService,private router: Router,private popupService: PopUpService) { }

  ngOnInit(): void {
    this.getDepartement()
  }

  formatCode(code?: number): string {
    if (code === undefined) {
      return '';
    }
    return code.toString().padStart(2, '0');
  }

formatNumberWithSpaces(number?: number): string {
  if (number === undefined) {
    return '';
  }

  if (number === 0) {
    return '-';
  }

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

  getDepartement(){
    this.departementService.getDeparts().subscribe((res:ResDepar)=> {

        this.departement = res.departements
    })
    console.log(this.departement);
  }

  downloadTemplate() {
    this.departementService.downloadExcel().subscribe(blob => {
      this.departementService.saveExcelFile(blob, 'Departement_Template.xlsx');
    }, error => {
      console.error(error);
    });
  }

  searchDepartement(){
    this.departementService.searchDepart(this.search).subscribe(({success,departements}:ResDepars)=>{
      if (success) {
        this.departement= departements
      }
      console.log(departements,'search here')
    })
  }
  destroyDepartement(id: string) {
    const confirmation = window.confirm('Are you sure you want to delete this item?');

    if (confirmation) {
      this.departementService.deleteDepart(id).subscribe(res => {
        this.departement = res.departements;
        this.getDepartement();
      });
    }
  }

}
