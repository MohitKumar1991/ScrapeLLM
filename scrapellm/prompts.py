from pydantic import BaseModel
import jinja2

"""
I am building a user research tool that can educate the person taking the interview.
Find user research insights on how to talk to users.
Write an email about how I can help an e-commerce D2C brand with how to talk to it's users.
Email should have two sections. One introducing what we do in 2 lines max. The second with how our user research tool can help them increase sales.
"""

SYSTEM_PROMPT_INFORMAL = [
    "You are a startup founder with good communication skills.",
    "Use simple words.",
    "Communicate in a friendly, positive and respectful manner.",
    "Always follow assumptions with phrases like 'if I understand correctly' or 'I hate to presume' ",
]

INFORMAL_PROMPT_TEMPLATE = """
    Own Company Info:  {{own_company_info}}
    Other Company: {{company}}
    About other company:
    <info>
    {{other_company_info}}
    </info>
    Write an email about {{subject}}
    <subject>
    {{subject_info}}
    </subject>
    Use the below structure
    <email>
        Salutation,

        Introduce own company in 2 lines.

        Info about how both companies can collaborate in 3 lines.

        Signature
    </email>
"""


class EmailPrompt(BaseModel):
    emailtype:str
    user_prompt:str

def render_jinja_template(template, **kwargs):
    return jinja2.Template(template).render(**kwargs)

def get_prompt_for_email(company, user_input):
    prompt = INFORMAL_PROMPT_TEMPLATE.format(company=company, user_input=user_input)
    return prompt

def save_prompt_from_attacks(prompt):
    safe_prompt = prompt
    return safe_prompt

def create_prompt_for_email(style, params):
    
    if style == "informal":
        return { 
            "system_messages": SYSTEM_PROMPT_INFORMAL,
            "user_messages": [ render_jinja_template(INFORMAL_PROMPT_TEMPLATE, 
                                                own_company_info=params.get('about_own_company'), 
                                                company=params.get('company'),
                                                other_company_info=params.get('about_other_company'),
                                                subject=params.get('subject'),
                                                subject_info=params.get('about_subject')
                                            ) ]
        }
    else:
        raise Exception("Style not supported")
