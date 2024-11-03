import { FC } from "react";
import { Props } from "./model";
import ProductItem from "../ProductItem";
import "./styles.css";

const ResultProducts: FC<Props> = ({ result }) => {
  return (
    <div className="resultContainer">
      <h2 className="resultTitle">Infringement Analysis Results</h2>
      <div className="resultSection">
        <h3>Patent ID: {result.patent_id}</h3>
        <h3>Company Name: {result.company_name}</h3>
        <h3>Analysis Date: {result.analysis_date}</h3>
      </div>

      {result.top_infringing_products?.map((product, index) => (
        <ProductItem key={index} product={product} />
      ))}

      <p className="overallRisk">
        <strong>Overall Risk Assessment:</strong>
        {result.overall_risk_assessment}
      </p>
    </div>
  );
};

export default ResultProducts;
