## Getting Started

1. サーバースタート

```bash
npm run dev
# or
yarn dev
```

[http://localhost:3000](http://localhost:3000) でフロントをスタート

2. コミット後にリンターツールで整形

```
yarn lint & yarn lint-autofix & yarn format & yarn type-check
```

3. graphqlのスキーマを更新した際にfrontでTSの自動生成

```
yarn compile
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
