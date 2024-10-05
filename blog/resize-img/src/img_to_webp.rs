use image::{DynamicImage, EncodableLayout, GenericImageView, ImageReader};
use std::fs::File;
use std::io::Write;
use std::path::Path;
use webp::{Encoder, WebPMemory};

pub fn image_to_webp(file_path_png: &Path, file_path_webp: &Path) -> Option<()> {
    let image = ImageReader::open(file_path_png).unwrap();
    let image: DynamicImage = image.with_guessed_format().unwrap().decode().unwrap();
    let (w, h) = image.dimensions();
    dbg!(w, h);
    let encoder: Encoder = Encoder::from_image(&image).unwrap();
    let encoded_webp: WebPMemory = encoder.encode(65f32);
    let mut webp_image = File::create(&file_path_webp).unwrap();
    webp_image.write_all(encoded_webp.as_bytes()).unwrap();
    Some(())
}
