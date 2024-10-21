use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn grayscale(image_data: &[u8], width: u32, height: u32) -> Vec<u8> {
    // グレースケール変換処理を実装
    // 例: 各ピクセルのRGB値を平均してグレースケール値を計算
    let mut gray_data = Vec::with_capacity(image_data.len());
    for i in (0..image_data.len()).step_by(4) {
        let r = image_data[i] as f32;
        let g = image_data[i + 1] as f32;
        let b = image_data[i + 2] as f32;
        let gray = (r * 0.2126 + g * 0.7152 + b * 0.0722) as u8;
        gray_data.push(gray);
        gray_data.push(gray);
        gray_data.push(gray);
        gray_data.push(image_data[i + 3]); // アルファ値はそのまま
    }
    gray_data
}