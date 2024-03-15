import { TypeWithKey } from "../models";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getValidationError = (errorCode: any) => {
  const codeMatcher: TypeWithKey<string> = {
    ERR_NETWORK: "Se rompió la red",
    ERR_TIMEOUT: "Se acabó el tiempo",
    ERR_CANCEL: "Se canceló la petición",
    ERR_UNKNOWN: "Error desconocido",
    ERR_400: "Error 400",
    ERR_401: "Error 401",
    ERR_403: "Error 403",
    ERR_404: "Error 404",
    ERR_BAD_REQUEST: "No encontrado",
  };

  return codeMatcher[errorCode];
};
