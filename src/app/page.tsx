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
import useLoadingStore from "@/store/useLoading";

const Home = () => {
  const [patentId, setPatentId] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [status, setStatus] = useState<{
    type: string;
    message: string;
  } | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);

  const { isCheck, isSave, isHistory, isCreateTable, setLoading } =
    useLoadingStore();

  useEffect(() => {
    if (isCreateTable) {
      initTable();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateTable]);

  const initTable = async () => {
    setLoading("isCreateTable", true);
    try {
      await createTable();
    } catch (error) {
      setStatus(setError((error as Error).message || "Something went wrong."));
    } finally {
      setLoading("isCreateTable", false);
    }
  };

  const handleCheck = async () => {
    if (!patentId || !companyName) {
      setStatus(setError("Both Patent ID and Company Name are required."));
      return;
    }

    setLoading("isCheck", true);
    setStatus(null);
    setResult(null);
    setHistory([]);

    try {
      const data = await fetchInfringementData(patentId, companyName);
      setResult(data);
    } catch (error) {
      setStatus(setError((error as Error).message || "Something went wrong."));
    } finally {
      setLoading("isCheck", false);
    }
  };

  const handleHistory = async () => {
    setLoading("isHistory", true);
    setStatus(null);
    setResult(null);
    setHistory([]);

    try {
      const data = await fetchInfringementHistory();
      setHistory(data);
    } catch (error) {
      setStatus(setError((error as Error).message || "Something went wrong."));
    } finally {
      setLoading("isHistory", false);
    }
  };

  const handleSave = async () => {
    if (!result) {
      setStatus(setError("No results to save."));
      return;
    }

    setHistory([]);
    setLoading("isSave", true);
    setStatus(null);

    try {
      await saveInfringementResult(result);
      setStatus(setSuccess("Save successful!"));
    } catch (error) {
      setStatus(setError((error as Error).message || "Something went wrong."));
    } finally {
      setLoading("isSave", false);
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
        loading={{
          check: isCheck,
          save: isSave,
          history: isHistory,
          createTable: isCreateTable,
        }}
        result={result}
      />
      {status && <p className={`status ${status.type}`}>{status.message}</p>}
      {isCheck && <Spinner />}
      {result && !isCheck && <ResultProducts result={result} />}
      {history.length > 0 && !isHistory && (
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
