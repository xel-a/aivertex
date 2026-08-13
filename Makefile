help:
	@echo ""
	@echo "Start decap server"
	@echo "make decap"
	@echo ""
	@echo "Show git log oneline with date"
	@echo "make git-log"

decap:
	npx decap-server

git-log:
	git log --pretty=format:"%h%x09%an%x09%ad%x09%s" --date=short