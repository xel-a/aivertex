help:
	@echo ""
	@echo "Start decap server"
	@echo "make decap"
	@echo ""
	@echo "Show git log oneline with date"
	@echo "make git-log"
	@echo ""
	@echo "Create content from template"
	@echo "make blog"

decap:
	npx decap-server

git-log:
	git log --pretty=format:'%C(yellow)%h %Cred%ad %Cblue%an%Cgreen%d %Creset%s' --date=short

blog:
	npx tsx src/scripts/new-content.ts blog