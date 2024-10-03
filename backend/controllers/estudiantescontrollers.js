const db= require("../bd/conexion.js");


class EstudiantesController{
    constructor(){

    }

    consultar(req,res){
        try{
            db.query('SELECT  * FROM estudiantes',
            [],(err,rows) => {
                if(err) {
                    res.status (400).send(err.message);
                }
                res.status(200).json(rows);
            });
        }catch (err){
            res.status(500).send(err.message);
        }
    }

    actualizar(req,res){
        const {id} = req.params;
        try{
            const {dni,nombre} = req.body;
            db.query('UPDATE sistema_asistencia.estudiantes SET numerodedocumentodelestudiante=?, nombrescompletosdelestudiante=?, WHERE id=?;',
            [numerodedocumentodelestudiante,nombrescompletosdelestudiante],(err,rows) => {
                if(err) {
                    res.status (400).send(err.message);
                }
                if (rows.affectedRows == 1)
                    res.status(200).json({respuesta:"Registro actualizado correctamente"});
            });
        }catch (err){
            //console.log(err);
            res.status(500).send(err.message);
        }
    }

    ingresar(req,res){
        try{
            const myJSON = JSON.stringify(req.body);
            console.log ("la información que llega es " + myJSON );

            const {dni,nombre} = req.body;
            //console.log ("el dni que llega es de " + dni);

            db.query('INSERT INTO estudiantes (numerodedocumentodelestudiante ,nombrescompletosdelestudiante) VALUES (?, ?);',
            [dni,nombre],(err,rows) => {
                if(err) {
                    res.status (400).send(err.message);
                }else{
                    res.status(201).json({id: rows.insertId});
                }
            });

        }catch (err){
            res.status(500).send(err.message);
        }
    }

    consultarDetalle(req,res){
        const {id} = req.params;
        try{

            db.query('SELECT  * FROM estudiantes WHERE id=?',
            [id],(err,rows) => {
                if(err) {
                    res.status (400).send(err.message);
                }
                res.status(200).json(rows[0]);
            });
        }catch (err){
            res.status(500).send(err.message);
        }

    }

    borrar(req,res){
        const {id} = req.params;
        try{
            req.body;
            db.query('DELETE FROM sistema_asistencia.estudiantes WHERE id=?;',
            [id],(err,rows) => {
                if(err) {
                    res.status (400).send(err.message);
                }
                if (rows.affectedRows == 1)
                    res.status(200).json({respuesta:"Registro borrado correctamente"});
            });
        }catch (err){
            res.status(500).send(err.message);
        }
   }
}

module.exports = new EstudiantesController();
