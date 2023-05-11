import React, { useState, useEffect } from 'react';
import { createTheme, styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/base';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';


const theme = createTheme();

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: theme.spacing(5),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '60ch',
    },
  },
}));

function FoundBoards(boards, value) {
  return boards.filter(board => board.name.includes(value) === true);
}

export default function SearchBoards({ boards, children }) {
  const [inputBoardName, setInputBoardName] = useState({ name: '' });
  const [listOfFoundBoards, setListOfFoundBoards] = useState(boards);

  async function getBoardsByPartOfName(boards, value) {
    setInputBoardName({ ...inputBoardName, name: value })
    let response = FoundBoards(boards, value);
    setListOfFoundBoards(response);
  }

    return (
      <div style={{marginTop: "20px", }}>
      <Grid >
          <Search style={{ marginLeft: '0', width: '100%'}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}

              value={inputBoardName.name}
              onChange={(e) => {
                getBoardsByPartOfName(boards, e.target.value)
              }}
            />
            {/* {console.log("listOfFoundBoards2", listOfFoundBoards)} */}
          </Search>
          {children(listOfFoundBoards)}
      </Grid>
    </div>
  )
}
