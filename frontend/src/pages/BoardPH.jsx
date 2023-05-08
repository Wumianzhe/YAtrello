// board placeholder. Transfer contents from board here and rename
import { useLoaderData } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import SectionCards from '../components/SectionCards';
import Scrollable from '../components/UI/Scrollable';
import '../styles/App.css';

import FormDialog from '../components/FormDialog'


export function loader ({params}) {
  // should be
  // const board = await getBoard(params.uid)
  const board = params.board_id;
  return board;
}

function SectionList() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8080/api/sections/', {
          method: 'GET',
          origin: 'CHmI',
          headers: {
            'Content-Type': 'application/json'
          }
        })
      .then(response => response.json())
      .then(data => setData(data));
  }, []);
  return (
    data
  );
}
function SectionsByBoardId(sectionList, boardId){
  let sectionArray = sectionList.filter(section => section.board_id.toString() === boardId.toString());
  console.log("sectionArray");
  console.log(sectionArray);
  console.log("boardId");
  console.log(boardId);
  return sectionArray;
}


export default function Board() {
  const board = useLoaderData();//board_id
  //const section_list = SectionList();
  const section_list = SectionsByBoardId(SectionList(), board);
  console.log(section_list)
  return (
    <Grid container padding={7} spacing={3}>
      <Scrollable _class="sections_line">
        {section_list.map((sec, i) =>
            <Grid key={i} item>
              <SectionCards sec={sec}/>
            </Grid>
        )}
      </Scrollable>
      <FormDialog/>
    </Grid>
  )
}
