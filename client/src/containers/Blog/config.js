import Containerize from "../../assets/images/docker.jpeg";
import CICD from "../../assets/images/ci-cd.jpeg";

export default [
  {
    name: "containerize-blog",
    mainImage: Containerize,
    title: "Containerize an application using Docker",
    date: "May 02, 2021",
    description:
      "Containerize any software application using Docker and make it easily portable across platforms",
    url: "https://sanjaysaravanan38.medium.com/containerize-an-application-using-dockerfile-bf35c38d4d95",
  },
  {
    name: "cicd-blog",
    mainImage: CICD,
    title: "CI/CD for an application using AWS CodePipeline",
    date: "May 02, 2021",
    description: "Sample Blog for CICD",
    url: "https://sanjaysaravanan38.medium.com/ci-cd-for-a-web-application-using-aws-codepipeline-46c18985d74c",
  },
];
