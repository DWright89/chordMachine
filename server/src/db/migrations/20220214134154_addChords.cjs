/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("chords", (table)=>{
    table.bigIncrements("id")
    table.bigInteger("userId").notNullable().references("users.id")
    table.string("name").notNullable()
    table.integer("order").notNullable()
    table.integer("degree").notNullable()
    table.string("extension").notNullable()
    table.string("inversion").notNullable()
    table.string("url").notNullable()
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("chords")
}
