import {
  Company,
  Patent,
  ResultObject,
} from "@/app/api/checkInfringement/model";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getInfringementAnalysis(
  patent: Patent,
  company: Company
) {
  try {
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

    Ensure the output strictly adheres to the following JSON format:
    {
        "array": [
            {
                "product_name": "value",
                "infringement_likelihood": "value",
                "relevant_claims": ["value"],
                "explanation": "value",
                "specific_features": ["value"]
            },
            {
                "product_name": "value",
                "infringement_likelihood": "value",
                "relevant_claims": ["value"],
                "explanation": "value",
                "specific_features": ["value"]
            }
        ],
        "overall_risk_assessment": "text"
    }
    `;

    const groqai = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
    });
    return transformToObject(groqai.choices[0].message.content as string);
  } catch (error) {
    console.error("Groq API 請求失敗:", error);
    throw new Error("Groq API 請求失敗");
  }
}

function transformToObject(inputString: string): ResultObject {
  const jsonMatch = inputString.match(/{[\s\S]*}/);
  if (!jsonMatch) {
    throw new Error("No valid JSON found in input string.");
  }
  const jsonObject = JSON.parse(jsonMatch[0]);
  const result: ResultObject = {
    top_infringing_products: jsonObject.array,
    overall_risk_assessment: jsonObject.overall_risk_assessment,
  };

  return result;
}
