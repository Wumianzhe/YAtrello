// board placeholder. Transfer contents from board here and rename
import { useLoaderData, Form } from "react-router-dom";
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

const BS = new BoardsService();
const SS = new SectionService();


export async function loader({ params }) {
  let board = await BS.getBoard(params.board_id);
  return board;
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
  const board = useLoaderData();
  const [changed, setChanged] = useState(true)
  const [sections, setSections] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await BS.getSections(board.id);
      setSections(res)
    }
    if (changed) {
      fetchData();
      setChanged(false);
    }
  }, [changed])
  return (
    <Grid container padding={7} spacing={3}>
      <Scrollable _class="sections_line">
        {sections.map((sec, i) =>
          <Grid key={i} item>
            <SectionCard sec={sec} />
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
