use wasm_bindgen::prelude::*;
use web_sys::console::log_1 as log;
use base64::{encode, decode};
use image::load_from_memory;
use image::ImageOutputFormat::Png;

#[wasm_bindgen]
pub fn grayscale(encoded_file: &str) -> String {
  log(&"Grayscale called".into());

  let base64_to_vector = decode(encoded_file).unwrap();
  log(&"Image decoded".into());

  let mut img = load_from_memory(&base64_to_vector).unwrap();
  log(&"Image loaded".into());

  
  img = img.grayscale();
  log(&"Image converted to grayscale".into());

  let mut buffer = vec![];
  img.write_to(&mut buffer, Png).unwrap();
  log(&"New Image written".into());

  let new_base64 = encode(&buffer);
  let data_url = format!(
    "data:image/png;base64,{}",
    new_base64
  );

  return data_url 
}