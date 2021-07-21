#include<stdio.h>
#include<ctype.h>
#include<sys/shm.h>
#include<sys/ipc.h>

struct buffer{
	char pass[10];
	int sp_len,char_len,strength,flag;
};

int main(){
	key_t key = ftok("shmfile",65);
	
	int shmid = shmget(key,1024,0666|IPC_CREAT);
	
	struct buffer *mem = (struct buffer *)shmat(shmid,(void*)0,0);
	
	if(mem->sp_len >= mem->char_len)
		mem->strength = 20;
	else
		mem->strength = 200;
	
	if(mem->strength == 200)
		printf("Strong Password\n");
	else if(mem->strength == 20)
		printf("Weak Password\n");
	
	mem->flag = 1;
	
	shmdt(mem);
	
	return 0;
}
