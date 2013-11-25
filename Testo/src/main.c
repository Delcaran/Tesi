#include <stdio.h>
#include "implement.h"

main() 
{
	double P;
	int z;
	FILE *fp;
	char filename[24], *fn_1, *fn_2;
	fn_1 = "risultati_nakamoto_";
	fn_2 = ".dat";
	sprintf(filename, "%s%d%s", fn_1, 1, fn_2);
	fp = fopen(filename, "w");
	for(z=0; z<=50; z++) {
		P = AttackerSuccessProbability(0.1, z);
		fprintf(fp, "%d\t%.7f\n", z, P);
	}
	fclose(fp);
	printf("\n");
	sprintf(filename, "%s%d%s", fn_1, 3, fn_2);
	fp = fopen(filename, "w");
	for(z=0; z<=50; z++) {
		P = AttackerSuccessProbability(0.3, z);
		fprintf(fp, "%d\t%.7f\n", z, P);
	}
	fclose(fp);
	return 0;
}
