import fetchInstance from "./fetch-instance";
import { ApiConfig } from "./model";

export default class BaseServices {
  get = async <T>(apiconfig: ApiConfig): Promise<T> => {
    return await getCall<T>(apiconfig);
  };

  post = async <T>(apiconfig: ApiConfig): Promise<T> => {
    return await postCall<T>(apiconfig);
  };

  put = async <T>(apiconfig: ApiConfig): Promise<T> => {
    return await putCall<T>(apiconfig);
  };

  delete = async <T>(apiconfig: ApiConfig): Promise<T> => {
    return await deleteCall<T>(apiconfig);
  };
}

const getCall = <T>(apiconfig: ApiConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    fetchInstance<T>(apiconfig, "GET", apiconfig.renderType)
      .then(
        (response) => {
          resolve(response);
        },
        (err) => {
          reject(err);
        }
      )
      .catch((err) => {
        reject(err);
      });
  });
};

const postCall = <T>(apiconfig: ApiConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    fetchInstance<T>(apiconfig, "POST")
      .then(
        (response) => {
          resolve(response);
        },
        (err) => {
          reject(err);
        }
      )
      .catch((err) => {
        reject(err);
      });
  });
};

const putCall = <T>(apiconfig: ApiConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    fetchInstance<T>(apiconfig, "PUT")
      .then(
        (response) => {
          resolve(response);
        },
        (err) => {
          reject(err);
        }
      )
      .catch((err) => {
        reject(err);
      });
  });
};

const deleteCall = <T>(apiconfig: ApiConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    fetchInstance<T>(apiconfig, "DELETE")
      .then(
        (response) => {
          resolve(response);
        },
        (err) => {
          reject(err);
        }
      )
      .catch((err) => {
        reject(err);
      });
  });
};
