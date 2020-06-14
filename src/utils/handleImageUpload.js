async function handleImageUpload(image, type) {
  const data = new FormData()
  data.append('file', image)
  data.append('upload_preset', type === 'avatar' ? 'avatar' : 'tokiwartooth')
  data.append('cloud_name', 'tokiwartooth')
  const response = await fetch('https://api.cloudinary.com/v1_1/tokiwartooth/image/upload', {
    method: 'POST',
    accept: 'application/json',
    body: data
  })
  const json = await response.json()
  return json.url
}

export default handleImageUpload