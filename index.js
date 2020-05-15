'use strict';
// import express, { urlencoded, json, static } from 'express';
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
require('dotenv').config()

const todosLosMensajes = 
    [
        {id:1,usuario:'Roberto', mensaje:'Bienvenidos al chat grupal'}
    ];

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));

//conexion con webSocket
io.on('connection', (socket) => {

    console.log('Alguien se ha conectado con Sockets');
    //envia los mensajes al usuario
    socket.emit('mensaje', todosLosMensajes);

    //cuando recivamos un nuevo mensaje...
    socket.on('nuevo-mensaje', (mensajeRecivido) => {
        //lo guardamos en el array de todosLosMensajes
        todosLosMensajes.push(mensajeRecivido);
        //le enviamos el array con todos los mensajes a todos los que esten conectados
        io.sockets.emit('mensaje', todosLosMensajes)
    })

});

server.listen(process.env.PORT, () => {
    console.log(`Api REST corriendo en http://localhost:${process.env.PORT}`)
});

