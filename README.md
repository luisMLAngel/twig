# Rooti

A CLI tool for generating project folder and file structures from a simple blueprint.

## Installation

```bash
npm install -g rooti
```

## Usage

```bash
rooti build <template> [options]
```

### Built-in Templates

Rooti includes ready-to-use templates for popular frameworks:

| Template  | Description                         |
| --------- | ----------------------------------- |
| `angular` | Angular project structure           |
| `nodejs`  | Node.js project structure           |
| `nest`    | NestJS project structure            |
| `vue`     | Vue.js project structure            |
| `default` | Minimal structure with a `src/` dir |

#### Example

```bash
rooti build nodejs
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

You can also pass a path to your own `.rooti` blueprint file:

```bash
rooti build ./my-project.rooti
```

### Template Resolution Order

When you run `rooti build <template>`, Rooti resolves the template in this order:

1. **Built-in template** — checks if the name matches one of the built-in templates
2. **Custom saved template** — looks for a template saved in `~/.rooti/templates/`
3. **File path** — tries to open the value as a direct file path

### Options

| Option           | Description                                                     |
| ---------------- | --------------------------------------------------------------- |
| `--output <dir>` | Specify an output directory (defaults to the current directory) |
| `--verbose`      | Show detailed error information                                 |
| `--no-strict`    | Allow a more lenient template structure (relaxed validation)    |

#### Examples

```bash
rooti build nodejs --output ./my-app
rooti build nest --verbose
rooti build vue --no-strict
```

---

## Template Management

Rooti allows you to save, list, inspect, update, and remove custom templates. Templates are stored locally in `~/.rooti/templates/`.

### Commands

#### Add a template

Save a `.rooti` file as a named template:

```bash
rooti template add ./angular.rooti --name my-angular
```

#### Remove a template

Delete a saved template by name:

```bash
rooti template remove my-angular
```

#### List templates

Show all saved custom templates:

```bash
rooti template list
```

#### Inspect a template

Display metadata and the full structure tree of a saved template:

```bash
rooti template info my-angular
```

Example output:

```
  Name: angular
  Path: /Users/john/.rooti/templates/angular.rooti
  Size: 281 bytes
  Modified: 2026-07-16

 Content:

├── core
│   ├── guards
│   │   └── auth.guard.ts
│   ├── interceptors
│   │   └── auth.interceptor.ts
│   └── services
├── features
│   ├── home
│   └── auth
│       ├── pages
│       │   └── login
│       │       ├── login.page.ts
│       │       └── login.page.html
│       ├── components
│       └── form
│           └── login.form.ts
├── shared
│   ├── components
│   ├── directives
│   └── pipes
└── layouts
```

#### Update a template

Replace the content of an existing saved template with a new `.rooti` file:

```bash
rooti template update my-angular ./new-angular.rooti
```

---

## Blueprint Syntax

Blueprint files (`.rooti`) use indentation to define the hierarchy of folders and files.

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

### Default Structures

#### Angular

```
core/
  guards/
    auth.guard.ts
  interceptors/
    auth.interceptor.ts
  services/
features/
  home/
  auth/
    pages/
      login/
        login.page.ts
        login.page.html
    components/
    form/
      login.form.ts
shared/
  components/
  directives/
  pipes/
layouts/
```

#### Node.js

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

#### NestJS

```
src/
  modules/
  common/
  config/
test/
```

#### Vue

```
src/
  components/
  views/
  store/
  router/
  assets/
  utils/
public/
```

## Validation (Strict Mode)

By default, Rooti runs in strict mode, which enforces:

- No blank lines allowed in the blueprint
- Indentation must be multiples of 2 spaces
- No indentation jumps of more than one level at a time

You can disable strict mode with `--no-strict`:

```bash
rooti build my-blueprint.rooti --no-strict
```

## Error Handling

Rooti provides descriptive error messages for common issues:

| Error                            | Description                                                     |
| -------------------------------- | --------------------------------------------------------------- |
| `TemplateNotFoundError`          | The specified template file does not exist                      |
| `ParserTemplateError`            | The blueprint file has syntax errors (blank lines, indentation) |
| `InvalidOptionsError`            | Invalid command-line options were provided                      |
| `TemplateNameAlreadyExistsError` | The template name is already in use by a built-in or custom one |
| `EmptyTemplateError`             | The `.rooti` file is empty                                      |
| `TemplateNameIsRequiredError`    | No template name was provided                                   |

Use `--verbose` to see full stack traces for debugging.

## Author

Luis Angel Mendoza Lucio

## License

ISC
