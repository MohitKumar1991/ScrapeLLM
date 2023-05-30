import os

# Import the load_dotenv function from the python-dotenv library.
from dotenv import load_dotenv

# Load the environment variables from the .env file.
load_dotenv()

# Get the value of the DB_USERNAME environment variable.
openai_key = os.getenv("OPENAI_API_KEY")

# Get the value of the DB_PASSWORD environment variable.
openai_org = os.getenv("OPENAI_ORGANIZATION")

sqlite_db = os.getenv("SQLITE_DB", "data/db.sqlite")

weaviate_db_url = os.getenv("WEAVIATE_DB_URL")

weaviate_auth_token = os.getenv("WEAVIATE_AUTH_TOKEN")

WEBSITE_CLASS_NAME = "WebsiteIndex2"

WEBSITE_PROVIDER_SCHEMA = {
            "classes": [{
                "class": WEBSITE_CLASS_NAME,
                "description": "Contains the paragraphs of text along with their embeddings",
                "vectorizer": "none",
                "properties": [{
                    "name": "content",
                    "dataType": ["text"],
                }, {
                    "name": "company",
                    "dataType": ["text"],
                },
                {
                    "name": "url",
                    "dataType": ["text"],
                }]
            }]
        }

