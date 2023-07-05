export interface Morass {
  id?: number,
  codeFonc?: string;
  codeEco?: string;
  prog?: string;
  reg?: string;
  proj?: string;
  lig?: string;
  type?:string;
  rubriques?:string;
  creditsDePaiemant?: string;
  pays?: string;
  annee?: string;
}

export interface ResMorass{
  total: number;
  success?: boolean;
  budgetaires:Morass[]
}
export interface ResMorasses{
  success?: boolean;
  budgetaires:Morass[]
}
export interface ResOneMorass {
  success?: boolean;
  budgetaire: Morass;
}
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  // nextPage: number;
}

