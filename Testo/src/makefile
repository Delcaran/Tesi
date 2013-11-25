satoshi: AttackerSuccessProbability.o main.o
	gcc AttackerSuccessProbability.o -lm main.o -o satoshi

AttackerSuccessProbability.o: AttackerSuccessProbability.c implement.h
	gcc -c AttackerSuccessProbability.c -lm

main.o: main.c implement.h
	gcc -c main.c
