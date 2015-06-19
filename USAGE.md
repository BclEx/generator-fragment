# fragment or fragment:app  

> The fragment generator works with methods or object definitions.

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

see definition: [fragment-app](app/USAGE.md "fragment-app")


# fragment:css

> The css fragment generator works with methods or object definitions.

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

see definition: [fragment-css](css/USAGE.md "fragment-css")


# fragment:html

> The html fragment generator works with methods or object definitions.

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

see definition: [fragment-html](html/USAGE.md "fragment-html")


# fragment:js

> The js fragment generator works with methods or object definitions.

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

see definition: [fragment-js](js/USAGE.md "fragment-js")


# fragment:sql

> The sql fragment generator works with methods or object definitions.

	{
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

see definition: [fragment-sql](sql/USAGE.md "fragment-sql")