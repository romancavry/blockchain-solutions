import axios, { AxiosRequestConfig, Method } from 'axios'

const { REACT_APP_API_ENDPOINT, REACT_APP_API_PREFIX } = process.env

const getURL = (path: string) => `https://${REACT_APP_API_ENDPOINT}${REACT_APP_API_PREFIX}${path}`

export const api = {
  request: <T>(method: Method, path: string, params?: AxiosRequestConfig) => {
    const url = getURL(path)
    return axios
      .create()
      .request<T>({
        method,
        url,
        ...params,
      })
      .then((resp) => {
        return resp
      })
      .catch((err) => {
        throw err
      })
  },

  get: <T extends unknown>(path: string, params?: AxiosRequestConfig['params']) =>
    api.request<T>('GET', path, { params }),

  post: <T>(path: string, data: AxiosRequestConfig['data']) => api.request<T>('POST', path, { data }),

  put: <T>(path: string, data: AxiosRequestConfig['data']) => api.request<T>('PUT', path, { data }),

  patch: <T>(path: string, data: AxiosRequestConfig['data']) => api.request<T>('PATCH', path, { data }),

  delete: <T extends unknown = void>(path: string) => api.request<T>('DELETE', path),
}
