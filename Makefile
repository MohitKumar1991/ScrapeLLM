server-dev:
	poetry run uvicorn scrapellm.server.main:app --reload
ui-dev:
	cd dashboard && yarn dev