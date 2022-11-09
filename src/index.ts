const app = require('./services/server');
const PORT = process.env.PORT || 8080 ;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (err) => {
    console.log('Error en el servidor!! =>', err);
});

