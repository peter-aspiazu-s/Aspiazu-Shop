import { NextPage, GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { ShopLayout } from '../../components/layouts';
import { Typography, Grid, Chip, Link } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullName', headerName: 'Nombre completo', width: 300 },
    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra la información si está pagada la orden o no',
        width: 200,
        renderCell: (params: GridRenderCellParams) => {
            return (
                params.row.paid
                    ? <Chip color='success' label='Pagada' variant='outlined' />
                    : <Chip color='error' label='No pagada' variant='outlined' />
            )
        }
    },
    {
        field: 'orden',
        headerName: 'Ver orden',
        width: 200,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <NextLink href={`/orders/${ params.row.orderId }`} passHref>
                    <Link underline='always'>Ver orden</Link>
                </NextLink>
            )
        }
    },
]



interface Props {
    orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({orders}) => {

    const rows = orders.map( (order, idx) => ({
        id: idx + 1,
        paid: order.isPaid,
        fullName: `${ order.shippingAddress.firstName } ${ order.shippingAddress.lastName }`,
        orderId: order._id
    }))

  return (
    <ShopLayout title='Historial de ordenes' pageDescription='Historial de ordenes del cliente'>
        <Typography variant='h1' component='h1'>Historial de ordenes</Typography>

        <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height:650, width:'100%' }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    pageSize={ 10 }
                    rowsPerPageOptions={ [10] }
                    autoHeight
                />
            </Grid>
        </Grid>
    </ShopLayout>
  )
}



export const getServerSideProps: GetServerSideProps = async ({req}) => {
    
    const session: any = await getSession({ req });

    if(!session){
        return {
            redirect: {
                destination: '/auth/login?p=/orders/history',
                permanent: false
            }
        }
    }

    const orders = await dbOrders.getOrdersByUser( session.user._id );

    return {
        props: {
            orders
        }
    }
}


export default HistoryPage