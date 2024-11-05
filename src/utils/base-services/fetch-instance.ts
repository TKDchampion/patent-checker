import { ApiConfig, FetchConfig, Method, RenderType } from "./model";
import { storageGet } from "../storage";
import { isApiError } from "@/utils/isApiError";

const errorHandle = (status: number, msg: string) => {
  console.log(`api error: ${status} | ${msg}`);
  switch (status) {
    case 401:
      // window.location.href = "/login"
      break;
    default:
      break;
  }
  return false;
};

export default async function fetchInstance<
  T,
  E = { status: number; message: string }
>(apiconfig: ApiConfig, method: Method, renderType?: RenderType): Promise<T> {
  const token = storageGet("token");

  const baseURL = apiconfig.baseConfig?.baseURL
    ? apiconfig.baseConfig.baseURL
    : process.env["NEXT_PUBLIC_URL"];

  const fetchConfig: FetchConfig = {
    method: method,
    headers: apiconfig.baseConfig?.headers
      ? apiconfig.baseConfig.headers
      : {
          Authorization: `Bearer ${token}`,
        },
  };

  if (apiconfig.body) {
    const isFormData = apiconfig.body instanceof FormData;
    if (isFormData) {
      fetchConfig["body"] = apiconfig.body as FormData;
    } else {
      fetchConfig["body"] = JSON.stringify(apiconfig.body);
      fetchConfig["headers"] = {
        ...fetchConfig["headers"],
        "Content-Type": "application/json",
      };
    }
  }

  if (renderType) {
    switch (renderType) {
      case "ISR":
        fetchConfig["next"] = { revalidate: 5 };
        break;
      case "SSG":
        fetchConfig["cache"] = "force-cache";
        break;
      case "SSR":
        fetchConfig["cache"] = "no-store";
        break;
    }
  }

  const controller = new AbortController();
  const { signal } = controller;
  const timeout = 1000 * 30; // 30 seconds
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject({ status: 408, message: "Request timed out" } as E);
    }, timeout);
  });

  try {
    const apiUrlprefix = baseURL
      ? `${baseURL}/${apiconfig.url}`
      : apiconfig.url;
    const response = await Promise.race([
      fetch(apiUrlprefix, { ...fetchConfig, signal }),
      timeoutPromise,
    ]);

    if (!(response instanceof Response)) {
      throw { status: 500, message: "Unexpected response type" } as E;
    }

    const respText = await response.text();
    if (!response.ok) {
      errorHandle(response.status, respText);
      throw { status: response.status, message: JSON.parse(respText) } as E;
    }

    if (respText) {
      const result = JSON.parse(respText) as T;
      return result;
    } else {
      return {
        status: response.status,
        message: "Request was successful but no data returned",
      } as unknown as T;
    }
  } catch (error: unknown) {
    if (isApiError(error) && error.status === 408) {
      controller.abort();
    }
    throw error;
  }
}
