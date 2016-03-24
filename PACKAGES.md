Recommendations for packages to install via `jhi` instead of a full package.

If you have other suggestions, submit via a PR

## Requirements
- It must export one or more functions
- The file must be self contained (no external dependencies)
  - It may `require` modules from the standard `node` API
- The URL must be downloadable (eg, link directly to a raw Github file or Gist)
  - The URL can include a placeholder (eg, $VERSION) the the user can replace (this is not interpolated in anyway)

# NPM packages
These packages are really just a single file.

| npm package (link)                                 | raw file                                                             |
|:---------------------------------------------------|:---------------------------------------------------------------------|
| [left-pad](https://www.npmjs.com/package/left-pad) | https://raw.githubusercontent.com/camwest/left-pad/$VERSION/index.js |

# Gists
These helpers haven't been published, but might be useful to share

| name | description | raw file |
|:-----|:------------|:---------|
| tdb  |             |          |
