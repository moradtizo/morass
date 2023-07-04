import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Morass, ResMorass, ResMorasses } from 'src/app/models/morass';
import { MorassService } from 'src/app/service/morass.service';
import { PopUpService } from './services/pop-up.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-tables-data',
  templateUrl: './tables-data.component.html',
  styleUrls: ['./tables-data.component.css']
})
export class TablesDataComponent implements OnInit {
  search : string = ''
  morass: Morass[] = [];

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  fileSelected: boolean = false;
  selectedFile: File | null = null;

  uploadProgress: number = 0;


  constructor(private elementRef: ElementRef,private morassService:MorassService,private router: Router,private popupService: PopUpService) { }

  ngOnInit(): void {
    this.getMorass()
    // var s = document.createElement("script");
    // s.type = "text/javascript";
    // s.src = "../assets/js/main.js";
    // this.elementRef.nativeElement.appendChild(s);
  }

getMorass(){
  this.morassService.getMorasses().subscribe((res:ResMorass)=> {

      this.morass = res.budgetaires

    // console.log(res);
  })

}
downloadTemplate() {
  this.morassService.downloadExcel().subscribe(blob => {
    this.morassService.saveExcelFile(blob, 'Budgetaire_Template.xlsx');
  }, error => {
    console.error(error);
  });
}

  searchMorasse(){
    this.morassService.searchMorasse(this.search).subscribe(({success,budgetaires}:ResMorasses)=>{
      if (success) {
        this.morass= budgetaires
      }
      console.log(budgetaires,'search here')
    })
  }
  destroyMorass(id: string) {
    const confirmation = window.confirm('Are you sure you want to delete this item?');

    if (confirmation) {
      this.morassService.deleteMorass(id).subscribe(res => {
        this.morass = res.budgetaires;
        this.getMorass();
      });
    }
  }


  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.fileSelected = true;
      this.selectedFile = event.dataTransfer.files[0];
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileSelected = true;
      this.selectedFile = input.files[0];
    }
  }

  browseFile() {
    this.fileInput.nativeElement.click();
  }

  uploadFile() {
    if (this.selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        const target = e.target as FileReader;
        if (target && target.result) {
          const data = new Uint8Array(target.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          const jsonData: unknown[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          // Assuming the required information is in specific cells/columns
          const pays: string = jsonData[1][0] as string;
          const annee: string = jsonData[1][1] as string;
          const codeFonc: string = jsonData[1][2] as string;
          const codeEco: string = jsonData[1][3] as string;
          const prog: string = jsonData[1][4] as string;
          const reg: string = jsonData[1][5] as string;
          const proj: string = jsonData[1][6] as string;
          const type: string = jsonData[1][7] as string;
          const lig: string = jsonData[1][8] as string;
          const rubriques: string = jsonData[1][9] as string;
          const creditsDePaiemant: string = jsonData[1][10] as string;

          const formData = new FormData();
          formData.append('pays', pays);
          formData.append('annee', annee);
          formData.append('codeFonc', codeFonc);
          formData.append('codeEco', codeEco);
          formData.append('prog', prog);
          formData.append('reg', reg);
          formData.append('proj', proj);
          formData.append('type', type);
          formData.append('lig', lig);
          formData.append('rubriques', rubriques);
          formData.append('creditsDePaiemant', creditsDePaiemant);
          formData.append('file', this.selectedFile as Blob);

          this.popupService.uploadEmployees(formData).subscribe(
            (response: any) => {
              console.log('File uploaded successfully.');
              this.fileSelected = false;
              this.selectedFile = null;
              // Add any additional logic here if needed
            },
            (error: any) => {
              console.error('Error uploading employees:', error);
            }
          );

        }
      };

      fileReader.readAsArrayBuffer(this.selectedFile);
    } else {
      console.log('No file selected.');
    }
  }




  clearPopupData() {
    this.selectedFile = null;
    this.fileSelected = false;
  }



}
