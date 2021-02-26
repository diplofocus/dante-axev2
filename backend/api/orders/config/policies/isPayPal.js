module.exports = async (ctx, next) => {
  console.log("in policy", ctx);
  console.log("request", ctx.request);
  console.log("body", ctx.request.body);

  return await next();
};
