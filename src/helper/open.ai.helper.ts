import OpenAI from "openai";

const openai = new OpenAI({
    organization: import.meta.env.VITE_API_OPENAI_ORGANIZATION,
    apiKey: import.meta.env.VITE_API_OPENAI_KEY,
    dangerouslyAllowBrowser: true
});

export const corregirGramatica = async (texto: string) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "Se te proporcionarán declaraciones, y tu tarea es convertirlas a español estándar sin errores ortográficos respetando indicadores ordinales, comas, comillas, formato 'de fecha (dd.mm.aaaa)', entre otros."
                },
                {
                    role: "user",
                    content: texto
                }
            ],
            temperature: 0.7,
            //max_tokens: 64,
            top_p: 1,
        })

        return response.choices[0].message.content;
      
    } catch (error) {
        console.error("Error en la solicitud a la API de OpenAI:", error)
        return "Error al procesar la solicitud"
    }
}

export const mejorarTexto = async (texto: string) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "Se te proporcionarán declaraciones, mejorar el texto de manera profesional en relación a acuerdos que se tomaran, debe estar en español estándar respetando indicadores ordinales, comas, comillas, formato 'de fecha (dd.mm.aaaa)', entre otros."
                },
                {
                    role: "user",
                    content: texto
                }
            ],
            temperature: 0.7,
            //max_tokens: 64,
            top_p: 1,
        })

        return response.choices[0].message.content;
      
    } catch (error) {
        console.error("Error en la solicitud a la API de OpenAI:", error)
        return "Error al procesar la solicitud"
    }
}