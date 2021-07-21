#include<stdio.h>
#include<math.h>
#include<sys/ipc.h>
#include<sys/msg.h>

struct buffer1 {
	long int msg_type;
	float a[5];
	float avg,stddev;
}a;

float standard_deviation(float a[], float avg){
	float s = 0;
	for(int i=0;i<5;i++)
		s += (a[i]-avg)*(a[i]-avg);
	s /= 5;
	return sqrt(s);
}

int main(){
	
	key_t key = ftok("pipe1",65);
	int id = msgget(key, 0777 | IPC_CREAT);
	
	msgrcv(id, &a, sizeof(a), 1, 0);
	
	a.avg = a.a[0]+a.a[1]+a.a[2]+a.a[3]+a.a[4];
	a.avg /= 5;
	
	a.stddev = standard_deviation(a.a, a.avg);
	
	printf("Average of all five thermostats temperatures : %.2f\n", a.avg);
	printf("Standard deviation of all five thermostats temperatures : %.2f\n", a.stddev);
	
	msgctl(id, IPC_RMID, NULL);
	
	key_t key2 = ftok("pipe2", 65);
	int id2 = msgget(key2, 0777 | IPC_CREAT);
	a.msg_type = 1;
	
	msgsnd(id2, &a, sizeof(a), 0);
	
	return 0;
}
