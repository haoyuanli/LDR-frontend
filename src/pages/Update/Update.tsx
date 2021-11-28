import React, { useEffect, useState } from "react";
import { IUser, IProgress, IUpdateProgress } from "../../interfaces";
import styles from './Update.module.css';
import { updateProgress, fetchProgress } from "../../requests";
import { Card, Box, Grid, FormControl, NativeSelect, CardMedia, CardActionArea, TextField } from "@mui/material";
import {
  book,
  coffee,
  bubbleTea,
  movie,
  sunset,
  meals,
  thankyou
} from "../../assets/images";

interface UpdateProps {
  currentUser: IUser;
  onProfileChange: (user: IUser) => void;
}

export function Update(props: UpdateProps) {
  const [progressLoaded, setProgressLoaded] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  const [optionList, setOptionList] = useState<any[]>([]);
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [title, setTitle] = useState("Got something done recently? Mark them as done below!");
  const [activityMapping, setActivityMapping] = useState<any>({});
  const [activeProgress, setActiveProgress] = useState("");
  const [activeImage, setActiveImage] = useState("");
  const images: any = {
    coffee: coffee,
    book: book,
    "bubble tea": bubbleTea,
    movie: movie,
    sunset: sunset,
    meals: meals,
  };

  function handleProgressChange(event: any) {
    setActiveImage(images[activityMapping[event.target.value]]);
    setActiveProgress(event.target.value);
  }

  function formSubmit(e: React.FormEvent<HTMLFormElement>) {
    let req : IUpdateProgress = {"date_of_completion": date, "status": "completed", "notes": notes};
    updateProgress(activeProgress, req);
    e.preventDefault();
    refreshProgress();
  }

  function populateDropdown(progress: IProgress[]) {
    const incompletedActivities: any = {};
    const incompletedProgress : IProgress[] = []
    let options = [];

    for (let i = 0; i < progress.length; i++) {
      if (progress[i].status === "incompleted") {
        incompletedProgress.push(progress[i]);
        incompletedActivities[progress[i].id] =
          progress[i]["activity"]["title"];
        options.push(
          <option value={progress[i].id}>
            {progress[i]["activity"]["title"]}
          </option>
        );
      }
    }

    if (options.length === 0) {
      setActiveImage(thankyou);
      setTitle("Looks like you have completed everything! Good job.")
    }
    else {
      setActiveImage(images[incompletedProgress[0].activity.title]);
      setActiveProgress(incompletedProgress[0].id.toString());
      setActivityMapping(incompletedActivities);
      setOptionList(options);
    }
  }

  function refreshProgress() {
    fetchProgress()
      .then((progress) => {
        populateDropdown(progress);
        setProgressLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }

  useEffect(() => {
    if (!progressLoaded) {
      refreshProgress();
    }
  });

  return (
    <Box style={{ textAlign: "center" }} m={5} pt={2} sx={{ flexGrow: 1 }}>
      <h1>{title}</h1>

      <Grid style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: "350px" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image={activeImage}
              alt=""
            />
          </CardActionArea>

          <form onSubmit={formSubmit}>
            <FormControl className={styles.formGroup}>
              <NativeSelect
                required
                id="activity"
                onChange={handleProgressChange}
              >
                {optionList}
              </NativeSelect>
            </FormControl>

            <Grid>
              <TextField
                className={styles.desc}
                style={{ marginTop: "10px" }}
                type="text"
                name="notes"
                placeholder="Leave notes here..."
                onChange={(e) => setNotes(e.target.value)}
              />
            </Grid>

            <Grid className={styles.formGroup}>
              <label htmlFor="startDate"> </label>
              <input
                type="date"
                name="date"
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Grid>

            <Grid style={{marginBottom: "10px"}}>
            <input type="submit" className="btn"></input>
            </Grid>
          </form>
        </Card>
      </Grid>
    </Box>
  );
}
