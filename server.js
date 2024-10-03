const express = require('express');
const cors = require("cors");
const serverless = require('serverless-http');

const app = express();
const estudiantesroutes = require("./backend/routes/estudiantesroutes.js");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hola mundo");
});

app.use("/", estudiantesroutes);

    const port = process.env.PORT || 6500;
    app.listen(port, () => {
        console.log(`Servidor activo en el puerto ${port}`);

}   )
 // Exporta el manejador para Netlify
