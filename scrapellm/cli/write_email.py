from scrapellm.vectorstores.WeaviateStore import WeaviateStore
import scrapellm.utils as u
import os
import time
import json
from tqdm import tqdm
from tabulate import tabulate
from typer import Typer
import scrapellm.prompts as prompts
from scrapellm.llm import gpt3_5
app = Typer()

context = "Context about the company"
own_company_info = "Our company makes a user research tool that can help you understand your users better by automatically analyzing user interviews."

@app.command()
def write_email(company:str, about:str, style:str="informal"):
    #Query weaviate with the about
    #Generate prompt for email
    #Use Context to understand the company
    #Call OpenAi to generate email
    #stream the text to the terminal
    weaviate = WeaviateStore()
    about_subject = weaviate.query(about, {
        "company": company
    })
    about_company = weaviate.query(f"About the company {company}", {
        "company": company
    })
    if not len(context):
        print(f"Found no information on {about} for {company}")
        return
    
    print(f"Found {len(context)} results for {about} for {company}")
    email_prompt = prompts.create_prompt_for_email(style, {
        "about_own_company": own_company_info,
        "company": company,
        "about_other_company": about_company[0]['content'],
        "subject": about,
        "about_subject": about_subject[0]['content']
    })
    tokenized = u.tokenize(email_prompt['user_messages'][0])
    
    u.pencil.warning(f"Email Prompt Generated {len(tokenized)} tokens")
    u.pencil.warning(f"Calling OpenAI")
    openai = gpt3_5.GPT3_5()
    email_text = openai.call_raw_api(email_prompt['system_messages'], email_prompt['user_messages'], temperature=0.2)
    u.pencil.warning(f"Email Generated")
    print(email_text)
    
@app.command()
def indexer(command:str, **kwargs):
    if command == "list":
        #List all files in the data directory
        u.pencil.warning(f"Command List Called")
        files = []
        for file in os.listdir('data'):
            if file.endswith('.jsonl'):
                files.append(file)

        for file in files:
            #print file
            u.pencil.warning(f" File: {file}")
    elif command == "index":
        u.pencil.warning(f"Starting Indexing")
        filename = kwargs.get('filename',None)
        if filename is None:
            raise Exception("Filename is required")
        path = "data/" + filename.replace(".jsonl","") + ".jsonl"
        if not os.path.exists(path):
            u.pencil.error(f"File does not exists {path}")

        #Add Progress Bar for Weaviate Indexing 
        stats = {
            "total_indexed": 0,
            "failed": 0,
            "success": 0,
            "total_time_taken": 0,
            "avg_length": 0
        }

    weaviate = WeaviateStore()
    with open(path, "r") as f:
        for line in tqdm(f,bar_format='{l_bar}{bar:50}{r_bar}'):
            item = json.loads(line)
            weaviate.add_data(item)

    print(tabulate(stats.items(), ['Heading', 'Value'], tablefmt="rounded_grid"))


@app.command()
def index(filename:str):
    u.pencil.warning(f"Starting Indexing")
    path = "data/" + filename.replace(".jsonl","") + ".jsonl"
    if not os.path.exists(path):
        u.pencil.error(f"File does not exists {path}")

    #Add Progress Bar for Weaviate Indexing 
    stats = {
        "total_indexed": 0,
        "failed": 0,
        "success": 0,
        "total_time_taken": 0,
        "avg_length": 0
    }

    weaviate = WeaviateStore()
    with open(path, "r") as f:
        for line in tqdm(f,bar_format='{l_bar}{bar:50}{r_bar}'):
            item = json.loads(line)
            weaviate.add_data(item)

    print(tabulate(stats.items(), ['Heading', 'Value'], tablefmt="rounded_grid"))

@app.command()
def query(company:str, query:str):
    u.pencil.warning(f"Starting Query {company} with {query}")
    weaviate = WeaviateStore()
    start = time.time()
    output = weaviate.query(query, {"k": 3, "company": company})
    end = time.time()
    print(f"Time taken {end - start}")
    print(output)

@app.command()
def delete(company:str, query:str):
    u.pencil.warning(f"Deleting Index")
    weaviate = WeaviateStore()
    start = time.time()
    output = weaviate.delete_schema()
    end = time.time()
    print(f"Time taken {end - start}")
    print(output)
