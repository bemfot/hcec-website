'use client'
import React from 'react'
import Image from 'next/image';
import Navbar from '../../components/Navbar';


export default function MissionVision() {
  return (
    <>
    <Navbar/>
    <div className="flex flex-col  mt-[5rem] md:flex-row min-h-screen bg-[#f3f4f6]">
          {/* History Section */}
          <div className="flex-1 flex justify-center items-start py-12 px-4 md:px-12">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl border-l-2 border-red-500">
              <div className="flex flex-col items-center justify-center mb-6 gap-2">
                <Image
                  src="/assets/HCEC_LOGO.png"
                  alt="HCEC Logo"
                  width={90}
                  height={60}
                  className="object-contain mb-1"
                />
                <h1 className="text-4xl font-bold text-[#0C101C] text-center">OUR VISION AND MISSION</h1>
              </div>
              <div className="text-gray-700 text-lg leading-relaxed justify-center align-center">
              <h1>OUR VISION</h1>
                <p className='mb-3'>
               Kingdom of Heaven is our vison, self sacrifice is our watchword, holiness is our stand, divine prosperity is our reward </p>
               <p className='mb-3'>
               During the prayer meetings, God visited them mightily and they all got revived. They wanted to preach Christ everywhere at all costs and get converts to that church for Christ at their own expense. <br />
               In the course of consultation with the authority of the church, these brothers were misunderstood. Consequent upon this, they were informed by a letter to go out where Sinners were if they were bent on preaching the gospel. The artillery received this letter, which gave them the full privilege of going out without hindrance to preach to All Creatures as commanded by our Lord Jesus Christ. <br />
              The gathering was inaugurated on 4th March, 1970. That same day, the Church had its name from the Lord himself.
              <br /></p>
          <p className=''>
              The Lord spoke through a brother to show them how imminent the second coming of Christ was. <br /> They were commanded that day to go and preach His Second Coming so that the world, everybody and even the Church might be prepared to meet Him. Hence, the name “His Coming Evangelical Church”. Time and space will fail us to talk about the persecution this young congregation suffered, with the loss of many things for Christ’s sake. But thank God today many converts have been won to Christ through the ministry of this church. <br />
              A few months before the said night 4th March, 1970, Rev. J. O. Akindolire (Akindayomi), the General Superintendent of the former church, had prepared the leader of this church - Rev. Samson Adebayo Ogunjedi - with the laying on of hands before many workers of the church in Lagos. </p>
              </div>
            </div>
          </div>
          {/* Fixed Image Section */}
          <div className="relative w-full md:w-[400px] flex-shrink-0">
            <div className="md:fixed md:top-7 md:bottom-7 rounded-lg md:right-0 md:w-[400px] flex flex-col items-center justify-center bg-white shadow-lg p-6">
              <div className="w-full h-[300px] relative mb-4 mt-6 rounded-lg overflow-hidden">
                <Image
                  src="/assets/Late-Founder.jpg"
                  alt="Rev Samson Adebayo Ogundeji"
                  fill
                  style={{ objectFit: "contain", objectPosition: "top" }}
                  className="rounded-lg"
                />
              </div>
              <h2 className="text-xl font-bold mb text-red-500 text-center uppercase">Late Rev.Dr Samson <br /> Adebayo Ogundeji</h2>
              <h3 className="text-lg font-semibold mb-4 text-gray-600 text-center">Founder & First General Overseer</h3>
            </div>
          </div>
        </div>
        </>  )
}