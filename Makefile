server:
	poetry run uvicorn scrapellm.server.main:app --reload
ui:
	cd dashboard && yarn dev
worker:
	poetry run python scrapellm/worker.py