import Proj1Sub1 from "../../../assets/images/signin-signup.jpg";
import Proj1Sub2 from "../../../assets/images/welcome.jpg";
import Proj1Sub3 from "../../../assets/images/todo-list.jpg";
import Proj1Main from "../../../assets/images/todo-home.jpg";
import Proj2Sub1 from "../../../assets/images/game-plot.jpg";
import Proj2Sub2 from "../../../assets/images/win.jpg";

export default [
  {
    name: "ToDo Application",
    mainImage: Proj1Main,
    images: [Proj1Sub1, Proj1Sub2, Proj1Sub3],
    technology: ["React-JS", "Python"],
    description:
      "Simple User Todo management application designed using containerised " +
      "frontend(React-JS) and backend(Python) microservices"
  },
  {
    name: "Arcade Game",
    mainImage: Proj2Sub1,
    images: [Proj2Sub1, Proj2Sub2],
    technology: ["Javascript"],
    description:
      "Simple Arcade game with position controlled opponent(Right) created using Javascript."
  }
];
