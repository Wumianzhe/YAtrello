// board placeholder. Transfer contents from board here and rename
import { useLoaderData } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import SectionCard from '../components/SectionCards';
import Scrollable from '../components/UI/Scrollable';
import '../styles/App.css';
import BoardsService from "../API/BoardsService";

import FormDialog from '../components/FormDialog'

const BS = new BoardsService();

export async function loader ({params}) {
  // should be
  // const board = await getBoard(params.uid)
  let board = await BS.getBoard(params.board_id);
  return board;
}

export default function Board() {
  const board = useLoaderData();
  const [sections,setSections] = useState([]);
  useEffect(() => {
    const fetchData = async() => {
      const res = await BS.getSections(board.id);
      setSections(res)
    }
    fetchData();
  },[board])
  return (
    <Grid container padding={7} spacing={3}>
      <Scrollable _class="sections_line">
        {sections.map((sec, i) =>
            <Grid key={i} item>
              <SectionCard sec={sec}/>
            </Grid>
        )}
      </Scrollable>
      <FormDialog/>
    </Grid>
  )
}
