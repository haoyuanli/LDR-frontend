import React, { useEffect, useState } from "react";
import { Activity } from "../../components";
import { IActivity } from "../../interfaces";
import { fetchActivities } from "../../requests";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export function Feed() {
  const [activitiesLoaded, setActivitiesLoaded] = useState(false);
  const [activities, setActivities] = useState<IActivity[]>([]);
  // eslint-disable-next-line
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!activitiesLoaded) {
      fetchActivities()
        .then(activities => {
          setActivities(activities);
          setActivitiesLoaded(true);
        })
        .catch(err => {
          console.log(err);
          setError(true);
        });
    }
  })

  return (
    <Box m={5} pt={2} sx={{ flexGrow: 1 }}>
      <h1>Long Distance Relationship Activities</h1>

      <p>
        Are you looking for ideas or fun things to do with your partner?

        Sign up an account and complete all activities below!
      </p>

      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {activities.map(activity => <Activity activity={activity} />)}
      </Grid>
    </Box>
  )
}