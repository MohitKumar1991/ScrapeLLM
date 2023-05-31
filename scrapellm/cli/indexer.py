from tabulate import tabulate
from tqdm import tqdm
import os
import time
import json
import scrapellm.utils as u
from scrapellm.vectorstores.WeaviateStore import WeaviateStore
from typer import Typer
app = Typer()

@app.command()
def list():
    #List all files in the data directory
    u.pencil.warning(f"Command List Called")
    files = []
    for file in os.listdir('data'):
        if file.endswith('.jsonl'):
            files.append(file)

    for file in files:
        #print file
        u.pencil.warning(f" File: {file}")

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


