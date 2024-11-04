import { AnalysisResult } from "@/types/patentModel";
import React from "react";

type FormProps = {
  patentId: string;
  setPatentId: (value: string) => void;
  companyName: string;
  setCompanyName: (value: string) => void;
  handleCheck: () => void;
  handleSave: () => void;
  handleHistory: () => void;
  loading: {
    check: boolean;
    save: boolean;
    history: boolean;
    createTable: boolean;
  };
  result: AnalysisResult | null;
};

const Form: React.FC<FormProps> = ({
  patentId,
  setPatentId,
  companyName,
  setCompanyName,
  handleCheck,
  handleSave,
  handleHistory,
  loading,
  result,
}) => (
  <div className="form">
    <input
      type="text"
      placeholder="Patent ID"
      value={patentId}
      onChange={(e) => setPatentId(e.target.value)}
      className="input"
    />
    <input
      type="text"
      placeholder="Company Name"
      value={companyName}
      onChange={(e) => setCompanyName(e.target.value)}
      className="input"
    />
    <button
      onClick={handleCheck}
      className="button"
      disabled={loading.check || loading.createTable}
    >
      {loading.check ? "Checking..." : "Check Infringement"}
    </button>
    <button
      onClick={handleSave}
      className="button button-save"
      disabled={loading.save || !result || loading.check || loading.createTable}
    >
      {loading.save ? "Saving..." : "Save"}
    </button>
    <button
      onClick={handleHistory}
      className="button button-history"
      disabled={loading.history || loading.check || loading.createTable}
    >
      {loading.history ? "Loading History..." : "History"}
    </button>
  </div>
);

export default Form;
