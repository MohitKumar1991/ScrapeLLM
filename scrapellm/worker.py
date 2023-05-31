from scrapellm.scraper.spider import StaticSiteCrawler
from scrapy.crawler import CrawlerProcess
from scrapellm.vectorstores.WeaviateStore import WeaviateStore
from tabulate import tabulate
import time
import json
import traceback
import os
import sys
from urllib.parse import urlparse
from tqdm import tqdm
import scrapellm.utils as u
from scrapellm.db import SqliteDB

import signal

def index_data(filename: str):
    weaviate = WeaviateStore()
    path = "data/" + filename.replace(".jsonl","") + ".jsonl"
    with open(path, "r") as f:
        for line in tqdm(f,bar_format='{l_bar}{bar:50}{r_bar}'):
            item = json.loads(line)
            weaviate.add_data(item)


def crawl_website(company):
    process = CrawlerProcess(
        settings={
            "LOG_LEVEL": 'INFO',
            "ITEM_PIPELINES": {
                "scrapellm.scraper.pipeline.ScrapePipeline": 300
            },
            "DOWNLOAD_DELAY": 0.5
        }
    )
    url = company['website']
    output_file = company['company'].replace(" ","_").replace(".", "_")
    crawler = process.create_crawler(StaticSiteCrawler)
    process.crawl(crawler, start_urls=f"{url}", 
                  output_file=output_file,
                  company=company['company'])
    process.start()
    stats_obj = crawler.stats
    stats_dict = stats_obj.get_stats()
    u.pencil.warning(f" {url} Added Successfully") 
    print(tabulate(stats_dict.items(), ['Heading', 'Value'], tablefmt="rounded_grid"))
    return output_file


#This worker does the following
#checks the sqlite db to see if any website needs to be scraped
#if yes then scrape the website and creates the jsonl file
#updates the value of scrape job in the sqlite db

def run_worker():
    sqlite = SqliteDB()
    companies = sqlite.get_companies()
    print(companies)
    companies_to_scrape = [ company for company in companies if company['status'] == "added" or company['status'] == 'failed' ]
    if len(companies_to_scrape) > 0:
        print(tabulate([ company.values() for company in companies_to_scrape], companies_to_scrape[0].keys(), tablefmt="rounded_grid"))
    else:
        u.pencil.warning("No websites to scrape")
    for company in companies_to_scrape:
        try:
            output_file = crawl_website(company)
            sqlite.update_scrape_status(company['company'], "scraped", output_file)
        except Exception as e:
            print(traceback.format_exc())
            u.pencil.error(f"Error while scraping {company['website']}")
            sqlite.update_scrape_status(company['company'], "failed")
    
    #start indexing step
    u.pencil.warning("All websites pending for crawling are crawled")
    companies_to_index = [ company for company in sqlite.get_companies() if company['status'] == "scraped" ]
    if len(companies_to_index) > 0:
        print(tabulate([ company.values() for company in companies_to_index], companies_to_index[0].keys(), tablefmt="rounded_grid"))
    else:
        u.pencil.warning("No websites to index")
    for company in companies_to_index:
        output_file = company['scrape_results']
        index_data(output_file)
        u.pencil.info(f"Company Indexed : {company['company']}")
        sqlite.update_scrape_status(company['company'], "done")


if __name__ == "__main__":

    def sigterm_handler(signum, frame):
        print("SIGTERM received, exiting...")
        os.kill(os.getpid(), signal.SIGINT)
        sys.exit(0)


    signal.signal(signal.SIGTERM, sigterm_handler)
    while True:
        run_worker()
        time.sleep(10)