import logging
import tiktoken
import random
from urllib.parse import urlparse, urlunparse, urljoin

pencil = logging.getLogger(__name__)

class CustomFormatter(logging.Formatter):

    grey = "\x1b[38;20m"
    yellow = "\x1b[33;20m"
    green = "\x1b[32;20m"
    red = "\x1b[31;20m"
    bold_red = "\x1b[31;1m"
    reset = "\x1b[0m"
    format = "%(asctime)s - %(name)s - %(levelname)s - %(message)s (%(filename)s:%(lineno)d)"

    FORMATS = {
        logging.DEBUG: grey + format + reset,
        logging.INFO: green + format + reset,
        logging.WARNING: yellow + format + reset,
        logging.ERROR: red + format + reset,
        logging.CRITICAL: bold_red + format + reset
    }

    def format(self, record):
        log_fmt = self.FORMATS.get(record.levelno)
        formatter = logging.Formatter(log_fmt)
        return formatter.format(record)

# Add the handler to the logger
handler = logging.StreamHandler()
handler.setFormatter(CustomFormatter())
pencil.addHandler(handler)


def clean_url(url_to_clean):
    parsed_url = urlparse(url_to_clean)
    if parsed_url.scheme == 'mailto':
        return ''
    new_url = urlunparse((parsed_url.scheme, parsed_url.netloc, parsed_url.path, '', '', ''))
    return new_url

def make_absolute_url(base_url, url):
    parsed_url = urlparse(url)
    if parsed_url.scheme and parsed_url.netloc:
        # The URL is already absolute
        return url
    else:
        # The URL is relative, so we need to make it absolute
        return urljoin(base_url, url)

# tokenize for gpt-3.5-turbo model
def tokenize(text):
    encoding = tiktoken.encoding_for_model("gpt-3.5-turbo")
    return encoding.encode(text)

def divide_text_into_chunks(text, max_chunk_size, min_overlap_size):
    chunks = []
    start_point = 0
    while start_point < len(text):
        chunks.append(text[start_point:start_point + max_chunk_size])
        start_point = start_point + max_chunk_size - min_overlap_size
    return chunks


def generate_random_text(length=20):
  """Generates a random text of the given length with only a-z and A-Z.

  Args:
    length: The length of the random text to generate.

  Returns:
    A random text of the given length with only a-z and A-Z.
  """

  # Create a list of all possible characters.
  characters = list("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

  # Generate a random string of the given length.
  random_string = "".join(random.choice(characters) for _ in range(length))

  # Return the random string.
  return random_string

COMPANY_SCHEMA = {
            "type": "object",
            "properties": {
                "company_name": {
                    "type": "string",
                    "description": "Name of the Company"
                },
                "company_description_one_line": {
                    "type": "string",
                    "description": "One line description of the company"
                },
                "company_description_tags": {
                    "type": "array",
                    "items": {
                        "type": "string",
                        "description": "Tags are either labels for the company which can be batch numbers like S01,W23,W10,S12 or classification into different types of companies"
                    }
                },
                "company_url": {
                    "type": "string",
                    "description": "URL of the company, can be a relative url like this /companies/stripe"
                },
                "founders": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "founder_name": {
                                "type": "string",
                                "description": "Name of the founder"
                            },
                            "founder_position": {
                                "type": "string",
                                "description": "Role of the founder in the company"
                            }
                        }
                    }
                }
            }
        }