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
			}
		},
		html {
			_path: 'path to file location',
			anymethod: function(args, $) {
				... method declaration (see below)
			},
			anyobject: {
				... object declaration (see below)
			}
		},
		js {
			_path: 'path to file location',
			anymethod: function(args, $) {
				... method declaration (see below)
			},
			anyobject: {
				... object declaration (see below)
			}
		},
		sql {
			_path: 'path to file location',
			client: 'type of sql client',
			anymethod: function(args, $) {
				... method declaration (see below)
			},
			anyobject: {
				... object declaration (see below)
			}
		}
	}
