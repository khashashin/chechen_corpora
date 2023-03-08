# Front-End set up

## Prerequisites
Make sure you have installed the following:
- [Node.js v18](https://nodejs.org/en/)

## Installation
Clone the repository and install the dependencies:
```bash
git clone https://github.com/khashashin/chechen_corpora.git
cd frontend

npm install -D
```
Create a `.env` file in the root directory and add the following:
```bash
VITE_API_ENDPOINT=http://127.0.0.1:8000/api/v1
VITE_PROJECT_DOMAIN=http://localhost:3000
VITE_AUTH_ENDPOINT=https://fb.gibbit.ch/v1
VITE_AUTH_PROJECT_ID=ce-lang-comm-corpora
VITE_LS_SESSION_KEY=$VITE_AUTH_PROJECT_ID
```

## Usage
This project uses [Vite](https://vitejs.dev/) as a development server. To start the development server, run:
```bash
npm run dev
```