import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'

export const runtime = 'edge'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  const json = await req.json()
  const { messages, previewToken } = json
  const authUser = await auth()
  const userId = authUser?.user.email


  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  if (previewToken) {
    configuration.apiKey = previewToken
  }

  console.log('messages:', messages)

  const res = await openai.createCompletion({
    model: 'text-davinci-003',
    temperature: 0.7,
    stream: true,
    max_tokens: 1000,
    prompt: `Answer questions according to property investment.
 
Question: What's BRRRR
Answer: The BRRRR strategy is Buy, Rehab, Rent, Refinance, Repeat.
Question: What's pros of BRRRR
Answer: A few pros of the BRRRR Method include your ability to make a passive income, increase your rental portfolio, and build equity during the rehab process.
Question: ${messages[messages.length-1].content}
Answer:
`,
  })


  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100)
      const id = json.id ?? nanoid()
      const createdAt = Date.now()
      const path = `/chat/${id}`
      const payload = {
        id,
        title,
        userId,
        createdAt,
        path,
        messages: [
          ...messages,
          {
            content: completion,
            role: 'assistant'
          }
        ]
      }
    }
  })

  return new StreamingTextResponse(stream)
}
