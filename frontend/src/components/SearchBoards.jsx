import React, {useState, useEffect} from 'react';
import { createTheme, styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/base';
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom';


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
        width: '20ch',
        },
    },
}));

function FoundBoards(boards, value) {
    let taskArray = boards.filter(board => board.name.includes(value) === true);
    return taskArray;
}

export default function SearchBoards({ boards }) {
    const [inputBoardName, setInputBoardName] = useState({name: ''});
    const [listOfFoundBoards, setListOfFoundBoards] = useState([]);
    console.log("boards", boards)

    async function getBoardsByPartOfName (boards, value) {
        setInputBoardName({...inputBoardName, name: value})
        console.log("boards getBoardsByPartOfName", boards);
        let response = FoundBoards(boards, value);
        console.log("response getBoardsByPartOfName", response[0].name);
        setListOfFoundBoards(FoundBoards(boards, value));
        console.log("listOfFoundBoards getBoardsByPartOfName", listOfFoundBoards)
    }

    return (
      <div>
      <Grid container spacing={3} >
      <Grid item xs={4}></Grid>
        <Grid item xs={4}>
            <Search style={{marginLeft: '-8%', width: '500px'}}>
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
            {console.log("listOfFoundBoards2",listOfFoundBoards)}
          </Search>
          {listOfFoundBoards.map((board, i) =>
            <Button key={i} style={{marginLeft: '-8%', width: '500px', background: "white", border: "gray", position: 'relative', 'z-index': '1'}}>
              <Link to={`/boards/${board.id}`} style={{color: 'blue', textDecoration: 'none'}}>
                {board.name}
              </Link>
            </Button>
          )}
          
         
        </Grid>
        </Grid>
        </div>
    )
}
