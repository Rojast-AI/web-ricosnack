// Archivo: netlify/functions/whatsapp-webhook.js

exports.handler = async (event) => {
    // 1. Lógica de verificación (Solo se usa una vez cuando configuras en Meta)
    if (event.httpMethod === "GET") {
        const mode = event.queryStringParameters["hub.mode"];
        const token = event.queryStringParameters["hub.verify_token"];
        const challenge = event.queryStringParameters["hub.challenge"];

        // "RicoSnackSecret2026" es el token que tú inventes
        if (mode === "subscribe" && token === "RicoSnackSecret2026") {
            return { statusCode: 200, body: challenge };
        }
        return { statusCode: 403, body: "Error de verificación" };
    }

    // 2. Lógica de recepción de mensajes (Aquí entrarán tus Agentes después)
    if (event.httpMethod === "POST") {
        const body = JSON.parse(event.body);
        
        // Imprime el mensaje en los logs de Netlify para que lo veas
        console.log("Mensaje recibido:", JSON.stringify(body, null, 2));

        return { statusCode: 200, body: "EVENT_RECEIVED" };
    }

    return { statusCode: 405, body: "Método no permitido" };
};