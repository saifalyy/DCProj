import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'y3ou0dwq',
  dataset: 'production',
  apiVersion: 'v1',
  token: 'sk8amgk6t5JHalvaYEFrYfKpie9jLcsnOH2gChpmzCN36ag7ihv8XD0uHaDkREvwq1n4H1KswvjnSGDJcD6ptqRWDdwQJtBf9vtWx3UuFt0IKZnL09MUvpRCG5aQVZ2ItGNNZj4XQQnfmQOTxWysqESx2Qwm8DOyLFkxZzR6gQcMkSxOC4Rj',
  useCdn: false,
})