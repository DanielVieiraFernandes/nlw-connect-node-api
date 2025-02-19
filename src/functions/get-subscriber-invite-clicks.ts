import { redis } from '../redis/client';

interface getSubscriberInviteClicksParams {
  subscriberId: string;
}

export async function getSubscriberInviteClicks({
  subscriberId,
}: getSubscriberInviteClicksParams) {
  const count = await redis.hget('referral:access-count', subscriberId);

  return { count: count ? Number.parseInt(count) : 0 };
}
