import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Morass, ResMorass } from 'src/app/models/morass';
import { MorassService } from 'src/app/service/morass.service';

@Component({
  selector: 'app-tables-data',
  templateUrl: './tables-data.component.html',
  styleUrls: ['./tables-data.component.css']
})
export class TablesDataComponent implements OnInit {
  morass: Morass[] = [];
  constructor(private elementRef: ElementRef,private morassService:MorassService,private router: Router) { }

  ngOnInit(): void {
    this.getMorass()
    // var s = document.createElement("script");
    // s.type = "text/javascript";
    // s.src = "../assets/js/main.js";
    // this.elementRef.nativeElement.appendChild(s);
  }

getMorass(){
  this.morassService.getMorasses().subscribe((res:ResMorass)=> {

      this.morass = res.budgetairesLst

    console.log(res);
  })

}
downloadTemplate() {
  this.morassService.downloadExcel().subscribe(blob => {
    this.morassService.saveExcelFile(blob, 'Budgetaire_Template.xlsx');
  }, error => {
    console.error(error);
  });
}
}
