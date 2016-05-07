# <%= projectName %>

Project generated with *generator-build-tools@<%= version %>*

# Requirements

- node installed
- <%= builder %> installed

# Building

Run ```npm run build``` to build both source app and minified version.

# Build tasks

- default: `npm start`, `<%= builder %>`, default development task, builds the app and sets the watch.
- build: `npm run build`, `<%= builder %> build`, builds the application.
- clean: `npm run clean`, `<%= builder %> clean`, cleans temporary folders, doc and test results.
- doc: `npm run doc`, `<%= builder %> doc`, creates the documentation for the project.
- lint: `npm run lint`, `<%= builder %> lint`, lints JavaScript sources.
- all: `npm run all`, a hook for running all these tasks together.
