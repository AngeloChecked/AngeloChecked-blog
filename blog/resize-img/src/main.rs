use image::GenericImageView;
use regex::Regex;
use std::{
    env,
    path::{Path, PathBuf},
};

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() > 1 {
        let path = args.get(1).unwrap();

        let path = Path::new(path);

        let file_paths: Vec<PathBuf> = if path.is_dir() {
            path.read_dir()
                .unwrap()
                .map(|res| res.unwrap().path())
                .filter(|path| {
                    let re = Regex::new(r"\.(tiny|small|medium|large)\.[^.]{0,4}$").unwrap();
                    !re.is_match(path.to_str().unwrap())
                })
                .collect()
        } else {
            vec![path.into()]
        };

        for file in file_paths {
            let Ok(img) = image::open(&file) else {
                continue;
            };
            let (width, height) = img.dimensions();
            println!("image size: {width}, {height}");

            resize_to_each_size(&img, file.to_str().unwrap());
        }
    }
}

fn resize_to_each_size(img: &image::DynamicImage, path: &str) {
    let (width, _) = img.dimensions();

    let tiny_width = 300u32;
    let postfix = "tiny";
    if width > tiny_width {
        resize_image_if_not_exists(path, postfix, tiny_width, img);
    }

    let small_width = 480u32;
    let postfix = "small";
    if width > small_width {
        resize_image_if_not_exists(path, postfix, small_width, img);
    }

    let medium_width = 600u32;
    let postfix = "medium";
    if width > medium_width {
        resize_image_if_not_exists(path, postfix, medium_width, img);

        let large_path = path_with_size_postfix(path, "large");
        if !Path::new(large_path.as_str()).exists() {
            img.save(large_path).unwrap();
        }
    }
}

fn resize_image_if_not_exists(
    path: &str,
    postfix: &str,
    small_width: u32,
    img: &image::DynamicImage,
) {
    let small_path = path_with_size_postfix(path, postfix);
    if !Path::new(small_path.as_str()).exists() {
        resize_image(small_width, img, path, postfix);
    }
}

fn resize_image(small: u32, img: &image::DynamicImage, path: &str, postfix: &str) {
    let (width, height) = img.dimensions();
    let (new_w, new_h) = calculate_resize_dimension_by_width(width, height, small);
    println!("{postfix} size: {new_w}, {new_h}");
    let resized_img = img.resize(new_w, new_h, image::imageops::FilterType::Lanczos3);
    let new_path = path_with_size_postfix(path, postfix);
    println!("{new_path}");
    resized_img.save(new_path).unwrap();
}

fn path_with_size_postfix(path: &str, postfix: &str) -> String {
    let re = Regex::new(r"\.([^.]*)$").unwrap();
    let new_path = re.replace(path, format!(".{}.$1", postfix));
    new_path.to_string()
}

fn calculate_resize_dimension_by_width(width: u32, height: u32, new_width: u32) -> (u32, u32) {
    let width_to_remove = width - new_width;

    let w = width as f32;
    let h = height as f32;

    let ratio_height = h / w;
    let height_to_remove = width_to_remove as f32 * ratio_height;
    (new_width, height - height_to_remove as u32)
}