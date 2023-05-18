import * as React from 'react';
import Card from '@mui/material/Card';
import Box from "@mui/material/Box";
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function ProfileCard(props) {
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Управляйте своей личной информацией
        </Typography>
        <Box padding={2}>
            <TextField
            id="bio_text"
            label="Bio"
            multiline
            rows={4}
            defaultValue={props.bio}
            />
        </Box>
        <CardActions>
            <Button variant="contained" size="small">Сохранить</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}