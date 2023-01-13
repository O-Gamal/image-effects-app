async function init() {
  let rustApp = null;

  try {
    rustApp = await import('../pkg');
  } catch (error) {
    console.error(error);
    return;
  }

  console.log(rustApp);

  const input = document.getElementById('upload');
  const fileReader = new FileReader();

  const imagesContainer = document.getElementById('imgs-container');
  // const original = document.getElementById('original-img');
  const img = document.getElementById('new-img');

  fileReader.onloadend = () => {
    let base64 = fileReader.result.replace(
      /^data:image\/(png|jpeg|jpg);base64,/,
      ''
    );

    imagesContainer.classList.add('mt-8');
    // original.src = fileReader.result;

    const img_data_url = rustApp.grayscale(base64);
    img.src = img_data_url;
  };
  input.addEventListener('change', () => {
    fileReader.readAsDataURL(input.files[0]);
  });
}

init();
