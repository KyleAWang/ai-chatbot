import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'How to achieve finance freedom',
    message: `How to achieve finance freedom?`
  },
  {
    heading: 'How to renovate an rental property?',
    message: 'How to renovate an rental property?'
  },
  {
    heading: "What\'s property investment strategy?",
    message: `What's property investment strategy?`
  }
]

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Welcome to Property Investment AI Chatbot!
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          Here you can ask any property investment related questions.
        </p>
        <p className="leading-normal text-muted-foreground">
          It uses{' '}
          <ExternalLink href="https://vercel.com/blog/ai-sdk-3-generative-ui">
            React Server Components
          </ExternalLink>{' '}
          to combine text with generative UI as output of the LLM. The UI state
          is synced through the SDK so the model is aware of your interactions
          as they happen.
        </p>
      </div>
    </div>
  )
}
