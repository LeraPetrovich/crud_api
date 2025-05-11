import { Application } from "./router/Application";
import { router } from "./utils/useRouter";
import { parseJson } from "./utils/parseJson";

const PORT = 3000;
const app = new Application();

app.use(parseJson);
app.addRouter(router);
app.listen(PORT, () => console.log(`Server started with port ${PORT}`));
