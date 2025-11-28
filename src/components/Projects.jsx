import ProjectsSlider from './ProjectsSlider'
import SectionsHeader from './SectionsHeader'
import {client} from '../api/sanityClient'
import { useEffect, useState } from 'react'
import Modal from './Modal'


const Projects = () => {
  const [projects, setProjects] = useState([])
  
  useEffect(() => {
    client
      .fetch(`*[_type == "project"]`)
      .then((data) => setProjects(data))
      .catch(console.error);
  }, []);
  // console.log(projects)
  return (
    <section id='projects' aria-labelledby="projects-heading">
        <SectionsHeader
          title='Project Showcase'
          description="A visual overview of the applications and interfaces I've built using modern tools and technologies."
          headingLevel="h2"
        />
        <ProjectsSlider projects={projects} />
    </section>
  )
}

export default Projects