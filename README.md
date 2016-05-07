# generator-build-tools

A yeoman generator for usual build tools ina frontend project.

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
    - Concat
    - Uglify
    - HTML2JS
    - Less, Sass, Stylus, CSS
    - Lint (eslint) for JavaScript

# Future features:

- More builders
    - Webpack
    - Broccoli?
- More tasks:
    - CSS Lint
    - HTML Lint
    - Dependency injection
    - Unit testing and coverage (karma, mocha)
    - Functional testing (protractor)
