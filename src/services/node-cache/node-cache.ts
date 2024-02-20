import NodeCache from "node-cache";
import { JobFeedEntity } from "../../job/entity/job-feed.entity";

class InternalNodeCache {
  constructor(private readonly cache: NodeCache) {}
  async saveFeedOnCache(data: JobFeedEntity[]) {
    this.cache.set("feed", data);
  }
  async getFeedFromCache() {
    const feed = this.cache.get("feed");
    if (!feed) {
      return null;
    }
    return feed;
  }
  async clear() {
    this.cache.del("feed");
  }
}

export const nodeCache = new InternalNodeCache(new NodeCache({ stdTTL: 60 }));
