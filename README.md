# generator-build-tools

A yeoman generator for usual build tools in a frontend project.

# Usage

Run `yo build-tools` and it will create your build tasks and configs under `build`
folder, `Gruntfile.js/Gulpfile.js` in the root of the project and `package.json`
with all the devDependencies you need.

# Features

- Supported builders:
    - Grunt
    - Gulp
- Tasks:
    - Clean
    - Build (both min and src)
    - Watch
    - Concat
    - Uglify
    - HTML2JS
    - Wrap (dependency injection)
    - Less, Sass, Stylus, CSS
    - Unit testing and coverage (karma, mocha)
    - Functional testing (protractor)
    - Lint (eslint) for JavaScript
    - Doc (jsdoc3)

# Future features:

- More builders
    - Webpack
    - Broccoli?
- More tasks:
    - Babel
    - Connect
    - CSS Lint
    - HTML Lint
