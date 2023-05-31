import sqlite3
import json
from datetime import datetime
from tabulate import tabulate
from scrapellm.settings import sqlite_db as DBPATH

class SqliteDB():
    def __init__(self):
        # Create a connection to the database
        self.conn = sqlite3.connect(DBPATH)
        cur = self.conn.cursor()
        # Create a table
        #status values are added -> scraped -> done, added -> failed
        cur.execute('''
            CREATE TABLE IF NOT EXISTS companies (
            company TEXT PRIMARY KEY,
            timestamp DATETIME NOT NULL,
            website TEXT NOT NULL,
            status TEXT DEFAULT "added",
            scrape_results TEXT DEFAULT "{}"
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
        columns = list(zip(*cur.description))[0]
        results = [ dict(zip(columns,row)) for row in results ]
        
        return results
    
    def print_companies(self):
        companies = self.get_companies()
        print(tabulate([ company.values() for company in companies], companies[0].keys(), tablefmt="rounded_grid"))
    
    def update_scrape_status(self, company, status, output_file=''):
        cur = self.conn.cursor()
        if len(output_file) > 0:
            cur.execute('''
                UPDATE companies
                SET status = ?,
                scrape_results = ?
                WHERE company = ?
                ''', (status, output_file, company))
        else:
            cur.execute('''
                UPDATE companies
                SET status = ?
                WHERE company = ?
                ''', (status, company))

        # Commit the changes to the database
        self.conn.commit()

    def close(self):
        self.conn.close()
