import axios from 'axios';
import { GlobalConstants } from '../../GlobalConstants';
import { TokenProvider } from './TokenProvider';

export function axiosIntance() {
  const instance = axios.create({
    baseURL: GlobalConstants.DEFAULT_API_URL,
    headers: { Authorization: `bearer ${String(TokenProvider.getToken())}` },
  });
  return instance;
}
