import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedDatabase } from '../../database'
import { Product, User } from '../../models'

type Data = { message: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if (process.env.NODE_ENV === 'production') {
        return res.status(401).json({
            message: 'No tiene acceso a este API'
        })
    }

    await db.connect()

    await User.deleteMany()
    await User.insertMany( seedDatabase.initialData.users )

    await Product.deleteMany() 
    // deleteMany es una función de mongoose que va a purgar la db solo en la colección de productos
    await Product.insertMany( seedDatabase.initialData.products )
    // insertMany es para insertar muchos datos a la db en la colección seleccionada
    await db.disconnect()

    res.status(200).json({ message: 'Proceso realizado correctamente' })
}