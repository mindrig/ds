declare module "*.svg?no-inline" {
  import { IconId } from "./src/index.js";
  const url: IconId;
  export default url;
}
