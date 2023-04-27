import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import { Grid } from '@mui/material';
import ProfileCard from '../components/ProfileCards';
import PersonalInfoCards from '../components/PersonalInfoCards';

const Profile = () => {
    return (
        <Box padding={3}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item>
                    <ProfileCard/>
                </Grid>
                <Grid item>
                    <PersonalInfoCards/>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;
