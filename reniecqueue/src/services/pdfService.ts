import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export async function generarPDF(
    sede: any,
    tramite: any,
    informacion: any
) {

    const html = `

    <!DOCTYPE html>

    <html>

    <head>

    <meta charset="utf-8"/>

    <style>

@page{
    size:A4;
    margin:20px;
}

body{
    font-family:Arial, sans-serif;
    color:#333;
    font-size:12px;
    line-height:1.3;
}

.header{
    text-align:center;
    background:#0B6BCB;
    color:white;
    padding:15px;
    border-radius:10px;
    margin-bottom:12px;
}

.section{
    margin-top:10px;
    border:1px solid #D8E8F8;
    border-radius:8px;
    padding:10px;
    page-break-inside:avoid;
}
.section h2{
    margin:0 0 8px 0;
    color:#0B6BCB;
    font-size:15px;
}

.info{
    margin:3px 0;
}

ul{
    margin:6px 0 0 15px;
    padding:0;
}

li{
    margin-bottom:3px;
}

.footer{
    margin-top:15px;
    text-align:center;
    color:#777;
    font-size:10px;
}

</style>

    </head>

    <body>

<div class="header">

<h1>RENIEC Queue</h1>

<p>Documento informativo del trámite</p>

</div>

<div class="section">

<h2>Sede</h2>

<p class="info"><b>${sede.nombre}</b></p>

<p class="info">${sede.direccion}</p>

</div>

<div class="section">

<h2>Trámite</h2>

<p><b>${tramite.nombre}</b></p>

<p>${informacion.descripcion}</p>

</div>

<div class="section">

<h2>Información General</h2>

<p><b>Costo:</b> ${informacion.costo}</p>

<p><b>Código de pago:</b> ${informacion.codigoPago}</p>

<p><b>Tiempo estimado:</b> ${informacion.tiempo}</p>

<p><b>Modalidad:</b> ${informacion.modalidad}</p>

</div>

<div class="section">

<h2>Lugares de pago</h2>

<ul>

${informacion.lugaresPago
.map((lugar:string)=>`<li>${lugar}</li>`)
.join("")}

</ul>

</div>

<div class="section">

<h2>Requisitos</h2>

<ul>

${informacion.requisitos
.map((req:string)=>`<li>${req}</li>`)
.join("")}

</ul>

</div>

<div class="section">

<h2>Observaciones</h2>

<ul>

${informacion.observaciones
.map((obs:string)=>`<li>${obs}</li>`)
.join("")}

</ul>

</div>

<div class="footer">

Documento generado por RENIEC Queue

<br>

${new Date().toLocaleDateString("es-PE")}

</div>

</body>

    </html>

    `;

    const { uri } = await Print.printToFileAsync({

        html,

    });

    await Sharing.shareAsync(uri);

}