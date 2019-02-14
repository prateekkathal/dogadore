# Dog Adore

My first react app built using React 16.

## Stack

### Front-End

- React (16.x)
- EmotionJS (10.0.7)
- React-Bootstrap (1.0.0-beta.5)
- Axios (0.18.0)
- React Fontawesome (0.1.4)
- Parcel (1.11.0)

### Back-End

- Docker (18.09.1)
- NodeJS (10.13.0)
- ExpressJS (4.16.4)
- MongoDB (4.0.6)
- Mongoose (5.4.10)
- JSONWebToken (8.4.0)

## Installation

### Basic

```
git clone {repoUrl}
cd dogadore
docker network create -d bridge dogadore
```

### Development

```
docker-compose up mongo
yarn babel-node ./src/server/app.js --extensions '.js,.jsx,.ts,.tsx'
yarn dev
```

### Production

```
docker-compose build
docker-compose up
```

### Thanks To

- [@btholt](https://github.com/btholt) for Front-End Masters course.
- [@ElliottLandsborough](https://github.com/ElliottLandsborough) for [Dog.Ceo API](https://github.com/ElliottLandsborough/dog-ceo-api)
