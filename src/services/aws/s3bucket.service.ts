import { JobEntity } from "../../job/entity/job.entity";
import { jobEntityToJobFeedDTO } from "../../job/entity/job-feed.entity";
import { Response } from "express";
import { nodeCache } from "../node-cache/node-cache";

class S3bucketService {
  public async getFeed(res: Response) {
    const cachedFeed = await nodeCache.getFeedFromCache();
    if (cachedFeed) {
      return cachedFeed;
    }
    //TODO FAZER O BUCKET AQUI
    const jobsEntity: JobEntity[] = require("./jobs.json");
    const jobsFeed = jobsEntity.map(jobEntityToJobFeedDTO);
    await nodeCache.saveFeedOnCache(jobsFeed);
    res.status(200);
    res.json(jobsFeed);
  }
}

export const s3BucketService = new S3bucketService();
