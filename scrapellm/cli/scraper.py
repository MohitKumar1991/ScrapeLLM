from scrapellm.scraper.spider import StaticSiteCrawler
from scrapy.crawler import CrawlerProcess
from tabulate import tabulate
import scrapellm.utils as u
from typer import Typer
app = Typer()

@app.command()
def add_website(url:str):
    process = CrawlerProcess(
        settings={
            "LOG_LEVEL": 'INFO',
            "ITEM_PIPELINES": {
                "staticscraper.StaticPipeline": 300
            },
            "DOWNLOAD_DELAY": 0.5
        }
    )
    crawler = process.create_crawler(StaticSiteCrawler)
    process.crawl(crawler, start_urls=f"{url}")
    process.start()
    stats_obj = crawler.stats
    stats_dict = stats_obj.get_stats()
    #stats_dict = stats_obj.get_stats()
    u.pencil.warning(f" {url} Added Successfully")
    #Add Progress Bar for Weaviate Indexing 
    print(tabulate(stats_dict.items(), ['Heading', 'Value'], tablefmt="rounded_grid"))

