import {FC} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ISizes } from '../../interfaces';

interface Props {
    selectedSize?: ISizes;
    sizes: ISizes[];

    //Method
    onSelectedSize: (size: ISizes) => void;
}

export const Sizeselector: FC<Props> = ({ selectedSize, sizes, onSelectedSize }) => {
  return (
    <Box>
        {
            sizes.map( size => (
                <Button
                    key={ size }
                    size='small'
                    color={ selectedSize === size ? 'primary' : 'info' }
                    onClick={ () => onSelectedSize( size ) }
                >
                    {size}
                </Button>
            ))
        }
    </Box>
  )
}
