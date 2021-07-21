#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<sys/wait.h>
#include<errno.h>
#include<math.h>

float standard_deviation(float a[],float avg){	
	float s=0;
	// standard deviation is sum of (xi-x)^2 where x is mean and xi is ith array element
	for(int i=0;i<5;i++)
		s += (a[i]-avg)*(a[i]-avg);
	s /= 5;
	return sqrt(s);
}

int main(){
	// Here we need three pipes as given in the question
	int p1[2],p2[2],p3[2];
	pipe(p1);
	pipe(p2);
	pipe(p3);
	
	int pid1 = fork();
	if(pid1 == 0){
		// Child Process 1
		// Close read pipes and write pipes whenever not necessary
		// Since mostly we perform operations on one-sided pipes
		close(p1[1]);
		close(p2[0]);
		close(p3[0]);
		close(p3[1]);
		
		float avg,std_dev, a[5];
		
		
		read(p1[0],a,sizeof(a));
		
		avg = a[0]+a[1]+a[2]+a[3]+a[4];
		avg /= 5;
		
		std_dev = standard_deviation(a,avg);
		write(p2[1],&avg,sizeof(avg));
		write(p2[1],&std_dev,sizeof(std_dev));
		
		close(p1[0]);
		close(p2[1]);
	}
	else{
		int pid2 = fork();
		if(pid2 == 0){
			// Child process 2
			
			close(p1[1]);
			close(p2[1]);
			close(p3[0]);
			
			float avg,std_dev,a[5];
			int b[5];
			read(p1[0],&a,sizeof(a));
			read(p2[0],&avg,sizeof(avg));
			read(p2[0],&std_dev,sizeof(std_dev));
			
			for(int i=0;i<5;i++){
				if(a[i] == avg)
					b[i] = 0;
				else if(a[i] > (avg+std_dev))
					b[i] = 1;
				else if(a[i] > avg && a[i] < (avg + std_dev))
					b[i] = 2;
				else if(a[i] < avg && a[i] > (avg - std_dev))
					b[i] = 3;
				else if(a[i] < (avg - std_dev))
					b[i] = 4;
			}
			
			write(p3[1],&b,sizeof(b));
			
			close(p2[0]);
			close(p1[0]);
			close(p3[1]);
		}
		else{
			close(p1[0]);
			close(p2[0]);
			close(p2[1]);
			close(p3[1]);
			
			float a[5];
			int b[5];
			
			printf("Enter the temperatures in the range 15 deg celsius to 45 deg celsius\n\n");
			for(int i=0;i<5;i++){
				printf("Enter the temperature of thermostat at L%d : ",i+1);
				scanf("%f",&a[i]);
			}
			printf("\n");
			
			write(p1[1], &a, sizeof(a));
			write(p1[1], &a, sizeof(a));
			
			read(p3[0], &b, sizeof(b));
			
			printf("Revised Temperatures at each of the locations \n\n");
			
			for(int i=0;i<5;i++){
				if(b[i] == 1)
					a[i] -= 3;
				else if(b[i] == 2)
					a[i] -= 1.5;
				else if(b[i] == 3)
					a[i] += 2;
				else if(b[i] == 4)
					a[i] += 2.5;
				printf("The revised temperature of thermostat at L%d : %.2f deg celsius\n",i+1,a[i]);
			}
			close(p3[0]);
			close(p1[1]);
		}
	}
	return 0;
}
				
