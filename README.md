# Install dev tool

env:WSL2(Ubuntu 22.04.2 LTS)

Install rust
```
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Install wasm-pack
```
$ curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
```

Install cargo-generate
```
$ sudo apt install build-essential libssl-dev pkg-config
$ cargo install cargo-generate
```

Install npm
```
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
$ nvm install --lts=gallium
$ npm install npm@latest -g
```

# Build app

Build app
```
$ https://github.com/isNozo/resource-management-simulator.git
$ cd resource-management-simulator/
$ wasm-pack build
$ cd www/
$ npm install
$ npm run start
```
