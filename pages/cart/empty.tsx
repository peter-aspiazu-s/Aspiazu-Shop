import { NextPage } from 'next';
import NextLink from 'next/link';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import RemoveShoppingCartOutlined from '@mui/icons-material/RemoveShoppingCartOutlined';


const EmptyPage: NextPage = () => {
  return (
    <ShopLayout title='Carrito vacío' pageDescription='No hay artículos en el carrito de compras' >
        <Box sx={{
                display:"flex",
                flexDirection:{xs:'column', sm:'row'}, 
                justifyContent:"center", 
                alignItems:"center"
            }} 
            height="calc(100vh - 200px)"
        >
            <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
            <Box display='flex' flexDirection='column' alignItems='center' >
                <Typography>Su carrito está vacío</Typography>
                <NextLink href='/' passHref>
                    <Link typography='h4' color='secondary'>
                        Regresar
                    </Link>
                </NextLink>
            </Box>
        </Box>
    </ShopLayout>
  )
}

export default EmptyPage