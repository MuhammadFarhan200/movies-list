<h1 style="display: flex; align-items: center;">movies-list</h1>

This project is a simple web application that utilizes ReactJS technology to display movie data from themoviedb API.
The main feature of this application is getting movie data from themoviedb API using the GET request method.

## Precondition

Before running this project, make sure you have installed:

- <a href="https://nodejs.org" target="_blank">Node.js</a>
- <a href="https://www.npmjs.com" target="_blank">pnpm</a>

## Installation & Configuration

- Download this repository or you can clone this repository by running command:

```bash
$ git clone https://github.com/MuhammadFarhan200/movies-list.git
```

- Go to repository folder by running the command:

```bash
$ cd movies-list
```

- Install dependencies with pnpm:

```bash
$ pnpm install
```

Before running it you have to configure the environment requirements first. Please follow the instructions below:

- Create an .env file based on the .env.example file:

```bash
$ copy .env.example .env
```

Or you can also run the command:

```bash
$ cp .env.example .env
```

- Then open the `.env` file that was created and look at the `VITE_APIKEY` section

```bash
VITE_APIKEY=YOUR_API_KEY // Please change the value with api key from your themoviedb account
```

- Finally, to start development you can run the command:

```bash
$ pnpm run dev
```

You can access it in your browser on the server `http://localhost:5173/`

## Contact Me

If you have any questions or want to get in touch, please contact me via:

- Email: [farhannsrllh177@gmail.com](mailto:farhannsrllh177@gmail.com)
