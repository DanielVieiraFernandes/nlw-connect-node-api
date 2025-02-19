import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';

import { getSubscriberInviteClicks } from '../functions/get-subscriber-invite-clicks';
import { getSubscriberInviteCount } from '../functions/get-subscriber-invite-count';

export const getSubscriberInviteCountRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/count',
      {
        schema: {
          summary: 'Get subscriber ranking invites count',
          tags: ['referral'],
          description: 'Description',
          params: z.object({
            subscriberId: z.string(),
          }),
          response: {
            200: z.object({
              count: z.number(),
            }),
          },
        },
      },
      async (req, res) => {
        const { subscriberId } = req.params;

        const {count} = await getSubscriberInviteCount({subscriberId})
       
        return {count}
      }
    );
  };
