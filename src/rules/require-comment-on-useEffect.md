# require-comment-on-useEffect

Enforce a comment on every `useEffect` hook.

## Rule Details

```ts
// 👍 ok

const someValue = 1;

// prints the value of `someValue` whenever it changes
useEffect(() => {
	console.log(someValue);
}, [someValue]);
```

```ts
// 👎 error

const someValue = 1;
useEffect(() => {
	console.log(someValue);
}, [someValue]);
```
