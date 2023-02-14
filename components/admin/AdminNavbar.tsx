import { FC, useContext } from 'react';
import NextLink from 'next/link';
import { AppBar, Toolbar, Link, Typography, Box, Button } from '@mui/material';
import { UIContext } from '../../context';

export const AdminNavbar: FC = () => {

    const { toggleSideMenu } = useContext(UIContext)

  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' passHref>
                <Link display='flex' alignItems='center'>
                    <Typography variant="h6">Aspiazu |</Typography>
                    <Typography sx={{ ml: 0.5 }} >Shop</Typography>
                </Link>
            </NextLink>

            <Box flex={1} />

            <Button onClick={toggleSideMenu}>Menú</Button>
        </Toolbar>
    </AppBar>
  )
}
