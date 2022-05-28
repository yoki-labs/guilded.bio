# Guilded.bio

## Getting Started

> **⚠️ This project relies on [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) for the dev environment**. If you don't wish to use it, you can run start the services up manually.

First, populate your environment variables by creating a `.env` file with the keys from `.env.example`.

Then, run the start script in the root of the project:

```bash
yarn install
yarn dev-env
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.
To shut down the project, run this in the root of the project:

```bash
docker-compose down -v
```
