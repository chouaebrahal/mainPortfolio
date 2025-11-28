import { ExternalLink, Github } from "lucide-react";
import React, { useEffect, useState } from "react";
import { client, urlFor } from "../api/sanityClient";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState();
  console.log(id);
  useEffect(() => {
    client
      .fetch('*[_type == "project" && _id == $id][0]', {
        id: id,
      })
      .then((res) => setProject(res));
  }, [id]);

  if (!project)
    return (
      <div className="text-2xl bg-linear-to-br from-background to-card text-primary italic flex items-center justify-center h-screen w-full">
        we can't find the specifique project
      </div>
    );

  return (
    <main className="h-full max-w-full bg-linear-to-br from-background to-card overflow-hidden" aria-label={`Details for ${project.title} project`}>
      <div className="divider h-10">
      </div>
      <div className="w-full  h-120 lg:h-160 pt-20  border-b border-border relative">
        <img
          className="relative z-500 w-full lg:w-[80%] mx-auto h-full -mt-20 hover:scale-105 duration-300 cursor-pointer"
          src={urlFor(project.mainImage.asset._ref)}
          alt={`Screenshot of ${project.title} project`}
          width="800"
          height="600"
        />
        <div className="icon-container absolute top-30 lg:top-60 z-1000 left-[50%] translate-x-[-50%] w-[90%] lg:w-[80%] flex justify-between px-2">
          <div className="relative group">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="p-3 rounded-full block text-primary  hover:scale-1.05 animate-bounce transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary rounded"
              aria-label={`Live demo of ${project.title}`}
            >
              <ExternalLink className="w-6 h-6 lg:w-7 lg:h-7" />
            </a>
            <div className="absolute top-1/2 -translate-y-1/2 -left-25 transform text-bold   opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none bg-primary text-white text-xs py-1 px-3 rounded shadow-lg">
              Live Demo
            </div>
          </div>
          <div className="relative group">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="p-3 rounded-full block text-primary  hover:scale-1.05 animate-bounce  transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary rounded"
              aria-label={`Source code for ${project.title} on GitHub`}
            >
              <Github className="w-6 h-6  lg:w-7 lg:h-7" />
            </a>
            <div className="absolute top-1/2 -translate-y-1/2 -right-25 transform text-bold opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none bg-primary text-white text-xs py-1 px-3 rounded shadow-lg">
              Github Link
            </div>
          </div>
        </div>
        <h1 className="absolute z-1000 -bottom-8 lg:-bottom-12 left-1/2 -translate-x-1/2 mt-10 text-5xl md:text-6xl lg:text-7xl stroked-text-shadow p-0 text-center w-full">
          {project.title}
        </h1>
      </div>
      <div className="container mx-auto px-5 h-full max-w-280 text-white text-justify">
        <div className="info px-5 lg:px-10 py-10">
          <div className="about mt-4">
            <h2 className="text-2xl lg:text-4xl font-bold mb-5 text-justify w-full max-w-120">
              Description
            </h2>
            <div>
              {project.fullDescription.map((e, index) => {
                return (
                  <p key={index} className="text-lg flex gap-2 item-center mb-2">
                    <span className="bg-primary h-3 w-3 rounded-full shrink-0 mt-1.5"></span> <span>{e.children[0].text}</span>
                  </p>
                );
              })}
            </div>
          </div>
          <div className="technologies mt-5">
            <h2 className="text-2xl lg:text-4xl mb-5 font-bold">
              Technologies
            </h2>
            <div className="w-full  flex flex-wrap gap-4 my-3">
              {project.techStack.map((e, index) => {
                return (
                  <span
                    key={index}
                    className="px-4 py-1 bg-primary flex items-center justify-center text-sm font-bold w-fit text-center rounded-md flex-nowrap shrink-0"
                    aria-label={`Technology used: ${e}`}
                  >
                    {e}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="mt-5">
            <h2 className="text-2xl lg:text-4xl font-bold">Links</h2>
            <div className="links flex gap-5 mt-5">
              <div>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-2xl hover:text-primary duration-300 focus:outline-none focus:ring-2 focus:ring-primary rounded p-2"
                  aria-label={`Visit live demo of ${project.title}`}
                >
                  <ExternalLink className="text-primary" />
                  Live Demo
                </a>
              </div>
              <div>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-2xl hover:text-primary duration-300 focus:outline-none focus:ring-2 focus:ring-primary rounded p-2"
                  aria-label={`View source code for ${project.title} on GitHub`}
                >
                  <Github className="text-primary" />
                  Github Repo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProjectDetails;
