// board placeholder. Transfer contents from board here and rename
import { useLoaderData, Form, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import SectionCard from '../components/SectionCards';
import Scrollable from '../components/UI/Scrollable';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormDialog from "../components/FormDialog";
import TextField from '@mui/material/TextField';
import '../styles/App.css';

import BoardsService from "../API/BoardsService";
import SectionService from "../API/SectionService";


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import store from '../store';

const BS = new BoardsService();
const SS = new SectionService();


export async function loader({ params }) {
  const authState = store.getState().auth
  let board = await BS.getBoard(params.board_id);
  const staff = authState.auth.isStaff
  return {board, staff};
}

export async function action({params, request}) {
  const formData = await request.formData();
  await SS.createSection({
    name: formData.get("name"),
    board_id: params.board_id
  })
  return null
}

export default function Board() {
  const { board, staff } = useLoaderData();
  const [changed, setChanged] = useState(true)
  const [sections, setSections] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await BS.getSections(board.id);
      setSections(res)
      const usersByBoardId = await BS.getListOfUsersByBoardId(board.id);
      setUsers(usersByBoardId)
      console.log("usersByBoardId ", usersByBoardId )
    }
    if (changed) {
      fetchData();
      setChanged(false);
    }
  }, [changed])
  return (
    <Grid container padding={7} spacing={3}>
      <Card style={{width: '100%', paddingTop: "10px", paddingLeft: '10px', borderRadius: "15px" }}>
        <CardContent style={{}}>
          <Typography gutterBottom variant="h4" component="div" color="text.secondary">
            <strong>Board: </strong>{board.name}
            {staff?
              <>
                <br/>
                <div style={{display: 'block'}}>
                  <div style={{display: 'inline-block'}}>
                    <strong>Users: </strong>
                  </div>
                  <div style={{display: 'inline-block', marginLeft: "15px"}}>
                    <Stack direction="row" spacing={2}>
                      {users.map((user, index) =>
                        <Link to={`/`}>
                            <Avatar 
                                alt="Remy Sharp" 
                                src={`${user.image_url}`} 
                                sx={{ width: '40px', height: "40px"}}
                            />
                        </Link>
                      )}
                    </Stack>
                  </div>
                </div>
              </>
              :
              null
            }
          </Typography>
        </CardContent>
      </Card>

      <Scrollable _class="sections_line">
        {sections.map((sec, i) =>
          <Grid key={i} item>
            <SectionCard sec={sec} sections={sections}/>
          </Grid>
        )}
      </Scrollable>
      <FormDialog icon=<AddCircleIcon/> title={"Create section"}>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Section name"
            type="text"
            fullWidth
            variant="standard"
          />
      </FormDialog>
    </Grid>
  )
}
