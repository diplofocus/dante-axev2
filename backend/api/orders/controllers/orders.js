const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    console.log("in create method", ctx.request);
    console.log("in create method", ctx.request.body);
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.orders.create(data, { files });
    } else {
      entity = await strapi.services.orders.create({
        orderId: ctx.request.body.id,
        orderData: ctx.request.body,
      });
    }
    return sanitizeEntity(entity, { model: strapi.models.orders });
  },
};
