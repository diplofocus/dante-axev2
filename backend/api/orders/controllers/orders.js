'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    console.log(ctx);
    console.log(strapi.models.orders);
    return ctx.send("ok");
  }
};
