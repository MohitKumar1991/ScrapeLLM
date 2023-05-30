from scrapellm.vectorstores.WeaviateStore import WeaviateStore
import llm
from scrapy.crawler import CrawlerProcess

process = CrawlerProcess(
    settings={
        "LOG_LEVEL": 'INFO',
        "ITEM_PIPELINES": {
            "staticpipeline.StaticPipeline": 300
        },
        "DOWNLOAD_DELAY": 0.5
    }
)

#only if on main
if __name__ == "__main__":
    # process.crawl(staticscraper.StaticSiteCrawler, start_urls="http://paulgraham.com/articles.html")
    # process.start()
    w_client = WeaviateStore()
    gptmodel = llm.OpenAiCall()
    prompt_text = []
    while True:
        # Wait for user input
        command = input("Ask the website something: ")
        
        # Check if user wants to exit
        if command == "exit":
            break

        if command != "run":
            prompt_text.append(command)
            continue
        else:
            command_text = "Ask the website something: "


        # Process the command and print the result
        result = w_client.query(command, 3)
        content = gptmodel.call_raw_api(
            system_messages=[
                            "You are a helpful bot.",
                            "If you do not know the answer, say 'I don't know'",
                            "Do not use jargon words and answer everything in very simple language.",
                            "Be specific. Do not repeat the same answer in different ways.",
                            "You can use the following content to answer the question.",
                            result[0]
                            ],
            user_messages=prompt_text,
        )
        print("\n====\n" + content + "\n====\n" )


