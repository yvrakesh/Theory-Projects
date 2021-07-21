module dct_tb_final;
integer M,i,j,Matrix,image,out,x,y;
reg  [4095:0]T;
wire [4095:0]T_trans;
reg [4095:0]Q;
reg [4095:0]original;
reg [191:0]ss;
integer zz,k,l;
wire [2047:0]C;
wire [4095:0]P;

dct_test1 dct(C,original,T,T_trans,Q,ss);
mat_transpose transpose(T_trans,T);
initial
	begin

		Matrix=$fopen("Matrix.txt","r");
		image=$fopen("image.txt","r");
		out=$fopen("out_dct.txt","w");

		// Reading the T matrix
		for(i=0;i<64;i=i+1)
		begin
			x=$fscanf(Matrix,"%d",y);
			T[i*64 +: 64]=y;
	
		end
		
		// Reading the Q matrix
		for(i=0;i<64;i=i+1)
		begin
			x=$fscanf(Matrix,"%d",y);
			Q[i*64 +:64]=y;
		
		end

		// Reading the pattern
		for(i=0;i<=31;i=i+1)
		begin
			x=$fscanf(Matrix,"%d",y);
			ss[i*6 +:6]=y;
		
		end
	// 256 x 256 x 3  image has 3072  8 X 8 matrixes
	for(k=0;k<3072;k=k+1) begin

		// Reading each 8 x 8 matrix
		for(i=0;i<64;i=i+1)
		begin
			x=$fscanf(image,"%d",y);
			original[i*64 +:64]=y;
		end 
		#1

		// Writing the compressed file
		for(l=0;l<=31&&k<=3072;l = l+1) begin

		$fwrite(out,"%0d  ",$signed(C[l*64 +:64]));
		end
		$fwrite(out,"\n");
	end	
	$display("\nNow simulate \'idct_test1\' module using \'idct_tb_final\' stimulus which takes \'out_dct.txt\' as input and outputs \'out_idct.txt\'\n ");
	$display("\'out_idct.txt\' stores the decompressed image\n");
	
	end
	
	
endmodule

module idct_tb_final;
integer M,i,j,Matrix,image,out,x,y,k,l;
reg [4095:0]T;
wire [4095:0]T_trans;
reg [4095:0]Q;
wire [4095:0]original;
reg [2047:0]C;
reg [191:0]ss;

idct_test1 idct(original,C,T,T_trans,ss,Q);
mat_transpose transpose(T_trans,T);
initial begin
		Matrix=$fopen("Matrix.txt","r");
		image=$fopen("out_dct.txt","r");
		out=$fopen("out_idct.txt","w");

		// Reading the T matrix
		for(i=0;i<64;i=i+1)
		begin
			x=$fscanf(Matrix,"%d",y);
			T[i*64 +:64]=y;
		end

		// Reading the Q matrix
		for(i=0;i<64;i=i+1)
		begin
			x=$fscanf(Matrix,"%d",y);
			Q[i*64 +:64]=y;
		
		end

		// Reading the pattern
		for(i=0;i<=31;i=i+1)
		begin
			x=$fscanf(Matrix,"%d",y);
			ss[i*6 +:6]=y;
		end

	// 256 x 256 x 3  image has 3072  8 X 8 matrixes
	for(k=0;k<3072;k=k+1) begin
		
		// Reading each decompressed array
		for(i=0;i<=31;i=i+1)
		begin
			x=$fscanf(image,"%d",y);
			C[i*64 +:64]=y;
		end #1

		// Writing the compressed file
		for(l=0;l<=63&&k<=3072;l = l+1) begin

		$fwrite(out,"%0d ",$signed(original[l*64 +:64]));
		end
		$fwrite(out,"\n");
	end
	$display("\nAt last, Run combine.py using the command \npython combine.py <image_file_name.format> \n");
	$display("Image file name is required again to show you the differences between original and decompressed image\n");
	$display("");
	end
	
endmodule