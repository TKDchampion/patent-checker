import React from "react";
import useLoadingStore from "@/store/useLoading";
import { FormProps } from "./model";

const Form: React.FC<FormProps> = ({
  patentId,
  setPatentId,
  companyName,
  setCompanyName,
  handleCheck,
  handleSave,
  handleHistory,
}) => {
  const { isCheck, isSave, isHistory, isCreateTable, result } =
    useLoadingStore();

  return (
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
        disabled={isCheck || isCreateTable}
      >
        {isCheck ? "Checking..." : "Check Infringement"}
      </button>
      <button
        onClick={handleSave}
        className="button button-save"
        disabled={isSave || !result || isCheck || isCreateTable}
      >
        {isSave ? "Saving..." : "Save"}
      </button>
      <button
        onClick={handleHistory}
        className="button button-history"
        disabled={isHistory || isCheck || isCreateTable}
      >
        {isHistory ? "Loading History..." : "History"}
      </button>
    </div>
  );
};

export default Form;
