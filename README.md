# Adonis Simple Admin

> An all included admin section for your Adonis application

Adonis Simple Admin's goal is to provide a small, easy to configure admin dashboard allowing basic crud operations.

## Requirements

To use this package, your Adonis application needs to use:

- Lucid
- Edge (this can also only be just configured)

## Setup

- install this package:

```sh
npm i @matfire/adonis-simple-admin
```

- configure the package using ace:

```sh
node ace configure @matfire/adonis-simple-admin
```

## Configuration

After running the configuration script with ace, you'll find a `simple_admin.ts` file containing all the configuration you'll need to customize Simple Admin

- models: This is the list of models you want to be able to see in the admin section. It is a list of Lucid models.
- path: the base path all the Simple Admin routes will use (defaults to `/admin`)
