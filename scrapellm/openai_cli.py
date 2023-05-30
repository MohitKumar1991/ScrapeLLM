from scrapellm.vectorstores.WeaviateStore import WeaviateStore
import utils as u
from typer import Typer
import prompts
from scrapellm.llm import gpt3_5
app = Typer()

context = "Context about the company"
own_company_info = "Our company makes a user research tool that can help you understand your users better by automatically analyzing user interviews."

@app.command()
def email(company:str, about:str, style:str="informal"):
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
    


if __name__ == "__main__":
    app()

