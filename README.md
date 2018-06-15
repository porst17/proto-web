# Project name

Project description

## Compilation

This project uses several precompilers:

- [pug](https://pugjs.org/) : JS based template engine, used to generate HTML files.
- [sass](http://sass-lang.com/) : CSS precompiler.
- [babel](https://babeljs.io/) : Babel is used (via babelify / browserify) to compile ES6 to browser friendly JS.

Pug, SASS and ES6 sources are in the `src` directory. Compiled files are in the `assets` directory.

To recompile you'll need to install

- node.js
- yarn
- gulp (installed globally)

Then from the root directory run

```
yarn
```

to install the dependencies and

```
gulp default
```

to compile all sources (there are separate tasks for each precompiler).
