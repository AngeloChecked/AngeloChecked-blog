use image::GenericImageView;
use regex::Regex;
use std::{
    env,
    path::{Path, PathBuf},
};

mod img_to_webp;

const MAX_WIDTH: u32 = 800;

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
                    let re = Regex::new(
                        r"\.[0-9]{1,4}x[0-9]{1,4}\.(tiny|small|medium|large)\.[^.]{0,4}$",
                    )
                    .unwrap();
                    !re.is_match(path.to_str().unwrap())
                })
                .collect()
        } else {
            vec![path.into()]
        };

        for file in file_paths {
            let mut file = file;
            if file.extension().map_or(false, |ext| {
                ["png".to_string(), "jpg".to_string(), "jpeg".to_string()]
                    .contains(&ext.to_str().unwrap().to_string())
            }) {
                let filename_original_image = file.file_stem().unwrap().to_str().unwrap();
                let webp_file_path = file.with_file_name(format!("{filename_original_image}.webp"));
                if !webp_file_path.exists() {
                    img_to_webp::image_to_webp(&file, &webp_file_path);
                    file = webp_file_path;
                }
            }

            let Ok(img) = image::open(&file) else {
                continue;
            };
            let (width, height) = img.dimensions();
            println!("image size: {width}, {height}");

            resize_to_each_size(&img, &file);
        }
    }
}

fn resize_to_each_size(img: &image::DynamicImage, path: &Path) {
    let (width, height) = img.dimensions();

    let tiny_width = 300u32;
    let postfix = ".tiny";
    if width > tiny_width {
        resize_image_if_not_exists(&path, postfix, tiny_width, img);
    }

    let small_width = 480u32;
    let postfix = ".small";
    if width > small_width {
        resize_image_if_not_exists(path, postfix, small_width, img);
    }

    let medium_width = 600u32;
    let postfix = ".medium";
    if width > medium_width {
        resize_image_if_not_exists(path, postfix, medium_width, img);

        if width > MAX_WIDTH {
            resize_image_if_not_exists(path, ".large", MAX_WIDTH, img);
        } else {
            resize_image_if_not_exists(path, ".large", width, img);
        }
    }

    if width > MAX_WIDTH {
        resize_image_if_not_exists(path, "", MAX_WIDTH, img);
    } else {
        let as_is_with_sizes = path_with_size_postfix(path, format!("{width}x{height}").as_str());
        if !as_is_with_sizes.exists() {
            img.save(as_is_with_sizes).unwrap();
        }
    }
}

fn resize_image_if_not_exists(
    path: &Path,
    postfix: &str,
    new_width: u32,
    img: &image::DynamicImage,
) {
    let (width, height) = img.dimensions();
    let (new_w, new_h) = calculate_resize_dimension_by_width(width, height, new_width);
    let into_path = path_with_size_postfix(&path, format!("{new_w}x{new_h}{postfix}").as_str());
    if into_path.exists() {
        return;
    }
    let into_path_dbg = into_path.to_str().unwrap();
    println!("{into_path_dbg} size: {new_w}, {new_h}");
    let resized_img = img.resize(new_w, new_h, image::imageops::FilterType::Lanczos3);
    println!("{}", into_path_dbg);
    resized_img.save(into_path).unwrap();
}

fn path_with_size_postfix(path: &Path, postfix: &str) -> PathBuf {
    let file_name = path.file_stem().unwrap().to_str().unwrap();
    let file_extension = path.extension().unwrap().to_str().unwrap();
    let new_path = path.with_file_name(format!(
        "{file_name}.{postfix}.{file_extension}",
        file_name = file_name,
        postfix = postfix,
        file_extension = file_extension
    ));
    new_path
}

fn calculate_resize_dimension_by_width(width: u32, height: u32, new_width: u32) -> (u32, u32) {
    let width_to_remove = width - new_width;

    let w = width as f32;
    let h = height as f32;

    let ratio_height = h / w;
    let height_to_remove = width_to_remove as f32 * ratio_height;
    (new_width, height - height_to_remove as u32)
}
