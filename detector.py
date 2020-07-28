
import numpy as np
import cv2 as cv
from matplotlib import pyplot as plt

img = cv.imread('./signs/VM-E20-1_960x960.png')
edges = cv.Canny(img, 100, 200)
plt.subplot(121), plt.imshow(cv.cvtColor(img, cv.COLOR_BGR2RGB))
plt.title('Original Image'), plt.xticks([]), plt.yticks([])
plt.subplot(122), plt.imshow(edges, cmap='gray')
plt.title('Edge Image'), plt.xticks([]), plt.yticks([])
plt.show()
print("hello world")
