export default function getImgBase64(img) {
  return img.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
}
