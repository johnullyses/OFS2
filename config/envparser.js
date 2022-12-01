const DotEnv = require('dotenv')

module.exports = function (ctx) {
  // Let's stringify our variables
  const parsedEnv = DotEnv.config({ path: ctx.dev ? '.env' : '.env.prod' }).parsed

  for (key in parsedEnv) {
    if (typeof parsedEnv[key] === 'string') {
      parsedEnv[key] = parsedEnv[key]
    }
  }
  return parsedEnv
}
