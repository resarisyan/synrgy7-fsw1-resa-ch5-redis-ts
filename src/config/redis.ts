import redis from 'redis';

const client = redis.createClient({
  url: 'redis://localhost:6379',
  socket: {
    connectTimeout: 1000,
  },
});

client.on('error', (err) => console.log('Redis Client Error', err));
await client.connect();

export default client;
