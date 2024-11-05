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
      initTable();
    }
  }, [isCreateTable]);

  const initTable = async () => {
    setLoading("isCreateTable", true);

    try {
      await createTable();
      resetLoading();
    } catch (error) {
      setStatus(setError((error as Error).message || "Failed to createTable."));
    } finally {
      setLoading("isCreateTable", false);
    }
  };

  const handleCheck = async () => {
    setLoading("isCheck", true);

    if (!patentId || !companyName) {
      setStatus(setError("Both Patent ID and Company Name are required."));
      return;
    }

    try {
      const data = await fetchInfringementData(patentId, companyName);
      resetLoading();
      setHistory([]);
      setResult(data);
    } catch (error) {
      setStatus(
        setError((error as Error).message || "Failed to fetchInfringementData.")
      );
    } finally {
      setLoading("isCheck", false);
    }
  };

  const handleHistory = async () => {
    setLoading("isHistory", true);

    try {
      const data = await fetchInfringementHistory();
      resetLoading();
      setHistory(data);
    } catch (error) {
      setStatus(
        setError((error as Error).message || "Failed to fetchInfringementData.")
      );
    } finally {
      setLoading("isHistory", false);
    }
  };

  const handleSave = async () => {
    if (!result) {
      setStatus(setError("No results to save."));
      return;
    }

    setLoading("isSave", true);

    try {
      await saveInfringementResult(result);
      setHistory([]);
      setStatus(setSuccess("Save successful!"));
    } catch (error) {
      setStatus(
        setError(
          (error as Error).message || "Failed to save infringement data."
        )
      );
    } finally {
      setLoading("isSave", false);
    }
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
