"use client";
import { useState } from "react";
import { AnalysisResult } from "./api/checkInfringement/model";
import "./page.css";
import Spinner from "./components/Spinner";
import ResultProducts from "./components/ResultProducts";
import Form from "./components/Form";
import { setError } from "@/utils/status";
import { fetchInfringementData } from "@/utils/services";

const Home = () => {
  const [patentId, setPatentId] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState<{
    check: boolean;
    save: boolean;
    history: boolean;
  }>({
    check: false,
    save: false,
    history: false,
  });
  const [status, setStatus] = useState<{
    type: string;
    message: string;
  } | null>(null);

  const handleCheck = async () => {
    if (!patentId || !companyName) {
      setStatus(setError("Both Patent ID and Company Name are required."));
      return;
    }

    setLoading((prev) => ({ ...prev, check: true }));
    setStatus(null);
    setResult(null);

    try {
      const data = await fetchInfringementData(patentId, companyName);
      setResult(data);
    } catch (error) {
      setStatus(setError((error as Error).message || "Something went wrong."));
    } finally {
      setLoading((prev) => ({ ...prev, check: false }));
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
        loading={loading}
      />
      {status && <p className={`status ${status.type}`}>{status.message}</p>}
      {loading.check && <Spinner />}
      {result && !loading.check && <ResultProducts result={result} />}
    </div>
  );
};

export default Home;
