"use client";
import React from "react";
import Image from "next/image";
import Footer from "@/app/components/Footer";
import ContactLinks from "@/app/Contact-Us/ContactLinks/ContactLinks";
import ContactFooter from "../ContactFooter/ContactFooter";

export default function OurLocations() {
  return (
    <div>
      <ContactLinks />
      <div className="text-white  justify-center bg-[#0C101C]  flex flex-col">
        <h2></h2>
        <p></p>

        <div className="relative w-full h-100 overflow">
          <Image
            src="/assets/worship.jpg"
            alt="Your Image"
            fill
            className="object-cover blur-[2px]"
            style={{ zIndex: 0 }}
          />
          <div className="absolute text-shadow-black shadow-7xl inset-0 flex flex-col justify-center items-center  text-white ">
            <div>
              <Image
                src="/assets/HCEC_LOGO.png"
                width={80}
                height={48}
                alt="Church logo"
                className="h-24 w-40"
              />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold">
              Worship With Us Today
            </h1>
            <div className="mt-3 bg-[#0C101C]/50 text-gradient-to-r  rounded-4xl">
              <p className="text-lg md:text-2xl font-sm my-1 p-2 border border-white  font-bold backdrop-blur-xl ">
                Our Church Locations in Various Regions are Below
              </p>
            </div>
          </div>
        </div>
        <div className="px-6 md:px-10">
          <div className="max-w-7xl mx-auto mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {
                // Inline dataset converted from table rows
                [
                  {
                    id: 1,
                    district: "College Crescent",
                    address:
                      "6, Adekunle Street, Behind Christ The Redeemer Secondary School, Molete, Ibadan",
                    overseer: "Pastor S. Olu Akinbo",
                    phone: "+2348035012113",
                  },
                  {
                    id: 2,
                    district: "Sango-Ibadan",
                    address:
                      "Behind Humani Alaga Secondary School, Off Poly Road, Ibadan.",
                    overseer: "Evang. Wale Joseph",
                    phone: "2348164877944",
                  },
                  {
                    id: 3,
                    district: "Molade",
                    address: "Behind Ayepe Primary School, Molade, Ibadan",
                    overseer: "Pastor Ayo Oluwatayo",
                    phone: "+2348069472276",
                  },
                  {
                    id: 4,
                    district: "Ajegule, Saki",
                    address: "43,John Popoola Street, Ajegunle, Saki",
                    overseer: "Pastor S.O Adeleye",
                    phone: "+2348030658512",
                  },
                  {
                    id: 5,
                    district: "Abimbola-Saki",
                    address: "Abimbola Layout, Saki",
                    overseer: "Pastor Femi Omisande",
                    phone: "+234 814 6919190",
                  },
                  {
                    id: 6,
                    district: "Akoko, Ondo State",
                    address:
                      "Mary Hill Nursery and Primary School Oke Akoko, Ondo State",
                    overseer: "Evang. J. Abass",
                    phone: "+234 8032150523",
                  },
                  {
                    id: 7,
                    district: "Agege, Lagos",
                    address: "1a, Power Line, Oko-Oba Agege, Lagos.",
                    overseer: "Pastor Josiah Jesufemi",
                    phone: "+234 703 1665334",
                  },
                  {
                    id: 8,
                    district: "Eko-Kan",
                    address:
                      "Along International Market, Eko-Kan, Saki, Oyo State",
                    overseer: "Pastor E. A. Ojoawo",
                    phone: "+2348143201205",
                  },
                  {
                    id: 9,
                    district: "Gando",
                    address: "Moussiou, Gando, Togo",
                    overseer: "Pastor Baale Elisha",
                    phone: "+229-95673241",
                  },
                  {
                    id: 10,
                    district: "Parakou",
                    address: "Albarika, Parakou, Benin Republic",
                    overseer: "Pastor Francis Gnami",
                    phone: "+228-91906010",
                  },
                  {
                    id: 11,
                    district: "Bukuro",
                    address: "Bukuro, Kwara, Nigeria",
                    overseer: "Pastor Modeste Akakpo",
                    phone: "+229-97438084",
                  },
                  {
                    id: 12,
                    district: "Oyo",
                    address:
                      "Opposite Oranmiyan Grammar School, Soro Hill, Sabo, Oyo",
                    overseer: "Pastor S.O Omiwole",
                    phone: "+2348054653197",
                  },
                  {
                    id: 13,
                    district: "Abuja",
                    address:
                      "Behind LEA Primary School, Lugbe, Airport Road, Abuja",
                    overseer: "Pastor Gbenga Oluwatayo",
                    phone: "+234 8039608050",
                  },
                  {
                    id: 14,
                    district: "Kajola",
                    address:
                      "Oluwole Street, behind K. K. Bread, High School, Kajola, Akure",
                    overseer: "Pastor Sule Akinlolu",
                    phone: "+234 838619990",
                  },
                  {
                    id: 15,
                    district: "Ipele, Owo",
                    address: "3, Idera Street, Ipele Owo, Ondo State",
                    overseer: "Pastor Oluponna N.O.A.",
                    phone: "+234 8038393403",
                  },
                  {
                    id: 16,
                    district: "Sango - Ota",
                    address:
                      "Lanre Oyefemi Close, Beside FAS School, Sango-Ota",
                    overseer: "Pastor Aruleba Sesan Isaac",
                    phone: "+234 8028321835",
                  },
                  {
                    id: 17,
                    district: "Ado Ekiti Central",
                    address:
                      "Adjacent NOVA Secondary School, NOVA Road, Opopo Gbora, Ado Ekiti",
                    overseer: "Pastor Victor Ogunyemi",
                    phone: "+234 7033824133",
                  },
                  {
                    id: 18,
                    district: "Oke-lla, Ado Ekiti",
                    address: "No. 1, Ilupeju Avenue, Odo-Ado, Ado-Ekiti",
                    overseer: "Pastor S. O. Adedipe",
                    phone: "+234 8033846123",
                  },
                  {
                    id: 19,
                    district: "Ilawe - Ekiti",
                    address:
                      "52, Afunremu Street, Okebedo Quarter, Ilawe-Ekiti",
                    overseer: "Pastor E. O. Bolaji",
                    phone: "+234 8038466373",
                  },
                  {
                    id: 20,
                    district: "Oke-Ijebu, Akure",
                    address:
                      "105, Oke Ijebu Street, Beside Matrix Petrol Station, Akure",
                    overseer: "Evangelist Tope Olasusi",
                    phone: "+234 8033925096",
                  },
                  {
                    id: 21,
                    district: "Oke-Aro, Akure",
                    address:
                      "Behind Police Station, B Division, Oke-Aro, Akure",
                    overseer: "Pastor Festus Alabi",
                    phone: "+234 8033639968",
                  },
                  {
                    id: 22,
                    district: "Kwara",
                    address: "35, Ejiba Street, Off Stadium Road, Ilorin",
                    overseer: "Deacon Bamidele Oguntimehin",
                    phone: "+234 8035828510",
                  },
                  {
                    id: 23,
                    district: "Osogbo",
                    address: "Dada Estate, Behind MTN Office, Osogbo",
                    overseer: "Pastor Festus Oladele",
                    phone: "+234 7032045312",
                  },
                  {
                    id: 24,
                    district: "Owo",
                    address: "15, Oke Street, Iselu Owo",
                    overseer: "Pastor Steve Adekunle",
                    phone: "+234 8051501228",
                  },
                  {
                    id: 25,
                    district: "Ikere-Ekiti",
                    address: "Odo-Oja Street, Ikere-Ekiti",
                    overseer: "Pastor S. A. Adewusi",
                    phone: "+234 8035148522",
                  },
                  {
                    id: 26,
                    district: "Boluwaduro",
                    address: "Zone 8, Boluwaduro Street, Off Onaala, Ado-Ekiti",
                    overseer: "Pastor Agbaje Ayorinde",
                    phone: "+234 8133217099",
                  },
                  {
                    id: 27,
                    district: "Materi",
                    address: "His Coming Evangelical Church, Materi",
                    overseer: "Pastor Mark Tchanete",
                    phone: "+22963825232",
                  },
                ].map((loc) => (
                  <article
                    key={loc.id}
                    className="bg-white rounded-lg shadow-md p-6 border"
                  >
                    <div className="flex items-start gap-4">
                      <div className="shrink-0">
                        <svg
                          className="w-10 h-10 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1 1 0 0 1-1.414 0l-4.243-4.243A8 8 0 1 1 17.657 16.657z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {loc.district}
                        </h3>
                        <p className="text-sm text-gray-900 mt-2">
                          {loc.address}
                        </p>
                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="text-sm text-gray-900">
                            <div className="font-medium">Overseer</div>
                            <div>{loc.overseer}</div>
                          </div>
                          <a
                            href={`tel:${loc.phone}`}
                            className="inline-flex items-center gap-2 text-sm text-red-600 font-medium"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.2 3.6a1 1 0 01-.217 1.01L8.28 10.72a11.042 11.042 0 005.999 5.999l1.739-1.91a1 1 0 011.01-.217l3.6 1.2A1 1 0 0121 17.72V21a2 2 0 01-2 2h-1C6.477 23 1 17.523 1 11V10a2 2 0 012-2h0z"
                              ></path>
                            </svg>
                            {loc.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <ContactFooter />
      <Footer />
    </div>
  );
}
