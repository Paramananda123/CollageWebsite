import sqlite3

conn = sqlite3.connect('contact.db')

cursor = conn.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        email_id TEXT NOT NULL,
        message TEXT NOT NULL
    )
''')

conn.commit()
conn.close()

print("✅ Database and table created successfully.")
