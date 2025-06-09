import sqlite3

conn = sqlite3.connect('user_data.db')
cursor = conn.cursor()

cursor.execute('SELECT * FROM messages')
rows = cursor.fetchall()

if rows:
    print("📥 Messages in the database:")
    for row in rows:
        print(f"ID: {row[0]}, Name: {row[1]}, Email: {row[2]}, Message: {row[3]}")
else:
    print("📭 No messages found in the database.")

conn.close()
