import { Link } from "react-router-dom";
import { generateRandomShape } from "@/lib/utils";
import { homeIcons, homeLinksData } from "./data";

const Home = () => {

     return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 main-home-div drop-shadow-sm">

               {homeLinksData.map((item, index) => (
                    <Link 
                         key={`${item.label}_${index}`}
                         className="home-div drop-shadow-sm" to={item.to}
                    >
                         <img
                              src={homeIcons[index]} height="auto"
                              style={{ maxWidth: 50 }}
                              className="ml-[25px]"
                         />

                         <div className="blur-lg relative">
                              <div
                                   className="random-shape"
                                   style={{ clipPath: `path("${generateRandomShape()}")` }}
                              />
                         </div>

                         <div className="secondary-title font-medium text-[#0a3690] xl:home-text ml-[25px] mb-[10px]">
                              {item.label}
                         </div>
                    </Link>

               ))}

          </div>
     )
}

export default Home