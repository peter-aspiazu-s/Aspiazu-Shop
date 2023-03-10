import { useContext, useState } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { signIn, getSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';

import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import { AuthContext } from '../../context';

type FormData = {
    name: string;
    email: string;
    password: string;
}

const RegisterPage: NextPage  = () => {

    const router = useRouter()
    const { registerUser } = useContext( AuthContext )

    const { register, handleSubmit, formState:{ errors } } = useForm<FormData>()
    const [ showError, setShowError ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState('')

    const onRegisterForm = async({name, email, password}: FormData) => {
        
        setShowError(false)
        const {hasError, message} = await registerUser(name, email, password)

        if(hasError){
            setShowError(true)
            setErrorMessage(message!)
            setTimeout(() => setShowError(false), 3000)
            return
        }

        await signIn('credentials', { email, password })

    }

  return (
    <AuthLayout title={'Registrarse'} >
        <form onSubmit={ handleSubmit(onRegisterForm) } noValidate>
            <Box sx={{ width:350, padding:'10px 20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1'>Crear cuenta</Typography>
                        <Chip 
                            label='No se pudo crear el usuario'
                            color='error'
                            icon={ <ErrorOutline /> }
                            className='fadeIn'
                            sx={{ display: showError ? 'flex' : 'none' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label='Nombre completo' 
                            variant='filled' 
                            fullWidth 
                            { ...register('name', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'M??nimo 2 caracteres' }
                            })}
                            error={ !!errors.name }
                            helperText={ errors.name?.message }    
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            type='email'
                            label='Correo' 
                            variant='filled' 
                            fullWidth 
                            { ...register('email', {
                                required: 'Este campo es obligatorio',
                                validate: validations.isEmail
                            })}
                            error={ !!errors.email }
                            helperText={ errors.email?.message }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label='Contrase??a' 
                            type='password' 
                            variant='filled' 
                            fullWidth 
                            { ...register('password', {
                                required: 'Este campo es requerido',
                                minLength: { value: 6, message: 'M??nimo 6 caracteres' }
                            })}
                            error={ !!errors.password }
                            helperText={ errors.password?.message }    
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            type='submit' 
                            color='secondary' 
                            className='circular-btn' 
                            size='large' 
                            fullWidth
                        >
                            Ingresar
                        </Button>
                    </Grid>

                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <NextLink 
                            href={router.query.p ? `/auth/login?p=${ router.query.p }` : '/auth/login'}
                            passHref
                        >
                            <Link underline='always'>
                                ??Ya tienes cuenta?
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async({ req, query }) => {

    const session = await getSession({ req });
    console.log({session});

    const { p = '/' } = query;

    if( session ){
        return {
            redirect: {
                destination: p.toString(),
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }

}


export default RegisterPage    