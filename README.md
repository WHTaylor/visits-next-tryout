# visits-next-tryout

Trying out next with Material UI on a mock user visits frontend.

This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

## Notes

- The 'data' for this is just stored in memory, so changes are lost on restart
- A small, random delay has been added to 'requests' to simulate an actual network
- I'm unsure when it's good to drop in to client side rendering. Server side
  rendering seems to have some bugs, especially with respect to caching, that
  cause problems (ie. https://github.com/vercel/next.js/issues/42991), which is a
  bit annoying.