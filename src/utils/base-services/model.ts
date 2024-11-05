/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiConfig {
  baseConfig?: BaseConfig;
  body?: Record<string, any> | FormData;
  url: string;
  renderType?: RenderType;
  disabledErrorAlert?: boolean;
}

type RequestHeaders = {
  [key: string]: any;
};

interface BaseConfig {
  headers?: RequestHeaders;
  baseURL?: string;
}

export type Method = "GET" | "POST" | "PUT" | "DELETE";

export interface FetchConfig {
  method: Method;
  headers: RequestHeaders;
  body?: string | FormData;
  cache?: RequestCache;
  next?: object;
}

export type RenderType = "SSR" | "SSG" | "ISR";
