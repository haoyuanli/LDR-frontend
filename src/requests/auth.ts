import axios from 'axios';
import { ICredentials, IUser } from '../interfaces';

export async function logIn(credentials: ICredentials): Promise<IUser> {
  const response = await axios.post<IUser>('/api/auth/login', credentials);
  return response.data;
}

export async function logOut(): Promise<void> {
  await axios.post('/api/auth/logout');
}

export async function signUp(credentials: ICredentials): Promise<IUser> {
  const response = await axios.post<IUser>('/api/auth/signup', credentials);
  return response.data;
}
