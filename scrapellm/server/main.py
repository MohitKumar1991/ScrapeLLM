"""
This is a fast api server which only returns json response. This server has the following apis:
1. GenerateEmail: Post API to generate email with the post parameters
    - own company information
    - subject of the email
    - style of the email
    - the company you want to send the email to

2. AddCompanyToDB: Post API to add a company and website to the database
    - takes a company name
    - takes a company url
    - Starts a scraper to scrape the website

3. GetVectorResults: Get API to search for a text in the app.state.vectordb database
    - takes a text
    - takes a limit number
    - Returns a list of answers with similarity matching

4. GetHomeInfo: Get API for the start screen which shows the following info
    - List of companies that have been indexed
    - Currently running scrapers
    - Information about the app.state.vectordb database

"""
import scrapellm.vectorstores.WeaviateStore as scraper
import scrapellm.prompts as prompts
import scrapellm.utils as u
import scrapellm.llm.gpt3_5 as gpt3_5
from fastapi import FastAPI
from asyncer import asyncify
from ..db import SqliteDB
from fastapi.responses import JSONResponse

app = FastAPI()

# Register a function to be called when the server starts up
@app.on_event('startup')
async def startup():
    # Store the connection in the app's state
    app.state.db = SqliteDB()
    app.state.vectordb = scraper.WeaviateStore()

@app.on_event('shutdown')
async def shutdown():
    # Close the connection to the database
    app.state.db.close()


# Define the GenerateEmail API
@app.post("/generate-email")
async def generate_email(
    own_company_info: str,
    subject: str,
    style: str,
    company: str,
):
    subject_dbinfo = await app.state.vectordb.aquery(subject, {
        "company": company
    })
    about_company = await app.state.vectordb.aquery(f"About the company {company}", {
        "company": company
    })
    
    email_prompt = prompts.create_prompt_for_email(style, {
        "about_own_company": own_company_info,
        "company": company,
        "about_other_company": about_company[0]['content'],
        "subject": subject,
        "about_subject": subject_dbinfo[0]['content']
    })
    tokenized = u.tokenize(email_prompt['user_messages'][0])
    
    u.pencil.warning(f"Email Prompt Generated {len(tokenized)} tokens")
    u.pencil.warning(f"Calling OpenAI")
    openai = gpt3_5.GPT3_5()
    email_text = await openai.call_raw_api_async(email_prompt['system_messages'], email_prompt['user_messages'], temperature=0.2)
    u.pencil.warning(f"Email Generated")
    print(email_text)

    # Return the email as JSON
    return JSONResponse({
        "email": email_text
    })

# Define the AddCompanyToDB API
@app.get("/add-company")
async def add_company_to_db(
    company_name: str,
    company_url: str,
):
    # Add the company to the database
    app.state.db.add_company(company_name, company_url)

    # Return a success message
    return JSONResponse({"message": "Company added to database"})

# Define the GetVectorResults API
@app.get("/query-db")
async def get_vector_results(query: str, company: str, limit: int):
    # Search for the text in the app.state.vectordb database
    results = await asyncify(app.state.vectordb.query)(query, {"k": limit, "company": company})
    
    # Return the results as JSON
    return JSONResponse(results)

# Define the GetHomeInfo API
@app.get("/home")
async def get_home_info():
    # Get the list of companies that have been indexed
    
    indexed_companies = app.state.db.get_companies()

    # Get the list of currently running scrapers
    running_scrapers = ["scraper_info", "scraper2"]

    # Get information about the app.state.vectordb database
    app.state.vectordb_info = "No idea what this information is"

    # Return the home info as JSON
    return JSONResponse({
        "indexed_companies": indexed_companies,
        "running_scrapers": running_scrapers,
        "app.state.vectordb_info": app.state.vectordb_info,
    })

# Start the server
if __name__ == "__main__":
    app.run(debug=True)