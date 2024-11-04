/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import "./page.css";
import Spinner from "./components/Spinner";
import ResultProducts from "./components/ResultProducts";
import Form from "./components/Form";
import { setError, setSuccess } from "@/utils/status";
import {
  createTable,
  fetchInfringementData,
  fetchInfringementHistory,
  saveInfringementResult,
} from "@/utils/services";
import useLoadingStore from "@/store/useLoading";
import { AnalysisResult } from "@/types/patentModel";
import asyncHandler from "@/utils/asyncHandler";

const Home = () => {
  const [patentId, setPatentId] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const {
    isCheck,
    isHistory,
    isCreateTable,
    setLoading,
    setStatus,
    status,
    result,
    setResult,
    resetLoading,
  } = useLoadingStore();

  useEffect(() => {
    if (isCreateTable) {
      asyncHandler(createTable, "isCreateTable", {
        setLoading,
        setStatus,
      });
      resetLoading();
    }
  }, [isCreateTable]);

  const handleCheck = async () => {
    if (!patentId || !companyName) {
      setStatus(setError("Both Patent ID and Company Name are required."));
      return;
    }

    const data = await asyncHandler(
      () => fetchInfringementData(patentId, companyName),
      "isCheck",
      { setLoading, setStatus }
    );
    resetLoading();
    setHistory([]);
    if (data) setResult(data);
  };

  const handleHistory = async () => {
    const data = await asyncHandler(fetchInfringementHistory, "isHistory", {
      setLoading,
      setStatus,
    });
    resetLoading();
    if (data) setHistory(data);
  };

  const handleSave = async () => {
    if (!result) {
      setStatus(setError("No results to save."));
      return;
    }
    await asyncHandler(() => saveInfringementResult(result), "isSave", {
      setLoading,
      setStatus,
    });
    setHistory([]);
    setStatus(setSuccess("Save successful!"));
  };

  return (
    <div className="container">
      <h1 className="title">Patent Infringement Checker</h1>
      <Form
        patentId={patentId}
        companyName={companyName}
        setPatentId={setPatentId}
        setCompanyName={setCompanyName}
        handleCheck={handleCheck}
        handleSave={handleSave}
        handleHistory={handleHistory}
      />
      {status && <p className="status">{status.message}</p>}
      {isCheck && <Spinner />}
      {result && !isCheck && <ResultProducts result={result} />}
      {history.length > 0 && !isHistory && (
        <>
          <div>
            <h2>-- History List --</h2>
          </div>
          <div className="history">
            {history.map((itemResult, index) => (
              <ResultProducts key={index} result={itemResult} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
