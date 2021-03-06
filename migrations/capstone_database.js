// npm run migrate:latest
exports.up = function (knex) {
  // create tables
  return knex.schema
    .createTable("users", function (table) {
      table.increments("id");
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("email").notNullable();
      table.string("password", 50).notNullable();
    })
    .createTable("units", function (table) {
      table.increments("id");
      table.string("unit").notNullable();
      table.string("unit_description").notNullable();
    })
    .createTable("categories", function (table) {
      table.increments("id");
      table.string("category").notNullable();
    })
    .createTable("tasty_recipes", function (table) {
      table.increments("id");
      table.string("title").notNullable();
    })
    .createTable("tasty_recipes_list", function (table) {
      table.integer("tasty_recipes_id").unsigned().notNullable();
      table.string("ingredient_name").notNullable();
      table.integer("qty").unsigned().notNullable();
      table.integer("unit_id").unsigned().notNullable();
      table.string("instructions").notNullable();
      table
        .foreign("tasty_recipes_id")
        .references("id")
        .inTable("tasty_recipes")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .foreign("unit_id")
        .references("id")
        .inTable("units")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("personal_recipes", function (table) {
      table.increments("id");
      table.integer("user_id").unsigned().notNullable();
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("personal_recipes_list", function (table) {
      table.integer("personal_recipes_id").unsigned().notNullable();
      table.string("ingredient_name").notNullable();
      table.integer("qty").unsigned().notNullable();
      table.integer("unit_id").unsigned().notNullable();
      table.string("instructions").notNullable();
      table
        .foreign("personal_recipes_id")
        .references("id")
        .inTable("personal_recipes")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .foreign("unit_id")
        .references("id")
        .inTable("units")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("grocery_list", function (table) {
      table.increments("id");
      table.string("title").notNullable();
      table.integer("user_id").unsigned().notNullable();
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("grocery_list_users", function (table) {
      table.integer("list_id").unsigned().notNullable();
      table.integer("user_id").unsigned().notNullable();
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .foreign("list_id")
        .references("id")
        .inTable("grocery_list")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("grocery_list_items", function (table) {
      table.integer("list_id").unsigned().notNullable();
      table.string("ingredient_name").notNullable();
      table.integer("qty").unsigned().notNullable();
      table.integer("unit_id").unsigned().notNullable();
      table.integer("category_id").unsigned().notNullable();
      table.string("shelf_life");
      table
        .foreign("list_id")
        .references("id")
        .inTable("grocery_list")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .foreign("unit_id")
        .references("id")
        .inTable("units")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .foreign("category_id")
        .references("id")
        .inTable("categories")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("pantry_items", function (table) {
      table.integer("user_id").unsigned().notNullable();
      table.string("ingredient_name").notNullable();
      table.integer("qty").unsigned().notNullable();
      table.integer("unit_id").unsigned().notNullable();
      table.integer("category_id").unsigned().notNullable();
      table.string("shelf_life");
      table.timestamp("ingredient_date_bought").defaultTo(knex.fn.now());
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .foreign("category_id")
        .references("id")
        .inTable("categories")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .foreign("unit_id")
        .references("id")
        .inTable("units")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

// npm run migrate:rollback
exports.down = function (knex) {
  // drop tables
  return knex.schema
    .dropTable("pantry_items")
    .dropTable("grocery_list_items")
    .dropTable("grocery_list_users")
    .dropTable("grocery_list")
    .dropTable("personal_recipes_list")
    .dropTable("personal_recipes")
    .dropTable("tasty_recipes_list")
    .dropTable("tasty_recipes")
    .dropTable("categories")
    .dropTable("users")
    .dropTable("units");
};
