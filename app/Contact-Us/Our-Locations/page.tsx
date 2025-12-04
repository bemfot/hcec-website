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

        <div className="relative w-full h-[25rem] overflow">
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
                className="h-[6rem] w-[10rem]"
              />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold">
              Worship With Us Today
            </h1>
            <div className="mt-3 bg-[#0C101C]/50 text-gradient-to-r  rounded-4xl">
              <p className="text-lg md:text-2xl font-sm my-1 p-2 border-1 border-white  font-bold backdrop-blur-xl ">
                Our Church Locations in Various Regions are Below
              </p>
            </div>
          </div>
        </div>
        <div className="px-10">
          <div className="overflow-x-auto mt-10 border-white rounded-2xl shadow-lg shadow-gray-500/60">
            <table className="table-auto border-collapse w-full">
              {/* Table Header */}
              <thead>
                <tr className="border border-white  bg-white  text-red-500">
                  <th className="border-x border-white px-4 py-2">S/NO</th>
                  <th className="border-x border-white px-10 py-2">DISTRICT</th>
                  <th className="border-x border-white px-4 py-2">
                    DISTRICT HEADQUARTERS ADDRESS
                  </th>
                  <th className="border-x border-white px-4 py-2">
                    DISTRICT OVERSEERS
                  </th>
                  <th className="border-x border-white px-4 py-2">PHONE NO</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                <tr className="my-2 rounded-2xl border">
                  <td className="border-x px-4 py-2">1.</td>
                  <td className="border-x px-4 py-2">College Crescent</td>
                  <td className="border-x px-4 py-2">
                    6, Adekunle Street, Behind Christ The Redeemer Secondary
                    School, Molete, Ibadan
                  </td>
                  <td className="border-x px-4 py-2">Pastor S. Olu Akinbo</td>
                  <td className="border-x px-4 py-2">+2348035012113</td>
                </tr>
                <tr className="my-2 rounded border">
                  <td className="border-x px-4 py-2">2.</td>
                  <td className="border-x px-4 py-2">Sango-Ibadan</td>
                  <td className="border-x px-4 py-2">
                    Behind Humani Alaga Secondary School, Off Poly Road, Ibadan.
                  </td>
                  <td className="border-x px-4 py-2">Pastor S. Olu Akinbo</td>
                  <td className="border-x px-4 py-2">+2348035012113</td>
                </tr>
                <tr className="my-2 rounded border">
                  <td className="border-x px-4 py-2">3.</td>
                  <td className="border-x px-4 py-2">Molade</td>
                  <td className="border-x px-4 py-2">
                    Behind Ayepe Primary School, Molade, Ibadan
                  </td>
                  <td className="border-x px-4 py-2">Pastor Moses Afolabi</td>
                  <td className="border-x px-4 py-2">+2348125740553</td>
                </tr>
                <tr className="my-2 rounded border">
                  <td className="border-x px-4 py-2">4.</td>
                  <td className="border-x px-4 py-2">Ajegule, Saki</td>
                  <td className="border-x px-4 py-2">
                    43,John Popoola Street, Ajegunle, Saki
                  </td>
                  <td className="border-x px-4 py-2">Pastor S.O Adeleye</td>
                  <td className="border-x px-4 py-2">+2348030658512</td>
                </tr>
                <tr className="my-2 rounded border">
                  <td className="border-x px-4 py-2">5.</td>
                  <td className="border-x px-4 py-2">Abimbola-Saki</td>
                  <td className="border-x px-4 py-2">Abimbola Layout, Saki</td>
                  <td className="border-x px-4 py-2">Pastor Femi Omisande</td>
                  <td className="border-x px-4 py-2">+234 814 6919190</td>
                </tr>
                <tr className="my-2 rounded border">
                  <td className="border-x px-4 py-2">6.</td>
                  <td className="border-x px-4 py-2">Akoko, Ondo State</td>
                  <td className="border-x px-4 py-2">
                    Mary Hill Nursery and Primary School Oke Akoko, Ondo State
                  </td>
                  <td className="border-x px-4 py-2">Evang. J. Abass</td>
                  <td className="border-x px-4 py-2">+234 803 2105523</td>
                </tr>
                <tr className="my-2 rounded border">
                  <td className="border-x px-4 py-2">7.</td>
                  <td className="border-x px-4 py-2">Agege, Lagos</td>
                  <td className="border-x px-4 py-2">
                    1a, Power Line, Oko-Oba Agege, Lagos.
                  </td>
                  <td className="border-x px-4 py-2">Pastor Josiah Jesufemi</td>
                  <td className="border-x px-4 py-2">+234 703 1665334</td>
                </tr>
                <tr className="my-2 rounded border">
                  <td className="border-x px-4 py-2">8.</td>
                  <td className="border-x px-4 py-2">Eko-Kan</td>
                  <td className="border-x px-4 py-2">
                    Along International Market, Eko-Kan, Saki, Oyo State
                  </td>
                  <td className="border-x px-4 py-2">Pastor E. A. Ojoawo</td>
                  <td className="border-x px-4 py-2">+234 814 3021010</td>
                </tr>
                <tr className="my-2 rounded border">
                  <td className="border-x px-4 py-2">9.</td>
                  <td className="border-x px-4 py-2">Gando</td>
                  <td className="border-x px-4 py-2">Moussiou, Gando, Togo</td>
                  <td className="border-x px-4 py-2">Pastor Baale Elisha</td>
                  <td className="border-x px-4 py-2">+229-95673241</td>
                </tr>
                <tr className="my-2 rounded border">
                  <td className="border-x px-4 py-2">10.</td>
                  <td className="border-x px-4 py-2">Parakou</td>
                  <td className="border-x px-4 py-2">
                    Albarika, Parakou, Benin Republic
                  </td>
                  <td className="border-x px-4 py-2">Pastor Francis Gnami</td>
                  <td className="border-x px-4 py-2">+228-91906010</td>
                </tr>
                <tr className="my-2 rounded border">
                  <td className="border-x px-4 py-2">11.</td>
                  <td className="border-x px-4 py-2">Bukuro</td>
                  <td className="border-x px-4 py-2">Bukuro, Kwara, Nigeria</td>
                  <td className="border-x px-4 py-2">Pastor Modeste Akakpo</td>
                  <td className="border-x px-4 py-2">+229-97430804</td>
                </tr>
                <tr className="my-2 rounded border">
                  <td className="border-x px-4 py-2">12.</td>
                  <td className="border-x px-4 py-2">Oyo</td>
                  <td className="border-x px-4 py-2">
                    Opposite Oranmiyan Grammar School, Soro Hill, Sabo, Oyo
                  </td>
                  <td className="border-x px-4 py-2">
                    Pastor Moses AjijolaJesu
                  </td>
                  <td className="border-x px-4 py-2">+234 814 4535690</td>
                </tr>
                <tr className="my-2 rounded border">
                  <td className="border-x px-4 py-2">13.</td>
                  <td className="border-x px-4 py-2">Abuja</td>
                  <td className="border-x px-4 py-2">
                    Behind LEA Primary School, Lugbe, Airport Road, Abuja
                  </td>
                  <td className="border-x px-4 py-2">
                    Pastor Gbenga Oluwatayo
                  </td>
                  <td className="border-x px-4 py-2">+234 8039608050</td>
                </tr>
                <tr className="my-2 rounded border">
                  <td className="border-x px-4 py-2">14.</td>
                  <td className="border-x px-4 py-2">Kajola</td>
                  <td className="border-x px-4 py-2">
                    Oluwole Street, behind K. K. Bread, High School, Kajola,
                    Akure
                  </td>
                  <td className="border-x px-4 py-2">Pastor Sule Akinlolu</td>
                  <td className="border-x px-4 py-2">+234 838619990</td>
                </tr>
                <tr className="my-2 rounded border">
                  <td className="border-x px-4 py-2">15.</td>
                  <td className="border-x px-4 py-2">Ipele, Owo</td>
                  <td className="border-x px-4 py-2">
                    3, Idera Street, Ipele Owo, Ondo State
                  </td>
                  <td className="border-x px-4 py-2">Pastor Oluponna N.O.A.</td>
                  <td className="border-x px-4 py-2">+234 8038393403</td>
                </tr>
                <tr className="my-2 rounded border">
                  <td className="border-x px-4 py-2">16.</td>
                  <td className="border-x px-4 py-2">Sango - Ota</td>
                  <td className="border-x px-4 py-2">
                    Lanre Oyefemi Close, Beside FAS School, Sango-Ota
                  </td>
                  <td className="border-x px-4 py-2">
                    Pastor Aruleba Sesan Isaac
                  </td>
                  <td className="border-x px-4 py-2">+234 8028321835</td>
                </tr>
                <tr className="my-2 rounded border">
                  <td className="border-x px-4 py-2">17.</td>
                  <td className="border-x px-4 py-2">Ado Ekiti Central</td>
                  <td className="border-x px-4 py-2">
                    Adjacent NOVA Secondary School, NOVA Road, Opopo Gbora, Ado
                    Ekiti
                  </td>
                  <td className="border-x px-4 py-2">Pastor Victor Ogunyemi</td>
                  <td className="border-x px-4 py-2">+234 7033824133</td>
                </tr>
                <tr className="my-2 rounded border">
                  <td className="border-x px-4 py-2">18.</td>
                  <td className="border-x px-4 py-2">Oke-lla, Ado Ekiti</td>
                  <td className="border-x px-4 py-2">
                    No. 1, Ilupeju Avenue, Odo-Ado, Ado-Ekiti
                  </td>
                  <td className="border-x px-4 py-2">Pastor S. O. Adedipe</td>
                  <td className="border-x px-4 py-2">+234 8033846123</td>
                </tr>
                <tr className="my-2 rounded border">
                  <td className="border-x px-4 py-2">19.</td>
                  <td className="border-x px-4 py-2">Ilawe - Ekiti</td>
                  <td className="border-x px-4 py-2">
                    52, Afunremu Street, Okebedo Quarter, Ilawe-Ekiti
                  </td>
                  <td className="border-x px-4 py-2">Pastor E. O. Bolaji</td>
                  <td className="border-x px-4 py-2">+234 8038466373</td>
                </tr>
                <tr className="my-2 rounded border">
                  <td className="border-x px-4 py-2">20.</td>
                  <td className="border-x px-4 py-2">Oke-Ijebu, Akure</td>
                  <td className="border-x px-4 py-2">
                    105, Oke Ijebu Street, Beside Matrix Petrol Station, Akure
                  </td>
                  <td className="border-x px-4 py-2">
                    Evangelist Tope Olasusi
                  </td>
                  <td className="border-x px-4 py-2">+234 8033925096</td>
                </tr>
                <tr className="my-2 rounded border">
                  <td className="border-x px-4 py-2">21.</td>
                  <td className="border-x px-4 py-2">Oke-Aro, Akure</td>
                  <td className="border-x px-4 py-2">
                    Behind Police Station, B Division, Oke-Aro, Akure
                  </td>
                  <td className="border-x px-4 py-2">Pastor Festus Alabi</td>
                  <td className="border-x px-4 py-2">+234 8033639968</td>
                </tr>
                <tr className="my-2 rounded border">
                  <td className="border-x px-4 py-2">22.</td>
                  <td className="border-x px-4 py-2">Kwara</td>
                  <td className="border-x px-4 py-2">
                    35, Ejiba Street, Off Stadium Road, Ilorin
                  </td>
                  <td className="border-x px-4 py-2">
                    Deacon Bamidele Oguntimehin
                  </td>
                  <td className="border-x px-4 py-2">+234 8035828510</td>
                </tr>
                <tr className="my-2 rounded border">
                  <td className="border-x px-4 py-2">23.</td>
                  <td className="border-x px-4 py-2">Osogbo</td>
                  <td className="border-x px-4 py-2">
                    Dada Estate, Behind MTN Office, Osogbo
                  </td>
                  <td className="border-x px-4 py-2">Pastor Festus Oladele</td>
                  <td className="border-x px-4 py-2">+234 7032045312</td>
                </tr>
                <tr className="my-2 rounded border">
                  <td className="border-x px-4 py-2">24.</td>
                  <td className="border-x px-4 py-2">Owo</td>
                  <td className="border-x px-4 py-2">
                    15, Oke Street, Iselu Owo
                  </td>
                  <td className="border-x px-4 py-2">Pastor Steve Adekunle</td>
                  <td className="border-x px-4 py-2">+234 8051501228</td>
                </tr>
                <tr className="my-2 rounded border">
                  <td className="border-x px-4 py-2">25.</td>
                  <td className="border-x px-4 py-2">Ikere-Ekiti</td>
                  <td className="border-x px-4 py-2">
                    Odo-Oja Street, Ikere-Ekiti
                  </td>
                  <td className="border-x px-4 py-2">Pastor S. A. Adewusi</td>
                  <td className="border-x px-4 py-2">+234 8035148522</td>
                </tr>
                <tr className="my-2 rounded border">
                  <td className="border-x px-4 py-2">26.</td>
                  <td className="border-x px-4 py-2">Boluwaduro</td>
                  <td className="border-x px-4 py-2">
                    Zone 8, Boluwaduro Street, Off Onaala, Ado-Ekiti
                  </td>
                  <td className="border-x px-4 py-2">Pastor Agbaje Ayorinde</td>
                  <td className="border-x px-4 py-2">+234 8133217099</td>
                </tr>
                <tr className="my-2 rounded border">
                  <td className="border-x px-4 py-2">27.</td>
                  <td className="border-x px-4 py-2">Materi</td>
                  <td className="border-x px-4 py-2">
                    His Coming Evangelical Church, Materi
                  </td>
                  <td className="border-x px-4 py-2">Pastor Mark Tchanete</td>
                  <td className="border-x px-4 py-2">+22963825232</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ContactFooter />
      <Footer />
    </div>
  );
}
