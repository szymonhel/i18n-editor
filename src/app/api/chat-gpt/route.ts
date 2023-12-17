import {NextResponse} from 'next/server';
import OpenAI from 'openai';
import {NextApiRequest} from 'next';

type ResponseData = {
    message: string
}

export async function POST(
    req: Request
) {
    const openai = new OpenAI({
        apiKey: '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',

    });

    const  data = await req.json();
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant. User needs help with the translations. He will provide object with schema: {key: 'TranslationKey', definitions as Object where key is the language type, and value is the translation. Fill up the missing translations basing on the current one or key" }, {
            role: 'user',
            content: `Please translate me this object: ${JSON.stringify(data)}}`,
        }],
        model: "gpt-3.5-turbo",
        max_tokens: 150,
        temperature: 0.9,

    });


    console.error(data);

    return NextResponse.json(completion.choices[0]);
}
