import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  return Router
})

// // server/index.js
// import express from 'express'
// import { Configuration, OpenAIApi } from 'openai'
// import dotenv from 'dotenv'

// dotenv.config()

// const app = express()
// app.use(express.json())

// const openai = new OpenAIApi(
//   new Configuration({
//     apiKey: process.env.sk-4Tj8sLr0YzH7hdfU0KQ0vZ3UyON1Jd96H7V8XbZp0df6, // Nyckel

//   })
// )

// app.post('/ask-advisor', async (req, res) => {
//   const { question } = req.body

//   try {
//     const completion = await openai.createChatCompletion({
//       model: 'gpt-4',
//       messages: [
//         {
//           role: 'system',
//           content: 'You are a friendly and responsible financial advisor. Provide practical advice based on user questions.',
//         },
//         { role: 'user', content: question },
//       ],
//     })

//     res.json({ answer: completion.data.choices[0].message.content })
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ error: 'Something went wrong' })
//   }
// })

// app.listen(3000, () => console.log('Server running on http://localhost:3000'))

// src/router/index.js
// import { defineRouter } from '#q-app/wrappers'
// import {
//   createRouter,
//   createMemoryHistory,
//   createWebHistory,
//   createWebHashHistory,
// } from 'vue-router'
// import routes from './routes'

// export default defineRouter(function () {
//   const createHistory = process.env.SERVER
//     ? createMemoryHistory
//     : process.env.VUE_ROUTER_MODE === 'history'
//       ? createWebHistory
//       : createWebHashHistory

//   return createRouter({
//     scrollBehavior: () => ({ left: 0, top: 0 }),
//     routes,
//     history: createHistory(process.env.VUE_ROUTER_BASE),
//   })
// })
