import start from "./commands/start.js";
import setapi from "./commands/setapi.js";
import service from "./commands/service.js";
import country from "./commands/country.js";
import balance from "./commands/balance.js";
import order from "./commands/order.js";
import status from "./commands/status.js";
import cancel from "./commands/cancel.js";
import text from "./commands/text.js";

export default function(bot) {
  start(bot);
  setapi(bot);
  service(bot);
  country(bot);
  balance(bot);
  order(bot);
  status(bot);
  cancel(bot);
  text(bot);
}
