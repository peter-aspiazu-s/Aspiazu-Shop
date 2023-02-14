import mongoose from 'mongoose';

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
const mongoConnection = {
    isConnected: 0
}

export const connect = async() => {

    if ( mongoConnection.isConnected ) { // no es 0
        console.log('Ya estabamos conectados');
        return;
    }

    if ( mongoose.connections.length > 0 ) {
        mongoConnection.isConnected = mongoose.connections[0].readyState; 

        if ( mongoConnection.isConnected === 1 ) {
            console.log('Usando conexión anterior');
            return;
        }

        await mongoose.disconnect(); // en caso de no ser 1 nos desconectamos de la db
    }

    await mongoose.connect( process.env.MONGO_URL || ''); // en caso de ser 0 nos conectamos a la db
    mongoConnection.isConnected = 1;
    console.log('Conectado a MongoDB:', process.env.MONGO_URL );
}

export const disconnect = async() => {
    
    if ( process.env.NODE_ENV === 'development' ) return; // si es modo desarrollo entonces dejamos como este la conección

    if ( mongoConnection.isConnected === 0 ) return; // si es 0 terminamos la función porque ya estaríamos desconectados

    await mongoose.disconnect(); // en caso de no estar en desarrollo ni ser 0 vamos a desconectarnos de la db
    mongoConnection.isConnected = 0;

    console.log('Desconectado de MongoDB');
}