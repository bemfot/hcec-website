"use client";
import { div, p } from "framer-motion/client";
import Image from "next/image";
import { useState } from "react"; // ✅ ADDED

export default function WelcomePage() {
  const [showMore, setShowMore] = useState(false); // ✅ ADDED

  return (
    <main className="relative w-full min-h-screen bg-[#eff1f6] text-black">
      
      {/* Container */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full h-full">

        {/* Image Section */}
        <div className="relative backdrop-blur-xl bg-white/10 w-full md:w-1/2 h-[100vh] sm:h-[90vh] sh md:h-screen">
          <Image
            src="/assets/GO-piz.jpg"
            alt="Church Welcome"
            fill
            className="object-top object-cover w-full h-full transition-all duration-700 ease-in-out overflow-hidden rounded-rl-4xl"
            priority
          />


          {/* Overlay for mobile */}
          <div className="absolute inset-0 bg-red-300/20 z-10" />

          {/* ✅ SHOW MORE BUTTON (MOBILE ONLY) */}
       

          
          {!showMore && (

            <div className="absolute inset-0 z-40 md:hidden  flex flex-col justify-end px-4 pb-6">
        <div className=" bg-red-600/40 text-white border border-white/60
                           rounded-tl-4xl rounded-br-4xl shadow-lg p-4 text-center">
                             
                              <h1 className="text-md text-gray-950 p-1.5 font-bold text-center border-white rounded-tl-4xl rounded-br-4xl  bg-white/80  mb-4">
                  WELCOME TO THE FAMILY OF CHRIST WITH A MESSAGE OF SECOND COMING!!! 
                </h1>
                <p className="text-center font-normal">
                                   "Come unto me, all ye that labour and are heavy laden, and I will give you rest. Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls. For my yoke is easy, and my burden is light..."- Mathew 11:28 - 30. <br />

                  There are decisions, and there are decisions. However, the decision to accept Christ's gift of salvation is the best one can ever make in his life time. 

                </p>
                
                     <button
              onClick={() => setShowMore(true)}
              className=" bottom-6  mt-2 z-30 md:hidden
                         bg-white text-black px-6 py-2 rounded-full font-semibold shadow-lg rounded-tl-4xl rounded-br-4xl"
            >
              Show More
            </button>      
              </div>


            
            </div>
          )}

          {/* ✅ FULLSCREEN TEXT OVERLAY WHEN OPENED */}
          {showMore && (
            <div className="absolute inset-0 z-40 md:hidden bg-gray-800/20 flex flex-col justify-end px-4 pb-6">
              
              <div
                className="backdrop-blur-xl bg-white/40 border border-white/5
                           rounded-tl-4xl rounded-br-4xl shadow-lg p-4 text-center"
              >
                

                <p className="text-sm text-black text-justify">
                  Mathew 11:8 - 30. Come unto me, all ye that labour and are heavy laden, and I will give you rest. Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls. For my yoke is easy, and my burden is light..." <br /> <br />

                  There are decisions, and there are decisions. However, the decision to accept Christ's gift of salvation is the best one can ever make in his life time. 

                  While every decision has consequences, your acceptance of salvation does not only give you meaningful existence here, but also add eternal value to your life. <br /> <br />

                  On the other hand, the greatest risk one can take is to postpone the day of his salvation. As day passes, we get closer to the end of the age as all events happening now are indications of the imminence of rapture of the saints. Death too is getting closer by the day. 

                  Therefore, if you hear his voice today, do not harden your heart... because delay is dangerous.
                </p>
              
            <p className="text-red-600 text-center font-bold  ">Pastor Dr. F.T Amongbonjaye <br /> <span className="">  Genral Overseer HCEC Worldwide</span> </p>
                

                {/* ✅ COLLAPSE BUTTON */}
                <button
                  onClick={() => setShowMore(false)}
                  className="mt-4 w-full bg-white text-black py-2 rounded-lg font-semibold shadow"
                >
                  Collapse
                </button>
              </div>

            </div>
          )}
        </div>

        {/* ✅ DESKTOP SECTION — COMPLETELY UNTOUCHED */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-10">
          <h1> </h1>
          <div
            className="backdrop-blur-xl bg-white/10 border border-white/20
                       rounded-3xl shadow-lg p-10 max-w-lg
                       transition-all duration-500 hover:bg-white/20 hover:scale-[1.02]"
          >
            <h1 className="text-xl font-bold text-center text-red-500 my-4">
              WELCOME TO THE FAMILY OF CHRIST WITH A MESSAGE OF SECOND COMING!!! 
            </h1>

            <p className="text-lg text-black text-justify leading-relaxed">
              Mathew 11: "28 - 30. Come unto me, all ye that labour and are heavy laden, and I will give you rest. Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls. For my yoke is easy, and my burden is light..." <br /> <br />

              There are decisions, and there are decisions. However, the decision to accept Christ's gift of salvation is the best one can ever make in his life time. 

              While every decision has consequences, your acceptance of salvation does not only give you meaningful existence here, but also add eternal value to your life. <br />

              On the other hand, the greatest risk one can take is to postpone the day of his salvation. As day passes, we get closer to the end of the age as all events happening now are indications of the imminence of rapture of the saints. Death too is getting closer by the day.  <br />

              Therefore, if you hear his voice today, do not harden your heart... because delay is dangerous.
            </p>

            <p className="text-red-600 text-center font-bold  ">Pastor Dr. F.T Amongbonjaye <br /> <span className="">  Genral Overseer HCEC Worldwide</span> </p>

          </div>
        </div>

      </div>
    </main>
  );
}
