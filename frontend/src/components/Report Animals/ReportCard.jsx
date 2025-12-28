import React from "react";
/**
 * Props:
 *  - index: number
 *  - project: {
 *      name: string,
 *      image: string, // path or url to image
 *      detail: string,
 *      tech: string[],
 *      webUrl: string,
 *      githubUrl: string
 *    }
 */
const ReportCard = ({ report , index }) => {
  const { animalType, description, locationText, images } = report || {};
  console.log(images)
  
  return (
    <div
      className={`relative project-layer md:bg-none bg-cover bg-center  h-fit md:p-0 px-6 py-7`}
      style={{
        backgroundImage: `url(${images?.length > 0 ? images[0]?.url : " "})`,
      }}
    >
    <div className="h-67.5">
         {animalType === "cat" ? (
        <div
          className="md:block hidden "
        >
          <div
            className={`relative h-full project_image_layer xl:w-145 w-[60%] cursor-pointer overflow-hidden select-none ${
              index % 2 !== 0 ? "ml-auto" : ""
            } rounded`}
          >
            <img
              src={images?.length > 0 ? images[0]?.url : " "}
              alt={animalType || "Dog"}
              className="block w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        </div>
      ) : (
        <div
          className={`relative h-full project_image_layer xl:w-145 w-[60%] cursor-default overflow-hidden select-none   ${
            index % 2 !== 0 ? "ml-auto" : ""
          } rounded`}
        >
          <img
             src={images?.length > 0 ? images[0]?.url : " "}
              alt={animalType || "Dog"}
              className="block w-full h-full object-contain"
              loading="lazy"
          />
        </div>
      )}
    </div>

      <div
        className={`md:absolute relative md:top-1/2 ${
          index % 2 === 0 ? "md:right-0 md:items-end" : "left-0 items-start"
        } transform md:-translate-y-1/2 lg:max-w-lg md:max-w-sm flex flex-col md:z-10 z-20`}
      >
        <p className="text-[13px] text-primary tracking-widest">
          Status : {report?.status}
        </p>
        {animalType === "cat" ? (
          <div >
            <h1 className="md:text-2xl text-xl mt-1 font-semibold text-LightestSlate hover:text-primary transition-all duration-300 ease-linear">
              {animalType}
            </h1>
          </div>
        ) : (
          <h1 className="md:text-2xl text-xl mt-1 font-semibold text-LightestSlate">
            {animalType}
          </h1>
        )}

        <div className="flex mt-2">
            <p className="text-slate-300 md:text-Slate text-xs">{report?.reporterName}</p>
            <p className="md:text-Slate text-slate-300 text-xs"><span className="text-primary font-bold text-md px-2"> ·</span>{report?.reporterContact}</p>
        </div>

        <p
          className={`relative md:bg-[#112240] ${
            index % 2 === 0 ? "md:text-right text-left" : "text-left"
          } md:p-6 md:text-xs text-sm leading-normal rounded my-5 text-slate-300`}
        >
          {description}
        </p>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
          {/* {(project.tech || []).map((tech, techIndex) => (
            <p key={techIndex} className="text-LightestSlate">
              {tech}
            </p>
          ))} */}
          <p  className="text-LightestSlate">
              {locationText}
            </p>
        </div>

        {/* <div className="flex md:flex-row-reverse items-center gap-5 mt-5 ">
          {project.webUrl && (
            <a href={project.webUrl} target="_blank" rel="noopener noreferrer">
              <Icon
                icon="icon-park-outline:share"
                className="text-LightestSlate text-lg cursor-pointer hover:text-primary transition-all duration-300 ease-linear"
              />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                icon="line-md:github"
                className="text-LightestSlate text-xl cursor-pointer hover:text-primary transition-all duration-300 ease-linear"
              />
            </a>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default ReportCard;
