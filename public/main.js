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

  fileReader.onloadend = () => {
    let base64 = fileReader.result.replace(
      /^data:image\/(png|jpeg|jpg);base64,/,
      ''
    );
    const img_data_url = rustApp.grayscale(base64);
    const img = document.getElementById('new-img');
    img.src = img_data_url;
    img.classList.add('mt-8');
  };
  input.addEventListener('change', () => {
    fileReader.readAsDataURL(input.files[0]);
  });
}

init();
