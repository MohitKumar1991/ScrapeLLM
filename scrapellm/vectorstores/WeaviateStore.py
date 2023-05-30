import scrapellm.utils as utils
from scrapellm.settings import WEBSITE_CLASS_NAME, WEBSITE_PROVIDER_SCHEMA
import scrapellm.llm.gpt3_5 as gpt3_5
import weaviate
from asyncer import asyncify

class WeaviateStore:
    def __init__(self, class_name=WEBSITE_CLASS_NAME,schema=WEBSITE_PROVIDER_SCHEMA):
        self.class_name = class_name
        self.schema = schema
        self.openai = gpt3_5.GPT3_5()
        self.logger = utils.pencil
        self.df = None
        self.client = weaviate.Client(
            url="https://first-mmqnvtih.weaviate.network/",
            additional_headers={
                "Authorization": "Bearer oo0aIWwB4LhKXwTNGNMbLXoDu0JHMb5oDoKi"
            }
        )
        self.create_schema_if_none()

    def add_data(self, page):
        chunks = page['html_elements']
        page_url = page['url']
        # new_chunks = []
        # for row in chunks:
        #     if len(utils.tokenize(str(row))) > 1200:
        #         new_chunks = new_chunks + utils.divide_text_into_chunks(str(row), 1200, 200)
        #     else:
        #         new_chunks.append(row)
        # chunks = new_chunks
        self.client.batch.configure(batch_size=10)
        with self.client.batch as batch:
            for row in chunks:
                self.logger.warning(f"Fetching embedding for {len(str(row))}")
                text = str(row)
                ebd = self.openai.get_embedding(str(row), "text-embedding-ada-002")
                batch_data = {
                    "content": text,
                    "company": page['company'],
                    "url": page_url
                }
                self.logger.warning(f"Adding to weaviate {len(str(row))}")
                batch.add_data_object(data_object=batch_data, class_name=self.class_name, vector=ebd)

    def create_schema_if_none(self):
        if not self.client.schema.exists(self.class_name):
            self.client.schema.create(self.schema)

    def delete_schema(self):
        self.client.schema.delete_class(self.class_name)

    def get_class_name(self):
        return self.class_name

    def query(self, input_text, params):
        input_embedding = self.openai.get_embedding(input_text, "text-embedding-ada-002")
        vec = {"vector": input_embedding}
        #compose weaviate query from parameters
        w_query = self.client.query.get(self.class_name, ["content","url","_additional {certainty}"])

        w_query = w_query.with_limit(params.get('k', 3))

        if params.get('company', None):
            where_filter = {
                "path": ["company"],
                "operator": "Equal",
                "valueText": params.get('company'),
            }
            w_query = w_query.with_where(where_filter)

        print(w_query.build())

        w_query = w_query.with_near_vector(vec)
        result = w_query.do()

        output = []
        # self.logger.info(result.get('data').get('Get'))
        closest_paragraphs = result.get('data').get('Get').get(self.class_name)
        for p in closest_paragraphs:
            output.append(p)

        return output

    async def aquery(self, input_text, params):
        return await asyncify(self.query)(input_text, params)