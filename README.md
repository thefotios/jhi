[<img src="https://nodei.co/npm/jhi.png?downloads=true" "NPM Badge">](https://www.npmjs.com/package/jhi)

# jhi - Javascript Helper Installer
This is a super lightweight alternative to one liner `npm` packages.
If all you want is to share some helper functions, this is the tool.

This will fetch all desired helpers and put them into your `location` folder (as specified in the config);
It will then create an `index.js` file that exposes all of them.

It *will* clobber any existing files of those names.
It *will* clobber your `index.js`;

## Requirements
Any helpers downloaded must be "requirable" (eg, it must export something).

See `PACKAGES.md` for some recommendations.

## Usage

1. Add a `.jhirc` file to your application.

    ```
    {
      "location": "lib/helpers",
      "helpers": {
        "leftpad": "https://raw.githubusercontent.com/camwest/left-pad/v1.0.1/index.js"
      }
    }
    ```

1. Run `node_modules/.bin/jhi`

# TODO
- Be smarter about clobbering things
- Be smarter about whether helpers export stuff
