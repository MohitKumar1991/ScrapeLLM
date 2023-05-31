export enum ActionType {
  AddCompany = 'Add a new Company',
  WriteEmail = 'Write an Email',
}

export interface Company {
  company: string;
  website: string;
  status: string;
  timestamp?:string;
}