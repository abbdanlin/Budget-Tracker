// index.js
import express from 'express'
import { Configuration, OpenAIApi } from 'openai'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  }),
)

app.post('/ask-advisor', async (req, res) => {
  const { question } = req.body

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are a friendly and responsible financial advisor. Provide practical advice based on user questions.',
        },
        { role: 'user', content: question },
      ],
    })

    res.json({ answer: completion.data.choices[0].message.content })
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' })
  }
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
