# generator-fragment

> A [Yeoman](http://yeoman.io) generator for multiple fragments.

## Getting Started

- Install Yeoman `npm install -g yo` (one-time global install).
- Install this generator with `npm install -g generator-fragment` (one-time global install).
- From the terminal, navigate to your site's directory (hint: creating a separate UI directory in the project root works pretty well).
- Type `yo fragment name`, where name is a local name.json file, and wait.

		body of name.json
		{
			css {
				_path: 'path to file location',
				anymethod: function(args, $) {
					... method declaration (see below)
				},
				anyobject: {
					... object declaration (see below)
				},
				anyarray: [
					... recurses [anymethod|anyobject|anyarray]
				]
			},
			html {
				_path: 'path to file location',
				anymethod: function(args, $) {
					... method declaration (see below)
				},
				anyobject: {
					... object declaration (see below)
				},
				anyarray: [
					... recurses [anymethod|anyobject|anyarray]
				]
			},
			js {
				_path: 'path to file location',
				anymethod: function(args, $) {
					... method declaration (see below)
				},
				anyobject: {
					... object declaration (see below)
				},
				anyarray: [
					... recurses [anymethod|anyobject|anyarray]
				]
			},
			sql {
				_path: 'path to file location',
				client: 'type of sql client',
				anymethod: function(args, $) {
					... method declaration (see below)
				},
				anyobject: {
					... object declaration (see below)
				},
				anyarray: [
					... recurses [anymethod|anyobject|anyarray]
				]
			}
		}

- Alternatively type `yo fragment:[css|html|js|sql] name`, where name is a local name.json file, and wait.

		body of name.json
		{
			_path: 'path to file location',
			anymethod: function(args, $) {
				... method declaration (see below)
			},
			anyobject: {
				... object declaration (see below)
			},
			anyarray: [
				... recurses [anymethod|anyobject|anyarray]
			]
		}

see usage: [usage](USAGE.md "usage")


## Development Plans
- The generator works but is pretty basic at this point.

## Changelog
- 0.1.0
  - First commit. Functional but needs work.