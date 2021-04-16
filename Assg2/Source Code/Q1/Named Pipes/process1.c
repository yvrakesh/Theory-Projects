#include<stdio.h>
#include<stdlib.h>
#include<sys/ipc.h>
#include<sys/msg.h>

struct buffer1{
	long int msg_type;
	float a[5];
}a;

struct buffer2{
	long int msg_type;
	int b[5];
}a1;


int main(){
	key_t key = ftok("pipe1",65);
	int id = msgget(key,0777|IPC_CREAT);
	
	
	a.msg_type = 1;
	
	printf("Enter the temperaturs of thermostates in the range of 15 deg celsiuc to 45 deg celsius\n");
	for(int i=0;i<5;i++){
		printf("Enter the temperature of thermostat L%d : ",i+1);
		scanf("%f",&a.a[i]);
	}
	msgsnd(id,&a,sizeof(a),0);
	
	
	key_t key1 = ftok("pipe3",65);
	int id1 = msgget(key1,0777|IPC_CREAT);
	
	msgrcv(id1,&a1,sizeof(a1),1,0);
	
	printf("Revised temperatures of the thermostates\n\n");
	
	for(int i=0;i<5;i++){
		if(a1.b[i] == 1)
			a.a[i] -= 3;
		else if(a1.b[i] == 2)
			a.a[i] -= 1.5;
		else if(a1.b[i] == 3)
			a.a[i] += 2;
		else if(a1.b[i] == 4)
			a.a[i] += 2.5;
		printf("The revised temperature of thermostat at L%d : %.2f deg celsius\n",i+1,a.a[i]);
	}
	msgctl(id1,IPC_RMID,NULL);
	return 0;
}
