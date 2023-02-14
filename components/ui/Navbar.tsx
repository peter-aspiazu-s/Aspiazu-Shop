import { FC, useContext, useState } from 'react';
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { AppBar, Toolbar, Link, Typography, Box, Button, IconButton, Badge, Input, InputAdornment } from '@mui/material'
// import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import ClearOutlined from '@mui/icons-material/ClearOutlined'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined'
import { UIContext, CartContext } from '../../context';

export const Navbar: FC = () => {

    const {pathname, push} = useRouter()

    const { toggleSideMenu } = useContext(UIContext)
    const { numberOfItems } = useContext(CartContext)

    const [ searchTerm, setSearchTerm ] = useState('')
    const [ isSearchVisible, setIsSearchVisible ] = useState(false)

    const onSearchTerm = () => {
        if(searchTerm.trim().length === 0) return

        push(`/search/${searchTerm}`)
    }

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

            <Box 
                sx={{ display: isSearchVisible ? 'none' : {xs:'none', sm: 'flex'} }}
                className='fadeIn'    
            >
                <NextLink href='/category/men' passHref legacyBehavior>
                    <Link>
                        <Button
                            color={ pathname === '/category/men' ? 'primary' : 'info' }
                        >Hombres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/women' passHref legacyBehavior>
                    <Link>
                        <Button
                            color={ pathname === '/category/women' ? 'primary' : 'info' }
                        >Mujeres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/kid' passHref legacyBehavior>
                    <Link>
                        <Button
                            color={ pathname === '/category/kid' ? 'primary' : 'info' }
                        >Niños</Button>
                    </Link>
                </NextLink>
            </Box>

            <Box flex={1} />
            
            {/* Desktop */}
            {
                isSearchVisible
                    ? (
                        <Input
                            sx={{ display: {xs:'none', sm: 'flex'} }}
                            className='fadeIn'
                            autoFocus
                            value={ searchTerm }
                            onChange={ (e) => setSearchTerm( e.target.value ) }
                            onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                            type='text'
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={ () => setIsSearchVisible(false) }
                                    >
                                        <ClearOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    )

                    : (
                        <IconButton
                            onClick={ () => setIsSearchVisible(true) }
                            className='fadeIn'
                            sx={{ display: {xs: 'none', sm: 'flex'} }}
                        >
                            <SearchOutlined />
                        </IconButton>
                    )
            }


            {/* Mobile */}
            <IconButton
                sx={{ display: {xs: 'flex', sm: 'none'} }}
                onClick={ toggleSideMenu }
            >
                <SearchOutlined />
            </IconButton>

            <NextLink href='/cart' passHref>
                <Link>
                    <IconButton>
                        <Badge badgeContent={numberOfItems > 9 ? '+9' : numberOfItems} color="secondary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
                </Link>
            </NextLink>

            <Button onClick={toggleSideMenu}>Menú</Button>
        </Toolbar>
    </AppBar>
  )
}
