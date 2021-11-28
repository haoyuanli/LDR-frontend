import React, { useEffect, useState } from "react";
import { IProgress } from '../../interfaces';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { book, coffee, bubbleTea, movie, sunset, meals} from '../../assets/images'

interface ProgressProps {
  progress: IProgress;
  hideImage?: boolean;
  onDelete?: () => void;
}

const images : any = {
  "coffee": coffee,
  "book": book,
  "bubble tea": bubbleTea,
  "movie": movie,
  "sunset": sunset,
  "meals": meals
}

export function Progress(props: ProgressProps) {
  const [completionDate, setCompletionDate] = useState<any>("")

  // eslint-disable-next-line
  useEffect(() => {
    if (props.progress.date_of_completion === "2000-01-01T00:00:00.000Z") {
      setCompletionDate("");
    }
    else {
      setCompletionDate(props.progress.date_of_completion.replace("T00:00:00.000Z",""));
    }
  })

  return (
    <Grid item xs={12} sm={4} md={4}>
      <Card sx={{ }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={images[props.progress.activity.title]}
            alt={props.progress.activity.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {props.progress.activity.title}
            </Typography>
            <Typography variant="body1" color="text.primary">
                {props.progress.status} {completionDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {props.progress.notes}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}