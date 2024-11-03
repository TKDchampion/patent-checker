import { FC } from "react";
import { Props } from "./model";
import "./styles.css";

const ProductItem: FC<Props> = ({ product }) => {
  return (
    <div className="product">
      <h3>Product: {product.product_name}</h3>
      <p>
        <strong>Infringement Likelihood:</strong>{" "}
        {product.infringement_likelihood}%
      </p>
      <p>
        <strong>Relevant Claims:</strong> {product.relevant_claims.join(", ")}
      </p>
      <p>
        <strong>Explanation:</strong> {product.explanation}
      </p>
      <p>
        <strong>Specific Features:</strong>{" "}
        {product.specific_features.join(", ")}
      </p>
    </div>
  );
};

export default ProductItem;
