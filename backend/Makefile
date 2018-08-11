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

check: depends
	jest

clean:
	rm -rf node_modules

.PHONY: all depends build clean check

# vim: set et
