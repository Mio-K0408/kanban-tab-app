import * as React from 'react';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';

// function addCard(e){
//     e.preventDefault();
//     console.log('You clicked submit.');
// }

function BottomButtons({ addCard }) {    
    return (
        // <Button color="secondary" variant="outlined" startIcon={<AddBoxIcon />} 
        //     onClick={() => {
        //     alert('clicked');
        // }}>Add</Button>
        <Button color="secondary" variant="outlined" startIcon={<AddBoxIcon />}  onClick={addCard}>Add</Button>
    );
}

export default BottomButtons