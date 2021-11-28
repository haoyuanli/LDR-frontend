import axios from 'axios';
import { IActivity } from "../interfaces";

export async function fetchActivities(): Promise<IActivity[]> {
  const response = await axios.get<IActivity[]>('/api/activities', {
  });
  return response.data;
}
