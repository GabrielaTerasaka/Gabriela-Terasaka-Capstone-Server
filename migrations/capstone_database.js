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
    .createTable("ingredients", function (table) {
      table.increments("id");
      table.string("name").notNullable();
      table.integer("category_id").unsigned().notNullable();
      table.integer("default_unit_id").unsigned().notNullable();
      table
        .foreign("default_unit_id")
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
    .createTable("tasty_recipes", function (table) {
      table.increments("id");
      table.string("title").notNullable();
      table.integer("ingredients_id").unsigned().notNullable();
      table.string("ingredient_qty").notNullable();
      table.integer("ingredient_unit_id").unsigned().notNullable();
      table.string("instructions").notNullable();
      table
        .foreign("ingredients_id")
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
    .createTable("personal_recipes", function (table) {
      table.increments("id");
      table.integer("user_id").unsigned().notNullable();
      table.integer("ingredients_id").unsigned().notNullable();
      table.string("ingredient_qty").notNullable();
      table.integer("ingredient_unit_id").unsigned().notNullable();
      table.string("instructions").notNullable();
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .foreign("ingredients_id")
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
    .createTable("grocery_list", function (table) {
      table.increments("id");
      table.integer("ingredient_id").unsigned().notNullable();
      table.string("qty").notNullable();
      table.integer("unit_id").unsigned().notNullable();
      table.string("category").notNullable();
      table.string("brand");
      table.string("shelf_life");
      table
        .foreign("ingredient_id")
        .references("id")
        .inTable("ingredients")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .foreign("unit_id")
        .references("id")
        .inTable("units")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("grocery_list_users", function (table) {
      table.increments("id");
      table.integer("user_id").unsigned().notNullable();
      table.integer("shared_users_id").unsigned().notNullable();
      table.integer("grocery_list_id").unsigned().notNullable();
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .foreign("shared_users_id")
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .foreign("grocery_list_id")
        .references("id")
        .inTable("grocery_list")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("pantry", function (table) {
      table.increments("id");
      table.integer("user_id").unsigned().notNullable();
      table.integer("ingredient_id").unsigned().notNullable();
      table.string("ingredient_qty").notNullable();
      table.integer("ingredient_unit_id").unsigned().notNullable();
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

// npm run migrate:rollback
exports.down = function (knex) {
  // drop tables
  return knex.schema
    .dropTable("pantry")
    .dropTable("grocery_list_users")
    .dropTable("grocery_list")
    .dropTable("personal_recipes")
    .dropTable("users")
    .dropTable("tasty_recipes")
    .dropTable("ingredients")
    .dropTable("categories")
    .dropTable("units");
};
