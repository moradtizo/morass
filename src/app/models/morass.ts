export interface Morass {
  id?: number,
  codeFonc?: number;
  codeEco?: number;
  prog?: number;
  reg?: number;
  proj?: number;
  lig?: string;
  type?:string;
  rubriques?:string;
  creditsDePaiemant?: number;
  pays?: string;
  annee?: number;
}

export interface ResMorass{
  success?: boolean;
  budgetairesLst:Morass[]
}
