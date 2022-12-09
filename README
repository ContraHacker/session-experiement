# Session Experiment Project
---

## Objectives
- Understanding sessions, cookies and its related headers.
- Running the web server and the frontend on different ports.

## Running Locally

```bash
cd ./server
npm i
npm run start

cd ../web
npm i
npm run dev
```

## Technologies Used
- Express
- Express Session
- Vite
- React
- easy-json-database
- Morgan for request logging

## Learnings
- I had to use a proxy to make the sessions work. Using the `cookie.sameSite: 'none'` attribute did not work in browsers. Although it did work in a REST client (Insomnia). The `Set-Cookie` header was present in both cases.
- It's good to explictly set `cookie.domain` to the domain of your frontend. Otherwise it just sets it to the current domain. This works in this case, but I still prefer to set it myself.
- Using the proxy allows me to set the `cookie.sameSite` attribute to `'strict'`
- I still don't know what `app.set('trust proxy, 1)` or `proxy: true` in the session config does.
- easy-json-database is great for such tiny projects!

### TODO
- Host both ends on the internet and see how it works.
- Figure out the security weaknesses. (apart from the horrible cookie secret).
- Add more pages in the front end to see how expired sessions can be handled gracefully.
- Add postcss to vite just for fun.
