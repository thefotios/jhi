# jhi - Javascript Helper Installer
This is a super lightweight alternative to one liner `npm` packages.
If all you want is to share some helper functions, this is the tool.

This will fetch all desired helpers and put them into your `location` folder (as specified in the config);
It will then create an `index.js` file that exposes all of them.

Be careful
- It *will* clobber any existing files of those names.
- It *will* clobber your `<helpers dir>/index.js`;

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

1. Run `node node_modules/.bin/jhi`

# Caveat
This is a very initial approach to see if there is any value.
There are no tests and minimal error handling.
I'm ok with that for now since this should be a fire and forget and *not* part of a normal build process.

If this crazy experiment shows promise, I will clean things up.

# TODO
- Be smarter about clobbering things
- Be smarter about whether helpers export stuff
