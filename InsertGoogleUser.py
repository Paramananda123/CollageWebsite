import sqlite3
import sys

try:
    first_name = sys.argv[1]
    last_name = sys.argv[2]
    email = sys.argv[3]

    conn = sqlite3.connect('user_data.db')
    cursor = conn.cursor()

    cursor.execute('''
        INSERT OR IGNORE INTO users (first_name, last_name, email, phone_number, password, confirm_password, gender)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (
        first_name,
        last_name,
        email,
        '',
        '',
        '',
        'Google'
    ))

    conn.commit()
    print("✅ User stored via Google login")
except Exception as e:
    print(f"❌ Error storing user: {e}")
finally:
    conn.close()
