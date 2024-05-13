# MARKET WAREHOUSE

## Demo
Vercel: https://market-warehouse.vercel.app/

## Intro
This is a CRUD management app for a series of products. Specifically, you can:

- add products
- edit a product
- remove a product
- view the list of existing products.

There's also a users management with login and the possibility to add new users.

## About the project
To obtain the data I used the mock services from the dummy.json site (see sources), very useful especially for reading.
To manage data persistence, in particular for new users and new products, I used the stores (included in the Nuxt framework) and localStorage to also manage problems when reloading the page.

Important: when a new product is created a random image is generated as "product image". These images come from: https://picsum.photos/200/300

## Built with
- Vue v.3.4.21 https://vuejs.org/
- Nuxt v. 3.11.2 https://nuxt.com/
- Vuetify v. 3.6.4 https://vuetifyjs.com/
- Pinia v. 0.5.1 https://pinia.vuejs.org/

## Sources
- Datas for CRUD operation: https://dummyjson.com/
- Product list: https://dummyjson.com/products
- User list: https://dummyjson.com/users
- Basic login management: https://dev.to/rafaelmagalhaes/authentication-in-nuxt-3-375o

## Getting started

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

### Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

### Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Contact
Contact me on mail: dacoletta.95@gmail.com