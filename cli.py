from typer import Typer
from scrapellm.experiments.scraper import Scraper
import json
import logging
import asyncio
from scrapellm.experiments.dynamic import get_soup_from_dynamic_url
from scrapellm.experiments.parallel_requests import process_api_requests_from_file
app = Typer()
logging.basicConfig(level=logging.WARN)

"""
I am scraping some data from a website and running some processing job on it. The processing job is slow and can take a long amount of time. Once the data is scraped I am going to store the data in a file. Then I will do the processing one by one on the data by loading it from the file, processing it and storing the data into a temporary csv file. 

Write a simple python3 function that takes a scrape function, stores the result of that function in a json file. The scrape function returns a list of tasks. It stores each task into the json file with a field called processed, set it false and a field called result which is empty initially. It then calls the process function which returns the result. It then stores the result into the json field for that task.
"""

@app.command()
def scrape_yc_site(url: str, dynamic: bool = False):
    print('url is {}.'.format(url))
    #STEP 1 - Fetch the HTML into sections
    batches = ['S05', 'W06', 'S06', 'W07', 'S07', 'S08', 'W09', 'S09', 'W10', 'S10', 'W11', 'S11', 'S12', 'W13', 'S13', 'W14', 'S14', 'W15', 'S15', 'S16', 'W17', 'S17', 'W18', 'S18', 'S19', 'W20', 'S20', 'W21', 'S21', 'S22', 'W23']
    all_sections = []
    for batch in batches:
        logging.warning(f'Scraping Batch: {batch}')
        batch_url = f'https://www.ycombinator.com/companies?batch={batch}'
        scraper = Scraper()
        if dynamic:
            soup = get_soup_from_dynamic_url(batch_url)
        else:
            soup = scraper.scrape_url(batch_url)
        #STEP 2 - Clean up the HTML
        scraper.cleanup_soup(soup)
        #STEP 3 - Divide into sections
        # results = []
        sections = []
        if scraper.get_soup_token_length(soup) > 3500:
            sections = scraper.divide_into_subsections(soup, 'a.WxyYeI15LZ5U_DOM0z8F')
        else:
            sections = [soup.prettify()]
        
        logging.warning(f'Scraped batch and divided into: {len(sections)} sections')
        all_sections = all_sections + [ [batch, section] for section in sections ]
    
    logging.warning(f'Extracted all sections from pages: {len(all_sections)}')
    with open('prompts.jsonl', 'w') as f:
        for section in all_sections:
        #create a jsonl file with the prompts
            json_string = json.dumps({
                "prompt": section[1],
            })
            f.write(json_string + "\n")

    logging.warning('All sections written to prompts.jsonl file')
    #STEP 5 - Call OpenAI API on each section 
    asyncio.run(
        process_api_requests_from_file(
            requests_filepath='prompts.jsonl',
            save_filepath='prompts_result.jsonl',
            # api_key=args.api_key,
            max_requests_per_minute=float(60),
            max_tokens_per_minute=float(60000),
            max_attempts=int(2)
        )
    )
                
    #Store this result into a json file inside the data folder. Create data folder if does not exists
    #create data folder if does not exist
    # if not os.path.exists('data'):
    #     os.makedirs('data')

    # with open(f'data/{batch}.json', 'w') as outfile:
    #     json.dump(results, outfile)