import type { Core } from '@strapi/strapi';

const requireStaticToken: Core.Policy = async (ctx, _config, { strapi }) => {
  const authHeader = ctx.request.header.authorization || '';
  const expectedToken = strapi.config.get('server.staticApiToken');

  if (!expectedToken) {
    ctx.unauthorized('Server token not configured.');
    return false;
  }

  if (!authHeader.startsWith('Bearer ')) {
    ctx.unauthorized('Missing authorization token.');
    return false;
  }

  const providedToken = authHeader.replace('Bearer ', '').trim();

  if (!providedToken || providedToken !== expectedToken) {
    ctx.unauthorized('Invalid authorization token.');
    return false;
  }

  return true;
};

export default requireStaticToken;
