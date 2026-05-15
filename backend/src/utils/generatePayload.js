function generatePayload() {
    return {
        requestId: crypto.randomUUID(),
        source: "http-response-monitor",
         timestamp: new Date().toISOString(),
         metadata: {
            environment: process.env.NODE_ENV || "development",
            randomValue: Math.floor(Math.random() * 1000)
        }
    };
}

module.exports = generatePayload;