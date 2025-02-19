import { fastifyCors } from '@fastify/cors';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import fastify from 'fastify';
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { env } from './env';
import { accessInviteLinkroute } from './routes/access-invite-link-route';
import { subscribeToEventRoute } from './routes/subscribe-to-event-route';
import { getSubscriberInviteClicksRoute } from './routes/get-subscriber-invite-clicks-route';
import { getSubscriberInviteCountRoute } from './routes/get-subscriber-invite-count-route';
import { getSubscribertRankingPosRoute } from './routes/get-subscriber-ranking-position-route';
import { getRankingRoute } from './routes/get-ranking-route';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW CONNECT',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

app.register(subscribeToEventRoute);
app.register(accessInviteLinkroute);
app.register(getSubscriberInviteClicksRoute);
app.register(getSubscriberInviteCountRoute);
app.register(getSubscribertRankingPosRoute);
app.register(getRankingRoute);

app
  .listen({
    port: env.PORT,
  })
  .then(() => console.log('HTTP Server Running'));
