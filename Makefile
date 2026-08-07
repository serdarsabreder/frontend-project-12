install:
	npm install
	npm --prefix frontend install

build:
	npm run build

start:
	npm run start

lint:
	npm --prefix frontend run lint
