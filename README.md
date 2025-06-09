This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

This project requires [Node.js](https://nodejs.org/en). Download if you haven't already.

Clone the repository.

The appropriate database environment variables are needed to run this project. Create `.env` and add the needed secret `NEON_DATABASE_URL=...`.

Now you can run the development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) or other provided address with your browser to see the result.

## Commits
All commits pushed to the `main` branch are automatically deployed to Vercel.

Vercel will not deploy if there are warning or error logs. Lint before you commit:
```bash
npm run lint
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
