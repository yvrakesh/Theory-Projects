#include <stdio.h>
#include <stdlib.h>
#include <sys/ipc.h>
#include <sys/msg.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>

struct buf1 {
	long type;
	float mark;
}student;

struct buf2 {
	long type;
	float marks[5];
}CI;

struct buf3 {
	long type;
	float avg;
	char grades[5]; 
}TA;

int main() {
	mkfifo("msgq1", 0777);
	key_t key;
	int msg_id;
	char c;
	key = ftok("msgq1", 65);
	msg_id = msgget(key, 0777 | IPC_CREAT);
	printf("Enter Students Marks\n");
	for(int i=0;i<5;i++)
		scanf("%f",&CI.marks[i]);
	for(int i=0;i<5;i++){
		student.type = i+1;
		student.mark = CI.marks[i];
		msgsnd(msg_id, &student, sizeof(student), 0);
	}
	CI.type = 10;
	msgsnd(msg_id, &CI, sizeof(CI), 0);
	msgrcv(msg_id, &TA, sizeof(TA), 100, 0);
	printf("Class average: %.2f\n",TA.avg);
	printf("Student Grades\n");
	for(int i=0;i<5;i++)
		printf("Grade of Student %d : %c\n",i+1,TA.grades[i]);
	msgctl(msg_id, IPC_RMID, NULL);	
	return 0;
}
