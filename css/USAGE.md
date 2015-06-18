# fragment:app or fragment 

> Install Yeoman `npm install -g yo` (one-time global install).

# fragment:css

> The generator works but is pretty basic at this point.

# fragment:html

> The generator works but is pretty basic at this point.

# fragment:js

> The generator works but is pretty basic at this point.

> The sql fragment generator works with methods or object definitions.
>
	{
		_path: 'path to file location',
		anymethod: function(args, $) {
			... method declaration (see below)
		},
		anyobject: {
			... object declaration (see below)
		}
	}


## Method Declaration
> http://knexjs.org/

    buildone: function (args, $) {
		return $.schema.createTable('createTable0', function (table) {
    		table.increments('name');
      	});
    },

## Object Declaration
> text

    buildone: { createTable: 'createTable0', t: [
		{ increments: 'name' }]
	},


# fragment:sql

> The sql fragment generator works with methods or object definitions.
>
	{
		_path: 'path to file location',
		client: 'type of sql client',
		anymethod: function(args, $) {
			... method declaration (see below)
		},
		anyobject: {
			... object declaration (see below)
		}
	}


## Method Declaration
> http://knexjs.org/

    buildone: function (args, $) {
		return $.schema.createTable('createTable0', function (table) {
    		table.increments('name');
      	});
    },

## Object Declaration
> text

    buildone: { createTable: 'createTable0', t: [
		{ increments: 'name' }]
	},
    
### Schema Builder

#### createTable
Creates a new table on the database, with a callback function to modify the table's structure, using the schema-building commands.

    createTable0: { createTable: 'createTable0', t: [] }

#### renameTable
Renames a table **from** a current tableName **to** another.

    renameTable0: { renameTable: { from: 'renameTable0a', to: 'renameTable0b' } }

#### dropTable
Drops a table, specified by **tableName**.

    dropTable0: { dropTable: 'dropTable0' }

#### dropTableIfExists 
Drops a table conditionally if the table exists, specified by **tableName**.

    dropTableIfExists0: { dropTableIfExists: 'dropTableIfExists0' }

#### table
Chooses a database table, and then modifies the table, using the Schema Building functions inside of the callback.

    table0: { table: 'table0', t: [] }

#### raw
Run an arbitrary sql query in the schema builder chain.

    raw0: { raw: 'raw0' }

### Schema Building


#### dropColumn 
Drops a column, specified by the column's name

#### dropColumns 
Drops multiple columns, taking a variable number of column names.

#### renameColumn 
Renames a column from one name to another.

#### increments 
Adds an auto incrementing column, in PostgreSQL this is a serial. This will be used as the primary key for the column. Also available is a bigIncrements if you wish to add a bigint incrementing number (in PostgreSQL bigserial).

#### integer 
Adds an integer column.

#### bigInteger 
In MySQL or PostgreSQL, adds a bigint column, otherwise adds a normal integer. Note that bigint data is returned as a string in queries because JavaScript may be unable to parse them without loss of precision.

#### text 
Adds a text column, with optional textType for MySql text datatype preference. 
textType may be mediumtext or longtext, otherwise defaults to text.

#### string 
Adds a string column, with optional length defaulting to 255.

#### float 
Adds a float column, with optional precision and scale.

#### decimal 
Adds a decimal column, with optional precision and scale.

#### boolean 
Adds a boolean column.

#### date 
Adds a date column.

#### dateTime 
Adds a dateTime column.

#### time 
Adds a time column.

#### timestamp 
Adds a timestamp column, defaults to timestamptz in PostgreSQL, unless true is passed as the second argument. 
Note that the method for defaulting to the current datetime varies from one database to another. For example: PostreSQL requires .defaultTo(knex.raw('now()')), but SQLite3 requires .defaultTo(knex.raw("date('now')")).

#### timestamp 
Adds a created_at and updated_at column on the database, setting these each to dateTime types.

#### binary 
Adds a binary column, with optional length argument for MySQL.

#### enum / enu 
Adds a enum column, (aliased to enu, as enum is a reserved word in javascript).

#### json 
Adds a json column, using the built-in json type in postgresql, defaulting to a text column in older versions of postgresql or in unsupported databases. jsonb can be used by passing true as the second argument.

#### uuid 
Adds a uuid column - this uses the built-in uuid type in postgresql, and falling back to a char(36) in other databases.

#### comment 
Sets the comment for a table.

#### engine 
Sets the engine for the database table, only available within a createTable call, and only applicable to MySQL.

#### charset 
Sets the charset for the database table, only available within a createTable call, and only applicable to MySQL.

#### collate 
Sets the collation for the database table, only available within a createTable call, and only applicable to MySQL.

#### specificType 
Sets a specific type for the column creation, if you'd like to add a column type that isn't supported here.

## Chainable Methods

The following three methods may be chained on the schema building methods, as modifiers to the column.

### index 
Specifies an field as an index. If an indexName is specified, it is used in places of the standard index naming convention of tableName_columnName. The indexType can be optionally specified for PostgreSQL. No-op if this is chained off of a field that cannot be indexed.

### primary 
Sets the field as the primary key for the table. To create a compound primary key, pass an array of column names: table.primary(['column1', 'column2']).

### unique 
Sets the column as unique.

### references 
Sets the "column" that the current column references as a foreign key.

### inTable 
Sets the "table" where the foreign key column is located after calling column.references.

### onDelete 
Sets the SQL command to be run "onDelete".

### onUpdate 
Sets the SQL command to be run "onUpdate".

### defaultTo 
Sets the default value for the column on an insert.

### unsigned 
Specifies an integer as unsigned. No-op if this is chained off of a non-integer field.

### notNullable 
Adds a not null on the current column being created.

### nullable 
Default on column creation, this explicitly sets a field to be nullable.

### first 
Sets the column to be inserted on the first position, only used in MySQL alter tables.

### after 
Sets the column to be inserted after another, only used in MySQL alter tables.

### comment 
Sets the comment for a column.

