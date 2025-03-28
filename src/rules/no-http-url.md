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
