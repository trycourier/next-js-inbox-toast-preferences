This repository is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Its purpose is to display Courier's Inbox, Toast, and Preference page implementations using Courier's client-side React libraries [@trycourier/react-provider](), [@trycourier/react-inbox](https://github.com/trycourier/courier-react/tree/main/packages/react-inbox), [@trycourier/react-preferences](https://github.com/trycourier/courier-react/tree/main/packages/react-preferences), and [@trycourier/react-toast](https://github.com/trycourier/courier-react/tree/main/packages/react-toast). These packages use [React Context](https://react.dev/learn/passing-data-deeply-with-context) and are instantiated with [`'use client'`](https://nextjs.org/docs/app/building-your-application/rendering/client-components); see the structure in [components](./src/components/). This example also includes server-side rendering of Courier profile information as well as sending notifications with Courier's server-side Node library [@trycourier/courier-node](https://github.com/trycourier/courier-node).

## Getting Started

```bash
git clone git@github.com:bwebs/courier-next-js-examples.git
mv .env.local.example .env.local
# fill in NEXT_PUBLIC_COURIER_CLIENT_KEY and COURIER_AUTH_TOKEN from your Courier instance.
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the Inbox and Preferences examples.

## Note

This repository is an example of using Courier's client key; consider using [JWT's](https://www.courier.com/docs/platform/inbox/authentication/#json-web-tokens) to secure Preferences, Toasts, and Inbox for each.
