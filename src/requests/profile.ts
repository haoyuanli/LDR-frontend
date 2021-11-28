import axios from 'axios';
import { IProfile } from "../interfaces";

export async function fetchProfile(): Promise<IProfile[]> {
  const response = await axios.get<IProfile[]>('/api/profile', {
  });
  return response.data;
}
