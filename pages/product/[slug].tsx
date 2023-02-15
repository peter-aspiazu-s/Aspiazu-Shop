import { useState, useContext } from 'react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ShopLayout } from '../../components/layouts';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

import { ProductSlideshow } from '../../components/products';
import { ItemCounter } from '../../components/ui/ItemCounter';
import { Sizeselector } from '../../components/products';
import { ICartProduct, IProduct, ISizes } from '../../interfaces';
import { dbProducts } from '../../database';
import { CartContext } from '../../context';

interface Props {
  product: IProduct;

}

const ProductPage: NextPage<Props> = ({product}) => {

  const router = useRouter()
  const { addProductCart } = useContext( CartContext )

  const [ tempCartProduct, setTempCartProduct ] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1
  })

  const onSelectedSize = (size: ISizes) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      size
    }))
  }

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      quantity
    }))
  }

  const onAddProduct = () => {
    
    if(!tempCartProduct.size) return

    addProductCart(tempCartProduct)
    router.push('/cart')
  }

  return (
    <ShopLayout title={ product.title } pageDescription={ product.description } >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow 
            images={ product.images }
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            <Typography variant='h1' component='h1'>{ product.title }</Typography>
            <Typography variant='subtitle1' component='h2'>${ product.price }</Typography>

            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              <ItemCounter 
                currentValue={ tempCartProduct.quantity }
                updatedQuantity={ onUpdateQuantity }
                maxValue={ product.inStock > 10 ? 10 : product.inStock }
              />
              <Sizeselector 
                // selectedSize={product.sizes[0]}
                sizes={product.sizes}
                selectedSize={tempCartProduct.size}
                onSelectedSize={ (size) => onSelectedSize(size) }
              />
            </Box>

            {
              (product.inStock > 0)
              ? (
                <Button 
                  disabled={tempCartProduct.size ? false : true}
                  color='secondary' 
                  className='circular-btn'
                  onClick={ onAddProduct }  
                >
                  {
                    tempCartProduct.size
                    ? 'Agregar al carrito'
                    : 'Seleccione una talla'
                  }
                </Button>
              )
              : (
                <Chip label='No hay disponibles' color='error' variant='outlined' />
              )
            }


            <Box sx={{ mt:3 }}>
              <Typography variant='subtitle2'>Descripción</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>
          </Box>  
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

// getStaticPaths
// blocking
export const getStaticPaths: GetStaticPaths = async(ctx) => {

  const productSlugs = await dbProducts.getAllProductSlugs()

  return {
    paths: productSlugs.map(({slug}) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking'
  }
}


// getStaticProps
// revalidar cada 24 horas
export const getStaticProps: GetStaticProps = async({params}) => {

  const { slug = '' } = params as { slug: string }
  const product = await dbProducts.getProductBySlug( slug )

  if( !product ){
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}


export default ProductPage