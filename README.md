
# ScrapeLLM

ScrapeLLM combines webscraping with LLM Models. It comes in built with a
 - NextJS Dashboard
 - FastAPI Server
 - Connection to Vector DB via Weaviate
 - Connection to an LLM via OpenAI 
 - WebScraping support using Scrapy

Watch the video for an intro to the project

## How to run

   1. Run UI
   2. Run Server
   3. Run Worker


Use ```make ui``` to run the dashboard
Use ```make server``` to run the server
Use ```make worker``` to run the worker that scrapes and indexes into vector store

## Some of the ways this can be used
 - Scrape: Provide a list of websites and ask for information in JSON format
     - Suppose you have a listing website and you need to find all companies which might be relevant to you. You can provide a few examples and some information about companies which might be relevant to you and the scraper will go through each site and collect their information and filter out the websites which are relevant to you.
     - Suppose you need to find some information let's say revenue or company's registered name from a list of pages but there is no structured way to do this. Every page has it listed in a different portion of the page and in different format. You can provide a few examples what that looks like and use it to scrape from those pages without having to write the page.
 - Quick Analysis: Ask questions about the company from the chat assistant format 
    - What are some of the products this company has ?
    - Please summarize what this company does. 
    - How big is the companies' team ?
    - Which tools do they use ?
 - Sales: Compose Emails or Possible Collaboration Ideas using the Website
    - Would this website need our product ?
    - How do they do X ?
    - Can you write an email to the product manager of the company how we could help them?

## Additional Work

- Integrate with https://github.com/resendlabs/react-email for html based emails
- Add additional data sources
    - crunchbase
    - linkedin
    - interview transcripts
    - meeting notes with any person of the company, your own CRM
- Build fast way of testing prompts
- One strategy could be just use the SerpAPI and scrape the top 10 links about this company and add those to the knowledge base
- Improve Speed for Large Websites
- Add support for reading images
- Add support for parsing PDF files
- Add support for other scrapers like ScrapingBee



## Stages of the Pipeline

### Stage 1: Data Scraping Stage
 
 In this stage, we use scrapy to parse the website and scrape data off of the website, convert it into text.
 
 We also add the html to the store as well as information about where this particular html was encountered. This means you can get sources when doing the search.

 Using scrapy means you can get support for both static as well as dynamic websites. You can use scrapy-playwright to enable support for dynamic websites.


### Stage 2: Indexing into Weaviate

 At the moment, Weaviate was picked. It can be replaced anytime by Pinecone or Qdrant. All of them are equally good options for a project of this scale.

 **Cleanup techniques used**

 Embedding has two parts
 1. Converting all info into small sized vectors
 2. Removing and Cleaning noise as well as adding context to make the information richer
 3. Adding page level information to the vector so source can be quoted

 Schema of the information for each text is:

    [{
        "name": "content",
        "dataType": ["text"],
    },
    {
        "name": "anchor_url",
        "dataType": "text",
    }]
    
This text is cleanedup text with extra information for augumenting search.

 **Post Processing** 

### Stage 3: Querying

**Strategy**

There are multiple strategies for effective querying. These can be chosen using LangChain. There is flag. More complex strategies might work better but are much slower.

All of them use both weaviate and langchain to query.You can learn more about these strategies [here](https://weaviate.io/blog/combining-langchain-and-weaviate)

Some things being used to increase speed.

1. Provide smaller prompts and content
2. Stream Response, so it start loading faster on the UI
3. Try to extract structured information in the indexing phase itself
   
Most things which increase speed also reduce cost. 





