import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { env } from '../env';
import { accessInviteLink } from '../functions/access-invite-link';
import { redis } from '../redis/client';

export const accessInviteLinkroute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        summary: 'Access invite link and redirects user',
        tags: ['referral'],
        description: 'Description',
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (req, res) => {
      const { subscriberId } = req.params;

      await accessInviteLink({subscriberId});

      console.log(subscriberId);

      const redirectUrl = new URL(env.WEB_URL);

      redirectUrl.searchParams.set('referrer', subscriberId);

      // 301: redirect permanente (os browsers fazem um cache)
      // 302: redirect temporário 

      return res.redirect(redirectUrl.toString(), 302);
    }
  );
};
