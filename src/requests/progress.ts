import axios from 'axios';
import { IUpdateProgress, IProgress } from "../interfaces";

export async function fetchProgress(): Promise<IProgress[]> {
  const response = await axios.get<IProgress[]>('/api/progress', {
  });
  return response.data;
}

export async function updateProgress(progressId: string, progress: IUpdateProgress): Promise<void> {
  await axios.put(`/api/progress/${progressId}`, progress);
}
