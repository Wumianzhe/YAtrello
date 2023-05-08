import React from 'react';
import { createStyles } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();
const useStyles = createStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    }
  }));

const Reg = () => {
    const classes = useStyles(theme);

    return (
        <div>
            <h1>reg</h1>
        </div>
    );
};

export default function ExpReg() {
  return (
    <ThemeProvider theme={theme}>
      <Reg/>
    </ThemeProvider>
  )
}
