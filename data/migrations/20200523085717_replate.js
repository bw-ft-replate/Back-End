exports.up = function(knex) {

    return knex.schema.createTable('donors', tbl => {

      tbl.increments("donor-id");
  
      tbl.string('username', 255)
        .notNullable()
        .unique();

      tbl.string('password', 255).notNullable()

      tbl.string('business-name', 255)
        .notNullable()
        
      tbl.string('business-phone', 255)
        .notNullable()

      tbl.string('business-address', 255)
        .notNullable()

    })
    
    .createTable('volunteers', tbl => {

        tbl.increments("volunteer-id");
    
        tbl.string('username', 255)
          .notNullable()
          .unique();

        tbl.string('password', 255).notNullable()

        tbl.string('volunteer-name', 255)
          .notNullable()

        tbl.string('volunteer-phone', 255)
          .notNullable()
      })
      
    .createTable('pickups', tbl => {

        tbl.increments("pickup-id")

        tbl.string('type', 255)
          .notNullable()

        tbl.string('amount', 255)
          .notNullable()

        tbl.date('pickup-date')
          .notNullable()

      })
    
    .createTable("donor-volunteer-pickup",tbl => {

      tbl.increments("donor-volunteer-pickup-id")

      tbl.integer("donor-id").notNullable()
        .references("donors.donor-id")

      tbl.integer("pickup-id").notNullable()
        .references("pickups.pickup-id") 

      tbl.integer("volunteer-id").references("volunteers.volunteer-id")

    })

  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('donor-volunteer-pickup')
      .dropTableIfExists('pickups')
      .dropTableIfExists('volunteers')
      .dropTableIfExists('donors');
  };
  
