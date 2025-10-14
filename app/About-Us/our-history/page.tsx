'use client'

import React from 'react';
import Image from 'next/image';
import Footer from '../../components/Footer';


export default function OurHistory() {
  return (
    <>
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f3f4f6]">
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
            <h1 className="text-4xl font-bold text-[#0C101C] text-center">OUR HISTORY</h1>
          </div>
          <div className="text-gray-700 text-lg leading-relaxed justify-center align-center">
            <p className='mb-3'>
           The history of this church cannot be fully given in this booklet, but it can be briefly stated. The foundation of this Evangelical Church can be traced to seven (7) men who met frequently to pray for the revival which God promised all Christian Churches and to usher in the salvation of non-Christians. The seven afore-said Christian brothers started their spiritual life in one of the Pentecostal Churches in Nigeria, (The Redeemed Christian Church of God) which has its headquarters in Lagos. A local assembly of the church was at Ibadan where they were all converted. <br /> 
           </p>
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

      
    </div>
    <Footer/>
    </>
  );
}