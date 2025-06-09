import sqlite3
import sys


sys.stdout.reconfigure(encoding='utf-8')

full_name = sys.argv[1]
email_id = sys.argv[2]
message = sys.argv[3]

conn = sqlite3.connect('user_data.db')
cursor = conn.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        email_id TEXT NOT NULL,
        message TEXT NOT NULL
    )
''')

cursor.execute('''
    INSERT INTO messages (full_name, email_id, message)
    VALUES (?, ?, ?)
''', (full_name, email_id, message))

conn.commit()
conn.close()

print("✅ Data inserted successfully")
