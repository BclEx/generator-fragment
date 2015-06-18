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

    { dropColumn: 'columnName' }

#### dropColumns 
Drops multiple columns, taking a variable number of column names.

	{ dropColumns: 'columnNames' }

#### renameColumn 
Renames a column from one name to another.

	{ renameColumn: { from: 'fromName', to: 'toName' } }

#### increments 
Adds an auto incrementing column, in PostgreSQL this is a serial. This will be used as the primary key for the column. Also available is a bigIncrements if you wish to add a bigint incrementing number (in PostgreSQL bigserial).

	{ increments: 'columnName' }

#### integer 
Adds an integer column.

	{ integer: { name: 'columnName' } }

#### bigInteger 
In MySQL or PostgreSQL, adds a bigint column, otherwise adds a normal integer. Note that bigint data is returned as a string in queries because JavaScript may be unable to parse them without loss of precision.

	{ bigInteger: { name: 'columnName' } }

#### text 
Adds a text column, with optional textType for MySql text datatype preference. 
textType may be mediumtext or longtext, otherwise defaults to text.

	{ text: { name: 'columnName', (optional)textType: 'type' } }

#### string 
Adds a string column, with optional length defaulting to 255.

	{ string: { name: 'columnName', (optional)length: 255 } }

#### float 
Adds a float column, with optional precision and scale.

	{ float: { name: 'columnName', (optional)precision: 18, (optional)scale: 18 } }

#### decimal 
Adds a decimal column, with optional precision and scale.

	{ decimal: { name: 'columnName', (optional)precision: 18, (optional)scale: 18 } }

#### boolean 
Adds a boolean column.

	{ boolean: { name: 'columnName' } }

#### date 
Adds a date column.

	{ date: { name: 'columnName' } }

#### dateTime 
Adds a dateTime column.

	{ dateTime: { name: 'columnName' } }

#### time 
Adds a time column.

	{ time: { name: 'columnName' } }

#### timestamp 
Adds a timestamp column, defaults to timestamptz in PostgreSQL, unless true is passed as the second argument. 
Note that the method for defaulting to the current datetime varies from one database to another. For example: PostreSQL requires .defaultTo(knex.raw('now()')), but SQLite3 requires .defaultTo(knex.raw("date('now')")).

	{ timestamp: { name: 'columnName', (optional)standard: '' } }

#### timestamp 
Adds a created_at and updated_at column on the database, setting these each to dateTime types.

	{ timestamps: null }

#### binary 
Adds a binary column, with optional length argument for MySQL.

	{ binary: { name: 'columnName', (optional)length: 255 } }

#### enum / enu 
Adds a enum column, (aliased to enu, as enum is a reserved word in javascript).

	{ enu: { name: 'columnName', values: [] } }

#### json 
Adds a json column, using the built-in json type in postgresql, defaulting to a text column in older versions of postgresql or in unsupported databases. jsonb can be used by passing true as the second argument.

	{ json: { name: 'columnName', (optional)jsonb: '' } }


#### uuid 
Adds a uuid column - this uses the built-in uuid type in postgresql, and falling back to a char(36) in other databases.

	{ uuid: { name: 'columnName' } }

#### comment 
Sets the comment for a table.

	{ comment: 'comment' }

#### engine 
Sets the engine for the database table, only available within a createTable call, and only applicable to MySQL.

	{ engine: 'engine' }

#### charset 
Sets the charset for the database table, only available within a createTable call, and only applicable to MySQL.

	{ charset: 'charset' }

#### collate 
Sets the collation for the database table, only available within a createTable call, and only applicable to MySQL.

	{ collate: 'collate' }


#### specificType 
Sets a specific type for the column creation, if you'd like to add a column type that isn't supported here.

	{ specificType: { name: 'columnName', value: '' } }


## Chainable Methods

The following three methods may be chained on the schema building methods, as modifiers to the column.

### index 
Specifies an field as an index. If an indexName is specified, it is used in places of the standard index naming convention of tableName_columnName. The indexType can be optionally specified for PostgreSQL. No-op if this is chained off of a field that cannot be indexed.

	index: { indexName: 'indexName', indexType: 'indexType' }


### primary 
Sets the field as the primary key for the table. To create a compound primary key, pass an array of column names: table.primary(['column1', 'column2']).

	primary: null

### unique 
Sets the column as unique.

	unique: null

### references 
Sets the "column" that the current column references as a foreign key.

	references: 'reference'

### inTable 
Sets the "table" where the foreign key column is located after calling column.references.

	inTable: 'inTable'

### onDelete 
Sets the SQL command to be run "onDelete".

	onDelete: 'onDelete'

### onUpdate 
Sets the SQL command to be run "onUpdate".

	onUpdate: 'onUpdate'

### defaultTo 
Sets the default value for the column on an insert.

	defaultTo: 'defaultTo'

### unsigned 
Specifies an integer as unsigned. No-op if this is chained off of a non-integer field.

	unsigned: null

### notNullable 
Adds a not null on the current column being created.

	notNullable: null

### nullable 
Default on column creation, this explicitly sets a field to be nullable.

	nullable: null

### first 
Sets the column to be inserted on the first position, only used in MySQL alter tables.

	first: null

### after 
Sets the column to be inserted after another, only used in MySQL alter tables.

	after: 'columnName'

### comment 
Sets the comment for a column.

	comment: 'comment'

