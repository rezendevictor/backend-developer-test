import { Response } from "express";
import { nodeCache } from "../node-cache/node-cache";
import AWS, { S3 } from "aws-sdk";
import { JobEntity } from "../../job/entity/job.entity";
import { jobEntityToJobFeedDTO } from "../../job/entity/job-feed.entity";

class S3bucketService {
  constructor(public readonly s3: S3) {}

  public async fetchS3FileContents(): Promise<string | null> {
    try {
      const params = {
        Bucket: "job-feed-bucket",
        Key: "jobs.json",
      };

      const data = await this.s3.getObject(params).promise();
      if (data.Body) {
        return data.Body.toString();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching file from S3:", error);
      return null;
    }
  }
  public async getFeed(res: Response) {
    await nodeCache.clear();
    const cachedFeed = await nodeCache.getFeedFromCache();
    if (cachedFeed) {
      return cachedFeed;
    }
    const jobsEntity = await this.fetchS3FileContents();
    if (jobsEntity) {
      const jsonJobs: JobEntity[] = JSON.parse(jobsEntity);
      const jobsFeed = jsonJobs.map(jobEntityToJobFeedDTO);
      await nodeCache.saveFeedOnCache(jobsFeed);
      res.status(200);
      res.json(jobsFeed);
    }
    res.status(200);
    res.json();
  }
}

export const s3BucketService = new S3bucketService(
  new AWS.S3({
    region: "eu-north-1",
  }),
);
