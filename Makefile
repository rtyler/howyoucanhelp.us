#
# 

PATH:=./node_modules/.bin:./tools:$(PATH)

all: build check

build:
	webpack-cli

check: build
	jest

clean:
	rm -rf dist
	rm -f src/*.js

.PHONY: all clean check

# vim: set et
