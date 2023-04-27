import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";

const Profile = () => {
    return (
        <div>
            <Box
            display="flex"
            justifyContent="center"

            minHeight="100vh"
            >
                <Box>
                    <h1 style={{color: '#002a84'}}>
                        Тут находится профиль пользователя!
                    </h1>
                    <Box
                    justifyContent="center"
                    display="flex">
                        <Box>
                            <Avatar
                                alt="Remy Sharp"
                                sx={{ width: 125, height: 125 }}
                            />
                            <Box
                            justifyContent="center"
                            display="flex">
                                <h1>
                                    login
                                    <br/>
                                    info  
                                </h1>
                            </Box>
                        </Box>
                    </Box>
                </Box>  
            </Box>
        </div>
    );
};

export default Profile;
