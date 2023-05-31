import typer

import scrapellm.cli.indexer as indexer
import scrapellm.cli.write_email as write_email
import scrapellm.cli.scraper as scraper
from scrapellm.db import SqliteDB

app = typer.Typer()
app.add_typer(indexer.app, name="index")
app.add_typer(write_email.app, name="email")
app.add_typer(scraper.app, name="scrape")

@app.command()
def companies():
    db = SqliteDB()
    db.print_companies()
    db.close()

if __name__ == "__main__":
    app()
