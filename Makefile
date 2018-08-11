
all: check build

depends:
	$(MAKE) -C frontend $@
	$(MAKE) -C backend $@

build:
	$(MAKE) -C frontend $@
	$(MAKE) -C backend $@

check:
	$(MAKE) -C frontend $@
	$(MAKE) -C backend $@

clean:
	$(MAKE) -C frontend $@
	$(MAKE) -C backend $@


.PHONY: all depends build clean check

# vim: set et
