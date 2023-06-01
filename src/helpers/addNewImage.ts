import SharpResize from 'utils/resize'

export const addNewImage = (image: Express.Multer.File) => {
  const imageToResize = new SharpResize(image, 'public/uploads', 'webp')
  imageToResize.save('paintings', 800)
  imageToResize.save('thumbnails', 20)
  const { paintings, thumbnails } = imageToResize.fullFilePath()
  return { fullSize: paintings, thumbnail: thumbnails }
}
