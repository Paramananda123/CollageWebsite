import sqlite3


conn = sqlite3.connect('user_data.db')
cursor = conn.cursor()


cursor.execute("DELETE FROM users")

conn.commit()
print("✅ All users deleted successfully.")

cursor.close()
conn.close()
