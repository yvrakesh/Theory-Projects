import cv2
import numpy as np 
import sys
import os

if len(list(sys.argv))!=2:
    print("Invalid Command")
    print("Try using the command")
    print("python create.py <image_file_name.format>")
    print("Eg:python create.py lena.jpg")
    sys.exit(1)
# Reading the image into a matrix
img=cv2.imread("Images/"+sys.argv[-1])
try:
    # Re-sizing it to 256 x 256 size
    img=cv2.resize(img,(256,256))
    print("\nImage has been successfully converted into matrix\n")
except:
    print("Image file doesn't exist")
    print("Always correct give file_name along with its format")
    sys.exit(1)
# Creating a matrix of all zeros of size 256 x 256 x 3
comp=np.zeros((256,256,3),dtype=np.uint8)

# Storing the file contents of out_idct.txt in  comp variable
with open("out_idct.txt","r") as f:
    for i in range(3):
            for x in range(0,254,8):
                for y in range(0,254,8):
                    zz=f.readline().split()
                    zz=list(map(int,zz))
                    zz=np.reshape(np.uint8(zz),(8,8))
                    comp[x:x+8,y:y+8,i]=zz

# Storing the original image and decompressed image into original.png and compressed.png respectively
if not os.path.exists("Output"):
    os.makedirs("Output")
cv2.imwrite("Output/compressed.png",comp)
cv2.imwrite("Output/original.png",img)
ss=np.zeros((256,512,3),dtype=np.uint8)
ss[:,:256,:]=img
ss[:,256:,:]=comp
cv2.imwrite("Output/compare.png",ss)
print("original image and decompressed image are stored in original.png and compressed.png respectively in Output folder\n")

# To display the above  2 images
cv2.imshow("compare",ss)

print("Press any key to exit ....")
cv2.waitKey(0)