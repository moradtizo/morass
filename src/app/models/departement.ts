export interface Departement {
  id?: number,
  codeDprt?: number,
  nomDprt?: string,
  crdPersonnel?: number,
  crdMateriel?: number,
  crdPaiement?: number,
  crdEngagement?: number,
}

export interface ResDepar{
  success?: boolean;
  departements:Departement[]
}

export interface ResDepars{
  success?: boolean;
  departements:Departement[]
}

export interface ResOneDepar{
  success?: boolean;
  departement:Departement
}




