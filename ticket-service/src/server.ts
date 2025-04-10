import { createApp } from "./app";
import { ENV } from "./config/env";

const app = createApp();
const PORT = ENV.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ticket service running on port ${PORT}`);
});
