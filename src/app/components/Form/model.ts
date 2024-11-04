export interface FormProps {
  patentId: string;
  companyName: string;
  setPatentId: (value: string) => void;
  setCompanyName: (value: string) => void;
  handleCheck: () => void;
  handleSave: () => void;
  handleHistory: () => void;
}
