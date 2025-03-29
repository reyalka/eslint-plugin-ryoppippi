# no-http-url

This rule aims to ensure that all URLs are HTTPS.

`localhost` is allowed.

## Rule Details

```ts
'https://example.com'; // 👍 ok

'http://localhost'; // 👍 ok

'http:127.0.0.1:3000'; // 👍 ok
```

```ts
'http://example.com'; // 👎 error
```

## Options

This rule accepts an optional configuration object with an `allowedOrigins` array. The default value for `allowedOrigins` is `['localhost', '127.0.0.1']`.

### Example

```ts
// eslint no-http-url: ["error", { "allowedOrigins": ["custom.com"] }]

'http://custom.com'; // 👍 ok

'http://example.com'; // 👎 error
```
