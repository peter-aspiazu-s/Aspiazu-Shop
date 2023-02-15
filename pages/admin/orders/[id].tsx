import { NextPage, GetServerSideProps } from 'next';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { CartList, OrderSummary } from '../../../components/cart'; 
import { dbOrders } from '../../../database';
import { IOrder } from '../../../interfaces';
import { AdminLayout } from '../../../components/layouts';
import CreditScoreOutlined from '@mui/icons-material/CreditScoreOutlined';
import AirplaneTicketOutlined from '@mui/icons-material/AirplaneTicketOutlined';
import CreditCardOffOutlined from '@mui/icons-material/CreditCardOffOutlined';

interface Props {
    order: IOrder
};

const OrderPage: NextPage<Props> = ({order}) => {

    const { shippingAddress } = order;

  return (
    <AdminLayout 
        title='Resumen de la orden' 
        subTitle={`OrdenId: ${ order._id }`}
        icon={ <AirplaneTicketOutlined /> }
    >

        {
            order.isPaid
            ? (
                <Chip 
                    sx={{ my: 2 }}
                    label='Orden ya fue pagada'
                    variant='outlined'
                    color='success'
                    icon={ <CreditScoreOutlined /> }
                />
            ) :
            (
                <Chip 
                    sx={{ my: 2 }}
                    label='Pendiente de pago'
                    variant='outlined'
                    color='error'
                    icon={ <CreditCardOffOutlined /> }
                />
            )
        }
        
        

        <Grid container className='fadeIn'>
            <Grid item xs={12} sm={7}>
                <CartList products={ order.orderItems } />
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen ({order.numberOfItems} {order.numberOfItems > 1 ? 'productos' : 'producto'})</Typography>
                        <Divider sx={{ my:1 }} />

                        <Typography variant='subtitle1'>Dirección de entrega</Typography>

                        <Typography>{shippingAddress.firstName} {shippingAddress.lastName}</Typography>
                        <Typography>{shippingAddress.address} {shippingAddress.address2 ? `, ${ shippingAddress.address2 }` : ''}</Typography>
                        <Typography>{ shippingAddress.city }, { shippingAddress.zip }</Typography>
                        <Typography>{ shippingAddress.country }</Typography>
                        <Typography>{ shippingAddress.phone }</Typography>

                        <Divider sx={{ my:1 }} />

                        <OrderSummary 
                            orderValues={{
                                numberOfItems: order.numberOfItems,
                                subTotal: order.subTotal,
                                total: order.total,
                                tax: order.tax,
                            }} 
                        />

                        <Box sx={{ mt:3 }} display='flex' flexDirection='column'>

                            <Box display='flex' flexDirection='column'>
                                {
                                    order.isPaid
                                    ? (
                                        <Chip 
                                            sx={{ my: 2, flex: 1 }}
                                            label='Orden ya fue pagada'
                                            variant='outlined'
                                            color='success'
                                            icon={ <CreditScoreOutlined /> }
                                        />
                                    ) : (
                                        <Chip 
                                            sx={{ my: 2, flex: 1 }}
                                            label='Pendiente de pago'
                                            variant='outlined'
                                            color='error'
                                            icon={ <CreditCardOffOutlined /> }
                                        />
                                    )
                                }
                            </Box>

                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </AdminLayout>
  )
}



export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
    
    const {id = ''} = query;

    const order = await dbOrders.getOrderById( id.toString() );

    
    if(!order){
        return {
            redirect: {
                destination: `/admin/orders`,
                permanent: false,
            }
        }
    }
    
    order.orderItems = order.orderItems.map(product => {
        product.image = product.image.includes('http')
          ? product.image
          : `${process.env.HOST_NAME}/products/${product.image}`;
        return product;
      });

    return {
        props: {
            order
        }
    }
}


export default OrderPage;