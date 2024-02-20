import * as Sentry from "@sentry/serverless";
import serverless from "serverless-http";
import app from "./app";

const sentrylessHandler = async (
  event: object,
  context: object,
): Promise<object> => {
  return serverless(app)(event, context);
};
export const handler = Sentry.AWSLambda.wrapHandler(sentrylessHandler);
