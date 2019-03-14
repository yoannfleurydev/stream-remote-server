# Steam Remote

# Installation

## Host Machine

> 💡 Tested on Windows only

- Clone the repository `git clone git@github.com:yoannfleurydev/stream-remote-server.git`
- Install dependencies `yarn install`
- Start the server `yarn start` for Linux 🐧 or `yarn start:win` on Windows 🏁
- Browse [localhost:3000/api/health](http://localhost:3000/api/health) to check if the server is up.

## Docker

> 💡 Tested on Windows **and** in the WSL.

- Build the image `docker build -t <the_image_name> .`
- Start the image `docker run -p 9999:3000 -d <the_image_name>`
- Browse [localhost:9999/api/health](http://localhost:9999/api/health) to check if the server is up.
