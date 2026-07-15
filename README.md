# Arbor

A CLI tool for generating project folder and file structures from a simple blueprint.

## Installation

```bash
npm install -g arbor
```

## Usage

```bash
arbor build <template> [options]
```

### Built-in Templates

Arbor includes ready-to-use templates for popular frameworks:

| Template   | Description                         |
| ---------- | ----------------------------------- |
| `angular`  | Angular project structure           |
| `nodejs`   | Node.js project structure           |
| `nest`     | NestJS project structure            |
| `vue`      | Vue.js project structure            |
| `default`  | Minimal structure with a `src/` dir |

#### Example

```bash
arbor build nodejs
```

This will generate the following structure:

```
src/
  controllers/
  services/
  models/
  middlewares/
  routes/
  utils/
  config/
tests/
  unit/
  integration/
```

### Custom Blueprints

You can also pass a path to your own `.arbor` blueprint file:

```bash
arbor build ./my-project.arbor
```

### Options

| Option              | Description                                                    |
| ------------------- | -------------------------------------------------------------- |
| `--output <dir>`    | Specify an output directory (defaults to the current directory) |
| `--verbose`         | Show detailed error information                                |
| `--no-strict`       | Allow a more lenient template structure (relaxed validation)   |

#### Examples

```bash
arbor build nodejs --output ./my-app
arbor build nest --verbose
arbor build vue --no-strict
```

## Blueprint Syntax

Blueprint files (`.arbor`) use indentation to define the hierarchy of folders and files.

- **Directories** are denoted by a trailing `/`
- **Files** are plain names without a trailing `/`
- Indentation must use multiples of 2 spaces (in strict mode)

### Example Blueprint

```
src/
  controllers/
    userController.js
    authController.js
  services/
    userService.js
  models/
    userModel.js
  index.js
tests/
  unit/
  integration/
```

This blueprint will generate:

```
src/
  controllers/
    userController.js
    authController.js
  services/
    userService.js
  models/
    userModel.js
  index.js
tests/
  unit/
  integration/
```

## Validation (Strict Mode)

By default, Arbor runs in strict mode, which enforces:

- No blank lines allowed in the blueprint
- Indentation must be multiples of 2 spaces
- No indentation jumps of more than one level at a time

You can disable strict mode with `--no-strict`:

```bash
arbor build my-blueprint.arbor --no-strict
```

## Error Handling

Arbor provides descriptive error messages for common issues:

- **TemplateNotFoundError** - The specified template file does not exist
- **ParserTemplateError** - The blueprint file has syntax errors (blank lines, invalid indentation, etc.)
- **InvalidOptionsError** - Invalid command-line options were provided

Use `--verbose` to see full stack traces for debugging.

## Author

Luis Angel Mendoza Lucio

## License

ISC
