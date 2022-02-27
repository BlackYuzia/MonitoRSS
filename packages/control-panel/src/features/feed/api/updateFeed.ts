import { InferType, object } from 'yup';
import { FeedSchema, Feed } from '../types';
import fetchRest from '@/utils/fetchRest';

export interface UpdateFeedInput {
  feedId: string
  details: {
    text?: Feed['text']
  }
}

const UpdatFeedOutputSchema = object({
  result: FeedSchema,
});

export type UpdateFeedOutput = InferType<typeof UpdatFeedOutputSchema>;

export const updateFeed = async (options: UpdateFeedInput): Promise<UpdateFeedOutput> => fetchRest(
  `/api/v1/feeds/${options.feedId}`,
  {
    requestOptions: {
      method: 'PATCH',
      body: JSON.stringify(options.details),
    },
    validateSchema: UpdatFeedOutputSchema,
  },
);
