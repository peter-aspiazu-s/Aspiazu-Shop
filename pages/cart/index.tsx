import { useContext, useEffect } from 'react';
import { NextPage } from 'next';
import { ShopLayout } from '../../components/layouts';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { CartList, OrderSummary } from '../../components/cart';
import { CartContext } from '../../context';
import { useRouter } from 'next/router';


const CartPage: NextPage = () => {

    const { isLoaded, cart } = useContext( CartContext )
    const router = useRouter()

    useEffect(() => {
        if( isLoaded && cart.length === 0 ) {
            router.replace('/cart/empty')
        }
    }, [isLoaded, cart, router])
    
    if( !isLoaded || cart.length === 0 ){
        return (<></>)
    }

  return (
    <ShopLayout title='Carrito - 3' pageDescription='Carrito de compras de la tienda' >
        <Typography variant='h1' component='h1'>Carrito</Typography>

        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList editable={true} />
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Orden</Typography>
                        <Divider />
                        <OrderSummary />

                        <Box sx={{ mt:3 }}>
                            <Button 
                                color='secondary' 
                                className='circular-btn' 
                                fullWidth
                                href='/checkout/address'
                            >
                                Checkout
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default CartPage