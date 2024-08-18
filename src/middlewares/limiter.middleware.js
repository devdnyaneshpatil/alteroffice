const rateLimiter = require("express-rate-limit")

const limiter = rateLimiter({
	windowMs:  60 * 1000, // 1 minutes
	limit: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    message:"Hey please come after some time"
})


module.exports=limiter