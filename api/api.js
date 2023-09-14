import Fastify from "fastify";
const fastify = Fastify({
    logger: true,
});

// Declare a route
fastify.get("/layout/home", async function handler(request, reply) {
    reply.header("content-type", "text/html; charset=UTF-8");
    reply.status(200);
    reply.send(`
        <h1>Welcome to home page</h1>
        <view include="/api/layout/home/stats" />
    `);
});

fastify.get("/layout/home/stats", async function handler(request, reply) {
    reply.header("content-type", "text/html; charset=UTF-8");
    reply.status(200);
    reply.send(`
        <h2>Stats</h2>
        <div>
            <h3>Up Time</h3>
            99.99%
        </div>

        <div>
            <h3>Availability</h3>
            99.99%
        </div>

        <div>
            <h3>Error Rate</h3>
            0.01%
        </div>
    `);
});

// Run the server!
try {
    await fastify.listen({ port: 3500 });
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
