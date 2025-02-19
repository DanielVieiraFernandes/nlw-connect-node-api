import { redis } from '../redis/client';

interface getSubscriberInviteCountParams {
  subscriberId: string;
}

export async function getSubscriberInviteCount({
  subscriberId,
}: getSubscriberInviteCountParams) {
  const count = await redis.zscore('referral:ranking', subscriberId);

  return { count: count ? Number.parseInt(count) : 0 };
}
