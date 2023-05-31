import scrapellm.utils as utils
from scrapellm.vectorstores.WeaviateStore import WeaviateStore
from itemadapter import ItemAdapter

import json
import time

class ScrapePipeline:
    def __init__(self):
        self.logger = utils.pencil
        self.write_file = None

    def open_spider(self, spider):
        self.write_file = f"data/{spider.output_file}.jsonl"

    def _write_to_jsonl(self, data): 
        json_string = json.dumps(data)
        with open(self.write_file, "a") as f:
            f.write(json_string + "\n")

    def close_spider(self, spider):
        # for result in self.weaviate.query("Product Market Fit", 5):
        #     self.logger.info(f"Result: {result}")
        self.logger.warning("Closing Spider")

    def process_item(self, item, spider):
        start_time = time.time()
        crawled_page = ItemAdapter(item).asdict()
        # self.weaviate.add_data(crawled_page)
        crawled_page['html_elements'] = [ str(ele) for ele in crawled_page['html_elements'] ]
        page_text = "\n".join(crawled_page['html_elements'])
        page_text_chunks = utils.divide_text_into_chunks(str(page_text), 1200, 200)
        crawled_page['html_elements'] = page_text_chunks
        self._write_to_jsonl(crawled_page)
        end_time = time.time()
        utils.pencil.warning(f"Time taken to process item {crawled_page.get('url')}: {end_time - start_time}")
        return item