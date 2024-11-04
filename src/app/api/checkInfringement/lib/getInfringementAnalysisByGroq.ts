import Groq from "groq-sdk";
import {
  Company,
  InfringingProduct,
  Patent,
  ResultObject,
} from "@/types/patentModal";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const schema = {
  top_infringing_products: [
    {
      product_name: "string",
      infringement_likelihood: "string",
      relevant_claims: ["string"],
      explanation: "string",
      specific_features: ["string"],
    },
    {
      product_name: "string",
      infringement_likelihood: "string",
      relevant_claims: ["string"],
      explanation: "string",
      specific_features: ["string"],
    },
  ],
  overall_risk_assessment: "string",
};

class InfringementAnalysis implements ResultObject {
  constructor(
    public top_infringing_products: InfringingProduct[],
    public overall_risk_assessment: string
  ) {}
}

export async function getInfringementAnalysisByGroq(
  patent: Patent,
  company: Company
): Promise<InfringementAnalysis> {
  const prompt = `
    Analyze the following patent claims and compare them with the product descriptions.
    Patent Claims: ${patent.claims}
    Company Products: ${company.products
      .map((product) => product.description)
      .join("; ")}

    Identify the top two products that match the claims, detailing which claims are potentially infringed upon. For each product, provide the following details in an array of exactly two objects within the "array" key:

    1. product_name: the name of the infringing product,
    2. infringement_likelihood: the likelihood of infringement, expressed as a percentage,
    3. relevant_claims: an array listing the relevant claim numbers,
    4. explanation: a brief explanation of why this product potentially infringes upon the claims,
    5. specific_features: an array listing specific features of the product that align with the claims.

    Additionally, provide an "overall_risk_assessment" value outside of the array that summarizes the overall infringement risks based on investigation results.
    `;
  const jsonSchema = JSON.stringify(schema, null, 4);
  const chat_completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are an infringement analysis database that outputs data in JSON.\nThe JSON object must use the schema: ${jsonSchema}`,
      },
      {
        role: "user",
        content: `Fetch infringement analysis for ${prompt}`,
      },
    ],
    model: "llama3-8b-8192",
    temperature: 0,
    stream: false,
    response_format: { type: "json_object" },
  });

  // Parse and map the response to InfringementAnalysis type
  return Object.assign(
    new InfringementAnalysis([], ""),
    JSON.parse(chat_completion.choices[0].message.content || "")
  ) as InfringementAnalysis;
}
