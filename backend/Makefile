#
# Root Makefile to make the building and testing of this project easier
# regardless of *nix based platform

PATH:=./node_modules/.bin:../tools:$(PATH)

all: build check

depends: package.json package-lock.json
	if [ ! -d node_modules ]; then \
		npm install; \
	fi;

build: depends
	tsc
	webpack-cli

check: depends
	jest

clean:
	rm -rf node_modules

watch:
	jest --watchAll

watch-compile:
	tsc -w

watch-webpack: build
	webpack-dev-server

container: Dockerfile
	docker build -t howyoucanhelpus.azurecr.io/webapp:latest .

deploy: container
	docker push howyoucanhelpus.azurecr.io/webapp:latest && \
		az webapp restart  -n howyoucanhelpus-docker -g hychu

.PHONY: all depends build clean check watch

# vim: set et
