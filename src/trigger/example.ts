import { logger, task, wait } from "@trigger.dev/sdk/v3";

export const helloWorldTask = task({
  id: "hello-world",
  maxDuration: 300,

  run: async (payload: any, { ctx }) => {
    logger.log("Hello, world!", { payload, ctx });

    const senddata: any = {
      payload,
      password: "supersecrets",
      username: "superusers",
    };

    console.log(`payload: ${JSON.stringify(payload)}`);

    // ⏳ wait for 5 seconds
    await wait.for({ seconds: 5 });

    // 🔥 Send data to webhook
    const response = await fetch(
      "https://webhook.site/4b0910fa-fcea-414d-8e1b-c0a48ce268b8",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(senddata),
      }
    );

    const result = await response.text();

    return {
      message: "Hello, world!",
      webhookResponse: result,
      senddata,
    };
  },
});