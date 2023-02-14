import { NextPage, GetServerSideProps } from 'next';
import { Typography, Box } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products/ProductList';
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

interface Props {
    products: IProduct[];
    foundProducts: boolean;
    query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {

  return (
    <ShopLayout
      title={'Aspiazu-Shop - Search'}
      pageDescription={'Encuentra los mejores productos de teslo aquí'}
    >
      <Typography variant='h1' component='h1'>Buscar productos</Typography>

        {
            foundProducts
            ? <Typography variant='h2' sx={{mb: 1}}>Término de búsqueda: { query }</Typography>
            : (
                <Box display='flex'>
                    <Typography variant='h2' sx={{mb: 1}}>No encontramos ningún producto con: {query}</Typography>
                </Box>
            )
        }  
        
        <ProductList products={ products } />  
        
    </ShopLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async({params}) => {

    const { query = '' } = params as { query: string }

    if( query.length === 0 ){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    let products = await dbProducts.getProductByTerm( query )

    const foundProducts = products.length > 0

    if( !foundProducts ){
        products = await dbProducts.getAllProducts()
    }

    return {
        props: {
            products,
            foundProducts,
            query
        }
    }

}


export default SearchPage