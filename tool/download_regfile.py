import pymysql
import os
import subprocess

db_host = '139.162.117.152'
db_name = 'itseed_offical'
db_user = 'root'
db_passwd = 'itseed15'

itseed_db = pymysql.connect(
	host = db_host,
	user = db_user,
	password = db_passwd,
	db = db_name,

)
itseed_cursor = itseed_db.cursor(pymysql.cursors.DictCursor)

if __name__ == '__main__':
	list_email = []
	reg_list = open("final_reg.txt")
	for i in reg_list:
		print(i.rstrip("\n"))
		list_email.append(str(i.rstrip("\n").split(",")[1]).rstrip(" "))
	# query = "select * from user;"
	print(list_email)
	query = "select id, name from user where email in ({})".format(",".join(['"{}"'.format(w) for w in list_email]))
	print(query)
	itseed_cursor.execute(query)
	result = itseed_cursor.fetchall()
	itseed_db.commit()
	tmp = 1
	for i in result:
		print(tmp,i)
		command = "mv ./final_reg/" + str(i["id"]) + " ./final_reg/" + i["name"].replace(" ", "_")
		subprocess.call(command, shell=True)
		tmp += 1
    # query = "select * from user where email in ({})".format(",".join([str(i) for i in list_email]))