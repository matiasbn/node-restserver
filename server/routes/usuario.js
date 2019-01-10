const express = require('express');
const Usuario = require('../models/usuario');
const app = express();
const bcrypt = require('bcrypt')

app.get('/usuarios', function(req, res) {
    res.json('get usuario local!')
})

app.post('/usuarios', function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        usuarioDB.password = null;
        return res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

app.put('/usuarios/:id', function(req, res) {
    let id = req.params.id;

    let body = res.body;
    console.log(body);
    // Usuario.findByIdAndDelete(id, (err, usuarioDB) => {
    Usuario.findByIdAndUpdate(id, body, { new: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        console.log(body);
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })

})

app.delete('/usuarios', function(req, res) {
    res.json('delete usuario')
})

module.exports = app;