#!/usr/bin/env python
 
# USAGE: ./sendgmail.py path_to_filename [assigned_attachment_name]
# if not assign assigned_attachment_name, the attachment is named as original path_to_filename
 
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from smtplib import SMTP
import smtplib
import sys
 
sender = 'itseed17th@gmail.com'
passwd = 'weareitseed17'
receivers = []
receive_list = open("email_list.txt")
for i in receive_list:
	print(i.rstrip("\n"))
	receivers.append(i.rstrip("\n").split(",")[1])

 
emails = [elem.strip().split(',') for elem in receivers]
msg = MIMEMultipart()
msg['Subject'] = "Greeting from 招生團隊"
msg['From'] = sender
msg['To'] = ','.join(receivers)
 
msg.preamble = 'Multipart massage.\n'
part = MIMEText("親愛的學員 暑假快樂\n")
msg.attach(part)
 
# part = MIMEApplication(open(str(sys.argv[1])).read())
report_file = open('email.html')
html = MIMEText(report_file.read(),'html')
msg.attach(html)
# if len(sys.argv) > 2:
#     attachname = str(sys.argv[2])
# else:
#     attachname = str(sys.argv[1])
 
# part.add_header('Content-Disposition', 'attachment', filename=attachname)
# msg.attach(part)
 
smtp = smtplib.SMTP("smtp.gmail.com:587")
smtp.ehlo()
smtp.starttls()
smtp.login(sender, passwd)
 
smtp.sendmail(msg['From'], emails , msg.as_string())
print ('Send mails to',msg['To'])