import Typography from '@mui/material/Typography';
import { NextPage } from 'next';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';

const WomenPage: NextPage = () => {

    const { products, isLoading } = useProducts('/products?gender=women')

  return (
    <ShopLayout
      title={'Aspiazu-Shop - Women'}
      pageDescription={'Encuentra los mejores productos de teslo para mujeres aquí'}
    >
      <Typography variant='h1' component='h1'>Tienda</Typography>
      <Typography variant='h2' sx={{
        mb: 1
      }}>Productos para mujeres</Typography>

      {
        isLoading
          ?  <FullScreenLoading />
          : <ProductList products={ products } />
      }

    </ShopLayout>
  )
}

export default WomenPage