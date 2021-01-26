module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: 'https://test.danteaxe.com',
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'e47c6db6e0ba7af81d444143334523aa'),
    },
  },
});
