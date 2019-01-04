const express = require('express');
const app = express();

app.get('/usuarios', function(req, res) {
    res.json('get usuario local!')
})

app.post('/usuarios', function(req, res) {
    let body = req.body;
    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'el nombre es necesario'
        });
    } else {
        res.json({
            persona: body
        })
    }

})

app.put('/usuarios/:id', function(req, res) {
    let id = req.params.id;
    res.json({
        id
    })
})

app.delete('/usuarios', function(req, res) {
    res.json('delete usuario')
})

module.exports = app;