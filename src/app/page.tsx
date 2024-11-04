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
import { AnalysisResult } from "@/types/patentModel";

const Home = () => {
  const [patentId, setPatentId] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState<{
    check: boolean;
    save: boolean;
    history: boolean;
    createTable: boolean;
  }>({
    check: false,
    save: false,
    history: false,
    createTable: true,
  });
  const [status, setStatus] = useState<{
    type: string;
    message: string;
  } | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);

  useEffect(() => {
    if (loading.createTable) {
      initTable();
    }
  }, [loading.createTable]);

  const initTable = async () => {
    setLoading((prev) => ({ ...prev, createTable: true }));
    try {
      await createTable();
    } catch (error) {
      setStatus(setError((error as Error).message || "Something went wrong."));
    } finally {
      setLoading((prev) => ({ ...prev, createTable: false }));
    }
  };

  const handleCheck = async () => {
    if (!patentId || !companyName) {
      setStatus(setError("Both Patent ID and Company Name are required."));
      return;
    }

    setLoading((prev) => ({ ...prev, check: true }));
    setStatus(null);
    setResult(null);
    setHistory([]);

    try {
      const data = await fetchInfringementData(patentId, companyName);
      setResult(data);
    } catch (error) {
      setStatus(setError((error as Error).message || "Something went wrong."));
    } finally {
      setLoading((prev) => ({ ...prev, check: false }));
    }
  };

  const handleHistory = async () => {
    setLoading((prev) => ({ ...prev, history: true }));
    setStatus(null);
    setResult(null);
    setHistory([]);

    try {
      const data = await fetchInfringementHistory();
      setHistory(data);
    } catch (error) {
      setStatus(setError((error as Error).message || "Something went wrong."));
    } finally {
      setLoading((prev) => ({ ...prev, history: false }));
    }
  };

  const handleSave = async () => {
    if (!result) {
      setStatus(setError("No results to save."));
      return;
    }

    setHistory([]);
    setLoading((prev) => ({ ...prev, save: true }));
    setStatus(null);

    try {
      await saveInfringementResult(result);
      setStatus(setSuccess("Save successful!"));
    } catch (error) {
      setStatus(setError((error as Error).message || "Something went wrong."));
    } finally {
      setLoading((prev) => ({ ...prev, save: false }));
    }
  };

  return (
    <div className="container">
      <h1 className="title">Patent Infringement Checker</h1>
      <Form
        patentId={patentId}
        setPatentId={setPatentId}
        companyName={companyName}
        setCompanyName={setCompanyName}
        handleCheck={handleCheck}
        handleSave={handleSave}
        handleHistory={handleHistory}
        loading={loading}
        result={result}
      />
      {status && <p className={`status ${status.type}`}>{status.message}</p>}
      {loading.check && <Spinner />}
      {result && !loading.check && <ResultProducts result={result} />}
      {history.length > 0 && !loading.history && (
        <div className="history">
          {history.map((itemResult, index) => (
            <ResultProducts key={index} result={itemResult} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
