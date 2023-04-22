extern crate web_sys;

mod utils;

use wasm_bindgen::prelude::*;

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

use std::collections::HashMap;

#[derive(PartialEq, Eq, Hash, Debug)]
pub enum Resource {
    Worker,
    Water,
    Food
}

#[wasm_bindgen]
pub struct Env {
    resources : HashMap<Resource, usize>
}

#[wasm_bindgen]
impl Env {
    pub fn new() -> Env {
        let mut init_resources = HashMap::new();

        init_resources.insert(Resource::Worker, 1);
        init_resources.insert(Resource::Water, 0);
        init_resources.insert(Resource::Food, 10);

        log!("init: {:?}", init_resources);

        Env {
            resources: init_resources
        }
    }
}