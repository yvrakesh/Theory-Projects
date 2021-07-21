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
int main() {
	key_t key;
	int msg_id;
	key = ftok("msgq1", 65);
	msg_id = msgget(key, 0777 | IPC_CREAT);
	for(int i=1;i<6;i++){
		msgrcv(msg_id, &student, sizeof(student), i, 0);
		printf("Marks of Student %d: %.2f\n",i, student.mark);
	}
	return 0;
}
