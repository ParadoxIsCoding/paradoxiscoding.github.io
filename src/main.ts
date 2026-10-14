import "./index.css";
import { mountHome } from "./home";
import { mountBlog } from "./blog";

const root = document.querySelector<HTMLDivElement>("#root")!;
const HOME_TITLE = "Taha Salman";
let dispose: (() => void) | void;

const render = () => {
  dispose?.();
  root.replaceChildren();
  window.scrollTo(0, 0);

  const [section, slug] = location.hash.replace(/^#\/?/, "").split("/");
  if (section === "blog") {
    dispose = mountBlog(root, slug ? decodeURIComponent(slug) : undefined);
  } else {
    document.title = HOME_TITLE;
    dispose = mountHome(root);
  }
};

window.addEventListener("hashchange", render);
render();
