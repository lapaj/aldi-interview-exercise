# Simple webshop application

Simple front-end application with products and cart pages using Vue 3, Tailwind, Vitest and Cypress. The app retrieves the products from the server and allows the user to put the products in their cart according to certain restrictions. Lacking any kind of advanced UI design, the app is minimalistic looking, but responsive.

Acceptance criteria:
- AC01: Create two different pages /products and /cart
- AC02: The Product page lists all products and their information, and enables adding each individual product to cart in various amounts, with respect to minOrderAmount.
- AC02.a: When product is added to cart its available amount should be decremented by the amount added. Adding more than the total amount should not be possible.
- AC03: Cart page displays the products added to the cart: total amount currently added, total price.

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn run dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
yarn run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
yarn run build
yarn run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn run lint
```


## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).
