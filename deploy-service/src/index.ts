
import { createClient, commandOptions } from "redis";
import { copyFinalDist, downloadS3Folder } from "./aws";
import { buildProject } from "./utils";
const publisher = createClient({
    url: `redis://${process.env.REDIS_HOST || 'redis'}:6379`
  });
  
  const subscriber = createClient({
    url: `redis://${process.env.REDIS_HOST || 'redis'}:6379`
  });
  
  publisher.connect().catch(err => {
    console.error('Failed to connect publisher to Redis:', err);
  });
  
  subscriber.connect().catch(err => {
    console.error('Failed to connect subscriber to Redis:', err);
  });
  
  publisher.on('error', (err) => console.error('Publisher Redis Client Error', err));
  subscriber.on('error', (err) => console.error('Subscriber Redis Client Error', err));

async function main() {
    while(1) {
        const res = await subscriber.brPop(
            commandOptions({ isolated: true }),
            'build-queue',
            0
          );
        // @ts-ignore;
        const id = res.element
        
        await downloadS3Folder(`output/${id}`)
        await buildProject(id);
        copyFinalDist(id);
        publisher.hSet("status", id, "deployed")
    }
}
main();
