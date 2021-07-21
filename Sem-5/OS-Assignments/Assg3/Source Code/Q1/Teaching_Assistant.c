#include <stdio.h>
#include <stdlib.h>
#include <sys/ipc.h>
#include <sys/msg.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
struct buf2 {
	long type;
	float marks[5];
}CI;
struct buf3 {
	long type;
	float avg;
	char grades[5]; 
}TA;
int main(){
	key_t key;
	int msg_id;
	key = ftok("msgq1", 65);
	msg_id = msgget(key, 0777 | IPC_CREAT);
	msgrcv(msg_id, &CI, sizeof(CI), 10, 0);
	printf("Marks received by TA from Course Instructor\n");
	// Finding average of 5 students
	for(int i=0;i<5;i++)
		printf("Marks of Student %d: %.2f\n",i+1, CI.marks[i]);
	float sum = 0;
	for ( int i = 0; i < 5; i++)
		sum += CI.marks[i];
	sum /= 5;
	TA.avg = sum;
	for(int i=0;i<5;i++){
		if(CI.marks[i] > 39)
			TA.grades[i] = 'S';
		else if(CI.marks[i] > 29)
			TA.grades[i] = 'A';
		else if(CI.marks[i] > 19)
			TA.grades[i] = 'B';
		else
			TA.grades[i] = 'E';
	}
	TA.type = 100;
	msgsnd(msg_id, &TA, sizeof(TA), 0);
	return 0;
}
