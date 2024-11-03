import React from "react";

type FormProps = {
  patentId: string;
  setPatentId: (value: string) => void;
  companyName: string;
  setCompanyName: (value: string) => void;
  handleCheck: () => void;
  loading: { check: boolean; save: boolean; history: boolean };
};

const Form: React.FC<FormProps> = ({
  patentId,
  setPatentId,
  companyName,
  setCompanyName,
  handleCheck,
  loading,
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
    <button onClick={handleCheck} className="button" disabled={loading.check}>
      {loading.check ? "Checking..." : "Check Infringement"}
    </button>
  </div>
);

export default Form;
