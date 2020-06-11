async function handleImageScanning() {
  let url = "https://res.cloudinary.com/tokiwartooth/image/upload/v1591811377/aoav46tzcdgkxauyeu1r.jpg"
  const response = await fetch('https://tokiwartooth.cognitiveservices.azure.com/', {
    method: 'POST',
    accept: 'application/json',
    headers: {
      'content-type': 'application/json',
      'Ocp-Apim-Subscription-Key': process.env.REACT_APP_IMAGE_PROCESSING_API,
    },
    body: JSON.stringify({
      "url": url
    })
  })
  const json = await response.json()
  console.log(json)
}

export default handleImageScanning