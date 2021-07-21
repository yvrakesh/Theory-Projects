#include<stdio.h>
#include<sys/ipc.h>
#include<sys/msg.h>

struct buffer1{
	long int msg_type;
	float a[5],avg,std_dev;
}a;

struct buffer2{
	long int msg_type;
	int b[5];
}a1;

int main(){
	key_t key = ftok("pipe2",65);
	
	int id = msgget(key, 0777 | IPC_CREAT);
	
	msgrcv(id,&a,sizeof(a),1,0);
	
	for(int i=0;i<5;i++){
		if(a.a[i] == a.avg)
			a1.b[i] = 0;
		else if(a.a[i] > (a.avg + a.std_dev))
			a1.b[i] = 1;
		else if(a.a[i] > a.avg && a.a[i] < a.avg + a.std_dev)
			a1.b[i] = 2;
		else if(a.a[i] < a.avg && a.a[i] > a.avg - a.std_dev)
			a1.b[i] = 3;
		else if (a.a[i] < a.avg - a.std_dev)
			a1.b[i] = 4;
	}
	for(int i=0;i<5;i++)
		printf("Category of thermostat at L%d : Category %d\n",i+1,a1.b[i]);
		
	msgctl(id,IPC_RMID,NULL);
	
	
	key_t key1 = ftok("pipe3",65);
	int id1 = msgget(key1,0777 | IPC_CREAT);
	a1.msg_type = 1;
	msgsnd(id1,&a1,sizeof(a1),0);
	
	
	return 0;
}
			
