#include<stdio.h>
#include<ctype.h>
#include<sys/ipc.h>
#include<sys/shm.h>

struct buffer{
	char pass[10];
	int sp_len,char_len,strength,flag;
};

int main(){
	key_t key = ftok("shmfile",65);
	
	int shmid = shmget(key,1024,0666|IPC_CREAT);
	
	struct buffer *mem = (struct buffer *)shmat(shmid,(void*)0,0);
	
	mem->sp_len = 0;
	mem->char_len = 0;
	for(int i=0;i<10;i++){
		if(isalnum(mem->pass[i]) != 0)
			mem->sp_len += 1;
		else
			mem->char_len += 1;
	}
	
	printf("Alphanumeric Character count : %d\n",mem->sp_len);
	printf("Special Character count : %d\n",mem->char_len);
	
	shmdt(mem);
	
	return 0;
}
