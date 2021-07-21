import cv2
import numpy as np 
import sys

if len(list(sys.argv))!=2:
    print("Invalid Command\nTry using the command\npython create.py <image_file_name.format>\nEg:python create.py lena.jpg\n")
    sys.exit(1)

# Reading an image into a matrix
img=cv2.imread("Images/"+sys.argv[-1])
try:
    # Re-sizing it to 256 x 256 size
    img=cv2.resize(img,(256,256))
    print("\nImage has been successfully converted into matrix")
except:
    print("Image file doesn't exist")
    print("Always correct give file_name along with its format")
    sys.exit(1)

# Writing the matrix into the file
with open("image.txt","w") as f:
    for i in range(3):
        for x in range(0,255,8):
            for y in range(0,255,8):
                m=img[x:x+8,y:y+8,i]
                m=" ".join(list(map(str,list(m.ravel()))))
                f.write(m)
                f.write("\n")
print("Image has been successfully written into the 'image.txt' file\n")
print("Now simulate 'dct_test1' module using 'dct_tb_final' stimulus which takes 'image.txt' as input and outputs 'out_dct.txt' ")
print("'out_dct.txt' stores the compressed image\n")
print("Set the run lenght to 3.2 ns")
