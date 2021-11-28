import { IActivity } from '../../interfaces';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { book, coffee, bubbleTea, movie, sunset, meals} from '../../assets/images'

interface ActivityProps {
  activity: IActivity;
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

export function Activity(props: ActivityProps) {

  return (
    <Grid item xs={12} sm={4} md={4}>
      <Card sx={{ }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={images[props.activity.title]}
            alt={props.activity.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {props.activity.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {props.activity.content}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}