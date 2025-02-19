import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { subscribeToEvent } from '../functions/subscribe-to-event';

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Subscribes someone to the event',
        tags: ['subscription'],
        description: 'Description',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          referrer: z.string().nullish(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (req, res) => {
      const { email, name, referrer } = req.body;

      const {subscriberId} = await subscribeToEvent({email,name, referrerId: referrer});

      return res.status(201).send({
        subscriberId
      });
    }
  );
};
