exports.up = function (knex) {
  // create tables
  return knex.schema
    .createTable("users", function (table) {
      table.increments("id"); // users primary key
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("email").notNullable();
    })
    .createTable("recipes", function (table) {
      table.increments("id"); // posts primary key
      table.integer("user_id").unsigned().notNullable();
      table.string("title", 30).notNullable();
      table.string("content").notNullable();
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("ingredients", function (table) {
      table.increments("id"); // posts primary key
      table.string("name").notNullable();
      table.string("default_unit_id").notNullable();
      table
        .foreign("default_unit_id")
        .references("id")
        .inTable("units")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("units", function (table) {
      table.increments("id"); // posts primary key
      table.string("unit").notNullable();
    })
    .createTable("grocery_list", function (table) {
      table.increments("id"); // posts primary key
      table.integer("user_id").unsigned().notNullable();
      table.string("shared_users");
      table.integer("ingredient_id").unsigned().notNullable();
      table.string("ingredient_qty").unsigned().notNullable();
      table.string("ingredient_unit_id").unsigned().notNullable();
      table.string("ingredient_brand");
      table.string("ingredient_shelf_life");
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .foreign("ingredient_id")
        .references("id")
        .inTable("ingredients")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .foreign("ingredient_unit_id")
        .references("id")
        .inTable("units")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("pantry", function (table) {
      table.increments("id"); // posts primary key
      table.integer("user_id").unsigned().notNullable();
      table.integer("ingredient_id").unsigned().notNullable();
      table.string("ingredient_qty").unsigned().notNullable();
      table.string("ingredient_unit_id").unsigned().notNullable();
      table.string("ingredient_brand");
      table.string("ingredient_shelf_life");
      table
        .string("ingredient_date_bought")
        .notNullable()
        .defaultTo(Date.now());
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .foreign("ingredient_id")
        .references("id")
        .inTable("ingredients")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .foreign("ingredient_unit_id")
        .references("id")
        .inTable("units")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  // drop tables
  return knex.schema.dropTable("posts").dropTable("users");
};
