import dotenv from "dotenv";
dotenv.config();
import { Application } from "./router/Application.js";
import { router } from "./utils/useRouter.js";
import { parseJson } from "./utils/parseJson.js";
import { parseUrl } from "./utils/parseUrl.js";

const PORT = process.env.API_PORT || 3000;
const app = new Application();

app.use(parseJson);
app.use(parseUrl(`http://localhost:${PORT}`));
app.addRouter(router);
app.listen(PORT, () => console.log(`Server started with port ${PORT}`));
