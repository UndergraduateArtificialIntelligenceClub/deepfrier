from PIL import Image, ImageFilter
import os, os.path

def main():
    for i in os.listdir('input_images/'):
        img = Image.open(f'input_images/{i}')
        img = face(img)
        img = hands(img)
        img = nuke(img, 5)
        img.save(f'output_images/{i}', 'JPEG')

def face(img):
    return img

def hands(img):
    return img

def nuke(img, runs):
    for i in range(runs):
        img = img.filter(ImageFilter.SHARPEN)
    return img

if __name__ == "__main__":
    main()