import {FC} from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';


export const FullScreenLoading: FC = () => {
  return (
    <Box 
        sx={{ 
            height: 'calc(100vh - 280px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center' 
        }}> 
        <CircularProgress
            size={80}
            color='secondary' /> 
    </Box>
  )
}
