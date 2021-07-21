# Verilog-Project
Verilog Project submitted in group of 5 as a part of Theory course assignment

Used Python files to convert image into 3-Dimensional matrix and to store it in an output file

Total matrix size is 256x256x3 where we took 8x8 matrix on each turn

Used Verilog to compress the image file by making some of the unused bits to zero (Using Discrete Cosine Transform (DCT)) 

Used Zig-Zag pattern to select 32 elements from the 8x8 square and compressed to 32 bits from 64 bits.

Thus there is decrease in sizeof the image. Here the algorithm ensures that the other 32 bits which are removed as nearly 0. 

Hence very less impact on image quality.
