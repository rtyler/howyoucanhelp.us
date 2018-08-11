PATH:=./node_modules/.bin:../tools:$(PATH)

all: build check

depends: package.json package-lock.json
	if [ ! -d node_modules ]; then \
		npm install; \
	fi;

build: depends
	webpack-cli

check: depends
	jest

run: depends
	webpack-dev-server --mode=development

clean:
	rm -rf dist
	rm -f src/*.js
	rm -rf node_modules

.PHONY: all depends build clean check

# vim: set et
