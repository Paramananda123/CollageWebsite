import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import sys

def send_email(to_email, full_name, message):
    gmail_user = 'arpan70047@gmail.com'
    app_password = 'xmmy yhoj keta qheq'  

    msg = MIMEMultipart()
    msg['From'] = gmail_user
    msg['To'] = to_email
    msg['Subject'] = 'Thank You for Contacting Us!'

    body = f"Hi {full_name},\n\nThank you for reaching out! We received your message:\n\"{message}\"\n\nWe'll get back to you shortly.\n\nRegards,\nTeam"

    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()  
        server.login(gmail_user, app_password)
        server.sendmail(gmail_user, to_email, msg.as_string())
        server.quit()
        print("Email sent successfully")
        sys.exit(0)
    except Exception as e:
        print(f"Failed to send email: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    recipient_email = sys.argv[1]
    full_name = sys.argv[2]
    message = sys.argv[3]

    send_email(recipient_email, full_name, message)
