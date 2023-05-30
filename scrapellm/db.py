import sqlite3
from datetime import datetime
from scrapellm.settings import sqlite_db as DBPATH

class SqliteDB():
    def __init__(self):
        # Create a connection to the database
        self.conn = sqlite3.connect(DBPATH)
        cur = self.conn.cursor()
        # Create a table
        cur.execute('''
            CREATE TABLE IF NOT EXISTS companies (
            company TEXT PRIMARY KEY,
            timestamp DATETIME NOT NULL,
            website TEXT NOT NULL,
            scraped INTEGER DEFAULT 0
            );
            ''')
            # Insert a row into the table
        self.conn.commit()
    
    def add_company(self, company, company_url):
        cur = self.conn.cursor()

        cur.execute('''
            INSERT INTO companies (company, website, timestamp)
            VALUES (?, ?, ?)
            ''', (company, company_url, datetime.now()))

        # Commit the changes to the database
        self.conn.commit()

    def get_companies(self):
        cur = self.conn.cursor()

        cur.execute('SELECT * FROM companies')
        results = cur.fetchall()
        
        return results



    def close(self):
        self.conn.close()
