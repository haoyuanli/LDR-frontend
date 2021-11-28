import React, { useEffect, useState } from "react";
import { Progress } from "../../components";
import { IUser, IProgress } from "../../interfaces";
import { fetchProfile, fetchProgress } from "../../requests";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

interface ProfileProps {
  currentUser: IUser;
  onProfileChange: (user: IUser) => void;
}

export function Profile(props: ProfileProps) {
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [progress, setProgress] = useState<IProgress[]>([]);
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  const [profile, setProfile] = useState<any>({})

  function refreshProgress() {
    fetchProfile()
      .then(profile => {
        setProfile(profile);
        console.log(profile);
      })

    fetchProgress()
      .then(progress => {
        setProgress(progress);
        setProgressLoaded(true);
      })
      .catch(err => {
        console.log(err);
        setError(true);
      });
  }

  useEffect(() => {
    if (!progressLoaded) {
      refreshProgress();
    }
  })

  return (
    <Box m={5} pt={2} sx={{ flexGrow: 1 }}>
      <h1>Hello, {profile.preferred_name} and {profile.partner_name}!</h1>

      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {progress.map(item => <Progress progress={item} />)}
      </Grid>
    </Box>
  );
}