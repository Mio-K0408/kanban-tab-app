import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Footer() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" color="primary" style={{ top: 'auto', bottom: 0 }}>
                <Toolbar variant="dense">
                    <Typography variant="body1" color="inherit">
                        © 2024 My Practice. All rights reserved.
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Footer