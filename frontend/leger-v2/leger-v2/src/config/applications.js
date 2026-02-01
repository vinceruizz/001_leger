import MyWork from "../components/applications/MyWork";
import About from "../components/applications/About";

const APPLICATIONS = {
  mywork: {
    id: "mywork",
    title: "My Work",
    icon: "folder",
    component: MyWork,
    singleton: true,
    defaultSize: { width: 900, height: 600 }
  },
  about: {
    id: "about",
    title: "About Me",
    icon: "user",
    component: About,
    singleton: true,
    defaultSize: { width: 600, height: 500 }
  }
};

export default APPLICATIONS;
