#include<stdio.h>
#include<unistd.h>
#include<sys/ipc.h>
#include<sys/shm.h>

struct buffer{
	char pass[10];
	int sp_len,char_len,strength,flag;
};

int main(){
	key_t key = ftok("shmfile",65);
	
	int shmid = shmget(key,1024,0666|IPC_CREAT);
	
	struct buffer *mem = (struct buffer*) shmat(shmid,(void*)0,0);
	
	printf("Enter the password of length 10 characters : ");
	scanf("%s",mem->pass);
	
	mem->flag = 0;
	
	while(mem->flag == 0)
		sleep(1);
	
	printf("Password Strength : ");
	if(mem->strength == 200)
		printf("Strong\n");
	else if(mem->strength == 20)
		printf("Weak\n");
	
	shmdt(mem);
	
	shmctl(shmid,IPC_RMID,NULL);
	
	return 0;
}
