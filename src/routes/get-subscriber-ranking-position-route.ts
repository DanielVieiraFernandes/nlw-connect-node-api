import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { getSubscriberInviteCount } from '../functions/get-subscriber-invite-count';
import { getSubscriberRankingPosition } from '../functions/get-subscriber-ranking-position';

export const getSubscribertRankingPosRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/position',
      {
        schema: {
          summary: 'Get subscriber ranking position',
          tags: ['referral'],
          description: 'Description',
          params: z.object({
            subscriberId: z.string(),
          }),
          response: {
            200: z.object({
              position: z.number().nullable(),
            }),
          },
        },
      },
      async (req, res) => {
        const { subscriberId } = req.params;

        const {position} = await getSubscriberRankingPosition({subscriberId})
       
        return {position}
      }
    );
  };
