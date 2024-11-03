import { FC } from "react";
import "./styles.css";

const Spinner: FC = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
