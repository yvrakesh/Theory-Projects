/* MATRIX MULTPLICATION */
module mat_mul(c,a,b);

input [4095:0]a;
input [4095:0]b;
output reg [4095:0]c;

integer  i,j,k,x,y,z,sum;
always @ (a or b)
begin
  for(i=0;i<8;i=i+1)
   begin
	for(j=0;j<8;j=j+1)
	begin
	x =  8*i+j;
	sum = 0;
		for(k=0;k<8;k=k+1)
		begin
	y = 8*i+k;
	z = 8*k+j;

	 sum = sum+a[y*64 +:64]*b[z*64 +:64];
	end
	c[x*64 +:64] = sum;
   end
end
end
endmodule

/* MATRIX TRANSPOSE */
module mat_transpose(b,a);
output reg [4095:0]b;
input [4095:0]a;
integer i,j,x,y;
always @ a
begin
	for(i=0;i<8;i=i+1)
  	 begin
		for(j=0;j<8;j=j+1)
		begin
			x = 8*i+j;
			y = 8*j+i;
		b[x*64 +:64] = a[y*64 +:64];
		end
	end
end
endmodule

/* ELEMENT-WISE DIVISION OF 2 MATRICES ALONG WITH ROUND OFF*/
module division(out,inp,q);
input  [4095:0] inp;
input [4095:0]q;
output reg [4095:0] out ;
integer zz;
integer a,b;
integer i;

always@(inp) begin
for(i=0;i<=63;i=i+1)
begin
if(inp[63+64*i]!=1) begin
	a=inp[i*64 +: 64];
	b=q[i*64 +: 64];
	zz=a/b + ((a%b>=b/2)?1:0);
	out[i*64 +: 64]=zz;
end
else begin
	a=~(inp[i*64 +: 64]-1 );
	b=q[i*64 +: 64];
	zz= a/b + ((a%b>=b/2)?1:0);
	out[i*64 +: 64]=~zz+1;
end
	
end
end
endmodule

/*  ELEMENT-WISE MULTIPLICATION OF 2 MATRICES */
module multiply(out,inp,q);
input [4095:0] inp;
input [4095:0]q;
output reg[4095:0] out ;
integer i;


always@(inp) begin

for(i=0;i<=63;i=i+1)
	out[i*64 +: 64]=inp[i*64 +: 64]*q[i*64 +: 64];

end
endmodule

/* ENCODING FIRST 32 CO-EFFICIENTS IN ZIG-ZAG PATTERN */
module encode(zig,W,x);
input [4095:0] W;
output reg [2047:0]zig;

integer i;
integer j,k;
input [191:0]x;

always@(W)
begin
for(i=0;i<=31;i=i+1)
begin

j=x[i*6 +:6];
zig[i*64 +:64]=W[j*64 +:64];

end
end

endmodule

/*  DECODING AND FILLING OTHER CO-EFFICIENTS WITH ZEROES */
module decode(X,C,d);

	input [2047:0]C;

	output reg [4095:0]X;
	input [191:0]d;
	integer i,j;
always@(C)
begin
	X=4095'b0;
 
	
	for(i=0;i<=31;i=i+1)
	begin
	j=d[i*6 +:6];
	X[j*64 +:64]=C[i*64 +:64];
	end

end
endmodule

/* PERFORMS DCT ON 8 X 8 MATRIX  */
/*
Key things to note


*/

module dct_test1(C,M,T,T_,Q,x);
output [2047:0]C;
input [4095:0]M;  // Image 8 X 8 matrix
input [4095:0]T,T_; // T_ is the transpose of T
input [4095:0]Q;  // Quality Matrix 

// pattern
input [191:0]x;

//  8 X 8 matrices
reg [4095:0]X;
wire [4095:0]Y;
wire [4095:0]Z;
wire  [4095:0]W;
wire [4095:0]P;
reg [4095:0]D;

integer i;

always@(M)
begin
	for(i = 0;i <=63;i = i+1)
	begin
		// intializing all elements of D to be 10^6
		D[i*64 +: 64] = 64'd1000000;
		// Element wise subtraction of 128 from M (Image matrix)
		X[i*64 +: 64] = M[i*64 +: 64]-128 ; 
	end
end

// performing Z=TXT' (Matrix multplication) and stored in Z

// Y=TX (matrix multiplication)
mat_mul mat_mul1(Y,T,X);

// Z=YT_ (matrix mltiplication) 
mat_mul mat_mul2(Z,Y,T_);

// Z has to be divided by D and Q elementwise
// Multipling D and Q elementwise 
// W=D.Q
multiply multiply_1(W,D,Q);

// elementwise division of Z by W
// P=Z/W
division division_1(P,Z,W);

// first 32 co-efficients of dct matrix is sufficient to reconstruct the image back
// Encoding P to 32 co-effficients and stores in C
encode encode_1(C,P,x);

endmodule

/* PERFORMS INVERSE DCT TO RECONSTRUCT THE IMAGE BACK */
module idct_test1(N,C,T,T_,ss,Q);

	output reg[4095:0]N;
	input [2047:0]C;  // 32 co-efficients of dct matrix
	input [4095:0]T_,T; // T_ is the transpose of T
	input [4095:0]Q;  // Quality Matrix
	input [191:0]ss;  // pattern

	integer i;

	// 8 X 8 matrices 
	wire [4095:0]X;
	reg [4095:0]Y;
	wire [4095:0]Z;
	wire [4095:0]W;
	wire [4095:0]R;
	wire [4095:0]P;
	
	// decoding the 32 co-efficients back into matrix and filling others with zeros and stores in X
	decode decode_1(X,C,ss);

	// R=X.Q (element wise multiplication)
	multiply multiply_1(R,X,Q);
	
	// performing W=T'RT (matrix multiplication)
	// Z=T'R (matrxi multiplication)
	mat_mul mat_mul_1(Z,T_,R);

	// W=ZT (matrix multiplication)
	mat_mul mat_mul_2(W,Z,T);
	
	// Intializing the all elements of Y to 10^6
	initial
	begin
	for(i=0;i<=63;i=i+1)
	begin
	
	Y[i*64 +: 64] =64'd1000000;

	end
	
	end
	// element wise division of W by Y
	// P=W/Y
	division division_1(P,W,Y);
	
	// Adding back 128 elementwise
	// N=P+128
	always @( P )
	begin
	for(i=0;i<=63;i=i+1)
	begin

	N[i*64 +: 64]=P[i*64 +: 64]+128;

	end
	end
endmodule


