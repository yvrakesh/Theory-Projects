#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
int safe_state(int n, int m, int *Avail, int (*Need)[m], int (*Alloc)[m]){
	int work[m], seq[n], Completed[n];
	for(int i=0;i<m;i++)
		work[i] = Avail[i];
	for(int i=0;i<n;i++)
		Completed[i] = 0;
	int i, j, k = 0;
	while(k < n){
		int flag = 0;
		for(i=0;i < n;i++){
			if(Completed[i] == 0){
				for(j=0;j<m;j++)
					if(Need[i][j] > work[j])
						break;
				if(j == m){
					seq[k] = i;
					k++;
					Completed[i] = 1;
					flag = 1;
					for(j=0;j<m;j++)
						work[j] += Alloc[i][j];
				}
			}
		}
		if(flag == 0)
			break;
	}
	if(k < n){
		printf("Machine is in Unsafe state\n");
		return 0;
	}
	else{
		printf("Machine is in Safe state\n");
		printf("Safe sequence\n");
		printf("-------------\n");
		for(int i=0;i<n;i++)
			printf("%d ",seq[i]);
		printf("\n");
		return 1;
	}
}

bool isSafe(int *seq, int n, int m, int *Avail, int (*Need)[m], int (*Alloc)[m]){
	int work[m];
	for(int i=0;i<m;i++)
		work[i] = Avail[i];
	for(int i=0;i<n;i++){
		int j;
		for(j=0;j<m;j++){
			if(Need[seq[i]][j] > work[j])
				break;
		}
		if(j == m){
			for(j=0;j<m;j++)
				work[j] += Alloc[seq[i]][j];
		}
		else
			return 0;
	}
	return 1;
}

int main(){
	int n, m, t;
	char str[100];
	scanf("%s",str);
	scanf("%d",&n);
	scanf("%s",str);
	scanf("%d",&m);
	int Alloc[n][m], Max[n][m], Inst_count[m], Avail[m], Need[n][m];
	scanf("%s",str);
	for(int i=0;i<n;i++)
		for(int j=0;j<m;j++)
			scanf("%d",&Alloc[i][j]);
	scanf("%s",str);
	for(int i=0;i<n;i++)
		for(int j=0;j<m;j++)
			scanf("%d",&Max[i][j]);			
	scanf("%s",str);
	for(int i=0;i<m;i++)
		scanf("%d",&Inst_count[i]);
	printf("Allocation Table\n");
	printf("----------------\n");
	for(int i=0;i<n;i++){
		for(int j=0;j<m;j++)
			printf("%d ",Alloc[i][j]);
		printf("\n");
	}
	printf("Max Table\n");
	printf("---------\n");
	for(int i=0;i<n;i++){
		for(int j=0;j<m;j++)
			printf("%d ",Max[i][j]);
		printf("\n");
	}
	printf("Available Table\n");
	printf("---------------\n");
	for(int i=0;i<m;i++){
		int sum = 0;
		for(int j=0;j<n;j++)
			sum += Alloc[j][i];
		Avail[i] = Inst_count[i] - sum;
		printf("%d ",Avail[i]);
	}
	printf("\n");
	printf("Need Table\n");
	printf("----------\n");
	for(int i=0;i<n;i++){
		for(int j=0;j<m;j++){
			Need[i][j] = Max[i][j] - Alloc[i][j];
			printf("%d ",Need[i][j]);
		}
		printf("\n");
	}
	t = safe_state(n, m, Avail, Need, Alloc);
	int pseq[n];
	scanf("%s",str);
	for(int i=0;i<n;i++)
		scanf("%d", &pseq[i]);
	t = isSafe(pseq, n, m, Avail, Need, Alloc);
	if(t == 1){
		printf("The sequence  ");
		for(int i=0;i<n;i++)
			printf("%d ",pseq[i]);
		printf("  is in SAFE STATE\n");
	}
	else{
		printf("The sequence  ");
		for(int i=0;i<n;i++)
			printf("%d ",pseq[i]);
		printf("  is in UNSAFE STATE\n");
	}
	int p, Request[m];
	scanf("%s",str);
	scanf("%d",&p);
	scanf("%s",str);
	for(int i=0;i<m;i++)
		scanf("%d", &Request[i]);
	for(int i=0;i<m;i++){
		if((Alloc[p][i] + Request[i]) > Max[p][i]){
			printf("The Process %d can't hold %d more instances of resource type %d, as it exceeds its maximum capacity.\n",p, Request[i],i);
			printf("Error encountered closing the program\n");
			return 0;
		}
	}
	for(int i=0;i<m;i++){
		if(Avail[i] < Request[i]){
			printf("Can't process the request.Available resource instances of resource type %d are less than requested resource instances.\n",i);
			return 0;
		}
	}
	for(int i=0;i<m;i++){
		Avail[i] -= Request[i];
		Alloc[p][i] += Request[i];
		Need[p][i] -= Request[i];
	}
	t = safe_state(n, m, Avail, Need, Alloc);
	if(t == 1)
		printf("Request can be granted\n");
	else
		printf("Request can't be granted\n");
	return 0;
}
