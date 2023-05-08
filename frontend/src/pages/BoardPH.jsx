// board placeholder. Transfer contents from board here and rename
import { useLoaderData } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import SectionCards from '../components/SectionCards';
import Scrollable from '../components/UI/Scrollable';
import '../styles/App.css';
import BoardsService from "../API/BoardsService";

import FormDialog from '../components/FormDialog'


export async function loader ({params}) {
  // should be
  // const board = await getBoard(params.uid)
  const BS = new BoardsService();
  let board = await BS.getBoard(params.board_id);
  board.sections = await BS.getSections(params.board_id);
  return board;
}

export default function Board() {
  const board = useLoaderData();
  return (
    <Grid container padding={7} spacing={3}>
      <Scrollable _class="sections_line">
        {board.sections.map((sec, i) =>
            <Grid key={i} item>
              <SectionCards sec={sec}/>
            </Grid>
        )}
      </Scrollable>
      <FormDialog/>
    </Grid>
  )
}
