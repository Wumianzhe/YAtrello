// board placeholder. Transfer contents from board here and rename
import { useLoaderData } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import SectionCards from '../components/SectionCards';


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



export default function Board() {
  const board = useLoaderData();//board_id
  const section_list = SectionList();
  //console.log(section_list)
  return (
    <Grid container padding={7} spacing={3}>
      {section_list.map(sec =>
        <Grid item>
          <SectionCards sec={sec}/>
        </Grid>
        )}
    </Grid>
  )
}
