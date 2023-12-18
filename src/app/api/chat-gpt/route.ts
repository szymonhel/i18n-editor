import {NextResponse} from 'next/server';
import OpenAI from 'openai';

type ResponseData = {
    message: string
}

export async function POST(
    req: Request
) {
    const  data = await req.json();

    if (Object.values(data.definitions).every(key => !key)){
        return NextResponse.json({msg: 'At least one key needs to be translated'}, {status: 400});
    }
    const openai = new OpenAI({
        apiKey: data.apiKey,

    });

    const completion = await openai.chat.completions.create({
        messages: [

            { role: "system", content: "You are a helpful assistant. User needs help with the translations. He will provide object with where keys are the language type, and value is the translation. Fill up the missing translations basing on the current one or key" },
            {role: 'system', content: `Translate me to this languages: ${data.languages}`},
            {role: 'system', content: `Result should be just a json`},
            {
            role: 'user',
            content: `Please translate me this object: ${JSON.stringify(data.definitions)}}`,
        }],
        model: "gpt-3.5-turbo",
        max_tokens: 150,
        temperature: 0.9,

    });

    const text = completion.choices[0]?.message.content ?? '';
    const jsonStartIndex = text.indexOf('{');

    const jsonSubstring = text.substring(jsonStartIndex);


    return NextResponse.json(jsonSubstring);
}
