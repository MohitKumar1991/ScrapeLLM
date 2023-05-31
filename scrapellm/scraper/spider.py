import scrapy
import scrapellm.utils as utils
import time
from scrapy.item import Item, Field
from urllib.parse import urlparse
from unstructured.partition.html import partition_html

class CrawledPage(Item):
    url = Field()
    company = Field()
    html_elements = Field()

class StaticSiteCrawler(scrapy.Spider):
    name = "static_site_crawler"    

    def __init__(self, start_urls, output_file, company='',*args, **kwargs):
        super(StaticSiteCrawler, self).__init__(*args, **kwargs)
        self.logger.info(f"start_urls: {start_urls}")
        self.start_urls = start_urls.split(",")
        self.output_file = output_file
        self.company = company
        self.base_url = urlparse(self.start_urls[0]).scheme + "://" + urlparse(self.start_urls[0]).hostname
        self.allowed_domains = [ urlparse(self.start_urls[0]).hostname ]
        self.seen_links = set()
    
    def parse(self, response):

        # Get the list of links on the page.
        links = response.xpath("//a/@href").getall()
        start_time = time.time()
        html_elements = partition_html(text=response.text)
        end_time = time.time()
        utils.pencil.warning(f"Time taken to partition html: {end_time - start_time}")
        yield CrawledPage(url=response.url, company=self.company, html_elements=html_elements)

        # Filter out any links that we have already crawled.
        links = [ utils.clean_url(utils.make_absolute_url(self.base_url, link)) for link in links ]
        new_links = [ link for link in links if link not in self.seen_links and len(link) > 0 ]

        # Add the new links to the set of seen links.
        self.seen_links.update(new_links)

        # Yield the new links.
        for link in new_links:
            self.logger.info(f"Adding Link {link}")
            yield scrapy.Request(url=link, callback=self.parse)


#4097 tokens is the max length of the input -> text bigger than 800 -> will send top 3 results




