import { Application } from "../router/Application.js";
import { router } from "../utils/useRouter.js";
import { parseJson } from "../utils/parseJson.js";
import { parseUrl } from "../utils/parseUrl.js";

const PORT = process.argv[2];
const app = new Application();

app.use(parseJson);
app.use(parseUrl(`http://localhost:${PORT}`));
app.addRouter(router);
app.listen(PORT, () => console.log(`Server started with port ${PORT}`));
