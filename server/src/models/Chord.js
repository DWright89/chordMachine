const Model = require("./Model");

class Chord extends (Model) {
  static get tableName(){
    return "chords"
  }

  static get jsonSchema(){
    return {
      type: "object",
      required: ["userId", "name", "order", "degree", "extension", "inversion", "url"],

      properties: {
        userId: { type: "bigInteger"},
        name: { type: "string" },
        order: { type: ["integer", "string"] },
        degree: { type: "ingeger"},
        extension: { type: "string" },
        inversion: { type: "string" },
        url: { type: "string" }
      }
    }
  }

  static get relationMappings() {
    const User = require("./User.js")

    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: "chords.userId",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Chord