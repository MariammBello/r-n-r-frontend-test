// // import Image from "next/image"
// // import Link from "next/link"
// // import { Clock, Construction, MapPin, Calendar } from "lucide-react"

// // interface WorkInProgressProps {
// //   title: string
// //   description: string
// // }

// // export default function WorkInProgress({ title, description }: WorkInProgressProps) {
// //   return (
// //     <section className="py-12 mb-16 bg-r">
// //       <div className="bg-gradient-to-br from-[#ffffde] to-[#d6f7ff] rounded-xl p-8 shadow-sm border border-[#e09f3e]/20">
// //         <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
// //           <div className="mb-6 relative">
// //             <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md">
// //               <Construction size={48} className="text-[#e09f3e]" />
// //             </div>
// //             <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#0e2f3c] rounded-full flex items-center justify-center text-white">
// //               <Clock size={20} />
// //             </div>
// //           </div>

// //           <h2 className="text-3xl font-bold text-[#0e2f3c] mb-4">This Page is a Work in Progress</h2>

// //           <p className="text-lg text-[#4f4f4f] mb-8">{description}</p>

// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8">
// //             <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
// //               <Calendar className="text-[#e09f3e] mb-2" size={32} />
// //               <p className="text-[#0e2f3c] font-medium">Coming Soon</p>
// //             </div>
// //             <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
// //               <MapPin className="text-[#e09f3e] mb-2" size={32} />
// //               <p className="text-[#0e2f3c] font-medium">Exciting Features</p>
// //             </div>
// //             <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
// //               <Image
// //                 src="/images/placeholder.svg" // Updated path, kept placeholder.svg
// //                 alt="Premium icon"
// //                 width={32}
// //                 height={32}
// //                 className="mb-2"
// //               />
// //               <p className="text-[#0e2f3c] font-medium">Premium Experiences</p>
// //             </div>
// //           </div>

// //           <Link
// //             href="/"
// //             className="px-8 py-3 bg-[#0e2f3c] text-white rounded-md font-medium hover:bg-[#0a2530] transition-colors"
// //           >
// //             Return to Homepage
// //           </Link>
// //         </div>
// //       </div>
// //     </section>
// //   )
// // }
// "use client";
// import { useState } from "react";
// import { FaCheckCircle, FaEdit } from "react-icons/fa";

// export default function ProfilePage() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     dob: "24 Dec 1992",
//     nationality: "Nigerian",
//     gender: "Female",
//     phone: "+2348012345678",
//     emergency: "+2348123456789",
//     verification: "International Passport",
//     idNumber: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//     console.log("Saved Data:", formData);
//     // You can add API call logic here to save the data permanently
//   };

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-full md:w-1/4 bg-white p-6 border-r flex flex-col items-center md:items-start">
//         <div className="flex flex-col items-center md:items-start w-full">
//           <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
//           <h2 className="mt-3 text-lg font-bold text-center md:text-left">
//             Sarah Philips <FaCheckCircle className="inline text-green-500" />
//           </h2>
//           <p className="text-sm text-gray-500 text-center md:text-left">
//             sarah@xyz.com
//           </p>
//           <p className="text-xs text-gray-400 text-center md:text-left">
//             Certified Wanderer
//           </p>
//         </div>
//         <div className="mt-6 w-full">
//           <nav>
//             <ul className="flex flex-col space-y-2 ">
//               <li className="p-2  hover:bg-amber-500 hover:text-white">
//                 Personal Information
//               </li>
//               <li className="p-2   hover:bg-amber-500 hover:text-white">
//                 Payment Methods
//               </li>
//               <li className="p-2   hover:bg-amber-500 hover:text-white">
//                 Reservations & Trips
//               </li>
//               <li className="p-2   hover:bg-amber-500 hover:text-white">
//                 Referrals & Rewards
//               </li>
//               <li className="p-2   hover:bg-amber-500 hover:text-white">
//                 Security & Privacy
//               </li>
//               <li className="p-2   hover:bg-amber-500 hover:text-white">
//                 Settings & preferences
//               </li>
//               <li className="p-2   hover:bg-amber-500 hover:text-white">
//                 Help & Feedback
//               </li>
//               <li className="p-2  text-red-500 hover:text-black">Log Out</li>
//             </ul>
//           </nav>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="w-full md:w-3/4 p-4 md:p-8">
//         <h1 className="text-2xl font-semibold">Personal Information</h1>
//         <div className="bg-white p-6 rounded shadow mt-4">
//           <div className="flex flex-col md:flex-row justify-between">
//             <div>
//               <h2 className="text-lg font-bold">
//                 Sarah Philips{" "}
//                 <FaCheckCircle className="inline text-green-500" />
//               </h2>
//               <p className="text-sm text-gray-500">sarah@xyz.com</p>
//               <p className="text-xs text-gray-400">Certified Wanderer</p>
//             </div>
//             <button
//               className="bg-slate-800 text-white h-11 w-48 p-5 rounded flex items-center mt-4 md:mt-0 hover:bg-amber-500 hover:text-white"
//               onClick={() => setIsEditing(!isEditing)}
//             >
//               Edit <FaEdit className="ml-2" />
//             </button>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
//             <div>
//               <label className="block text-gray-600">Date of Birth</label>
//               <input
//                 type="text"
//                 name="dob"
//                 value={formData.dob}
//                 onChange={handleChange}
//                 className="w-full bg-gray-100 p-2 rounded"
//                 disabled={!isEditing}
//               />
//             </div>
//             <div>
//               <label className="block text-gray-600">Nationality</label>
//               <input
//                 type="text"
//                 name="nationality"
//                 value={formData.nationality}
//                 onChange={handleChange}
//                 className="w-full bg-gray-100 p-2 rounded"
//                 disabled={!isEditing}
//               />
//             </div>
//             <div>
//               <label className="block text-gray-600">Gender</label>
//               <input
//                 type="text"
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 className="w-full bg-gray-100 p-2 rounded"
//                 disabled={!isEditing}
//               />
//             </div>
//             <div>
//               <label className="block text-gray-600">Phone Number</label>
//               <input
//                 type="number"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="w-full bg-gray-100 p-2 rounded"
//                 disabled={!isEditing}
//               />
//             </div>
//             <div>
//               <label className="block text-gray-600">Emergency Contact</label>
//               <input
//                 type="text"
//                 name="emergency"
//                 value={formData.emergency}
//                 onChange={handleChange}
//                 className="w-full bg-gray-100 p-2 rounded"
//                 disabled={!isEditing}
//               />
//             </div>
//             <div>
//               <label className="block text-gray-600">Verification</label>
//               <select
//                 name="verification"
//                 value={formData.verification}
//                 onChange={handleChange}
//                 className="w-full bg-gray-100 p-2 rounded"
//                 disabled={!isEditing}
//               >
//                 <option>International Passport</option>
//                 <option>Driver’s License</option>
//                 <option>National ID</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-gray-600">ID Number</label>
//               <input
//                 type="number"
//                 name="idNumber"
//                 value={formData.idNumber}
//                 onChange={handleChange}
//                 className="w-full bg-gray-100 p-2 rounded"
//                 disabled={!isEditing}
//               />
//             </div>
//             <div>
//               <label className="block text-gray-600">Upload Document</label>
//               <input type="file" className="w-full p-2 " />
//               <p className="text-xs text-gray-400">
//                 File must be .jpg or .pdf and not more than 5MB
//               </p>
//             </div>
//           </div>
//           <button
//             className="mt-6 bg-gray-300 p-2 rounded w-full   hover:bg-amber-500 hover:text-white"
//             disabled={!isEditing}
//             onClick={handleSave}
//           >
//             Save
//           </button>
//           <div className="flex flex-row justify-around align-middle items-center">
//             <button className="mt-6 bg-gray-300 p-2 rounded w-60 hover:bg-amber-500 hover:text-white">
//               Verify
//             </button>

//             <p className="font-bold mt-6 ">Identity verified</p>
//             {/* <FaCheckCircle className="inline text-green-500" /> */}
//             {/* <h2 className="mt-4 text-md font-bold text-center md:text-left"> */}
//             {/* </h2> */}

//             <div className="w-11 h-11 bg-gray-300 rounded-full mt-2"></div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { FaCheckCircle, FaEdit, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    dob: "24 Dec 1992",
    nationality: "Nigerian",
    gender: "Female",
    phone: "+2348012345678",
    emergency: "+2348123456789",
    verification: "International Passport",
    idNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved Data:", formData);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Toggle Button for Sidebar */}
      <button
        className="md:hidden p-4 bg-white shadow flex items-center"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FaBars className="text-xl" />
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block fixed md:static top-0 left-0 z-50 bg-white w-3/4 md:w-1/4 h-full border-r p-6 shadow-md`}
      >
        {/* Close Button on Mobile */}
        <div className="flex justify-end md:hidden mb-4">
          <button onClick={() => setIsSidebarOpen(false)}>
            <FaTimes className="text-2xl" />
          </button>
        </div>

        {/* User Info */}
        <div className="flex flex-col items-center md:items-start w-full">
          <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          <h2 className="mt-3 text-lg font-bold text-center md:text-left">
            Sarah Philips <FaCheckCircle className="inline text-green-500" />
          </h2>
          <p className="text-sm text-gray-500 text-center md:text-left">
            sarah@xyz.com
          </p>
          <p className="text-xs text-gray-400 text-center md:text-left">
            Certified Wanderer
          </p>
        </div>

        {/* Navigation Links */}
        <div className="mt-6 w-full">
          <nav>
            <ul className="flex flex-col space-y-2">
              <li>
                <Link
                  href="/personal-info"
                  className="block p-2 hover:bg-amber-500 hover:text-white"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Personal Information
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="block p-2 hover:bg-amber-500 hover:text-white"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Payment Methods
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/reservations"
                  className="block p-2 hover:bg-amber-500 hover:text-white"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Reservations & Trips
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/referrals-rewards"
                  className="block p-2 hover:bg-amber-500 hover:text-white"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Referrals & Rewards
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/security-privacy"
                  className="block p-2 hover:bg-amber-500 hover:text-white"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Security & Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/settings-preferences"
                  className="block p-2 hover:bg-amber-500 hover:text-white"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Settings & Preferences
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/help-feedback"
                  className="block p-2 hover:bg-amber-500 hover:text-white"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Help & Feedback
                </Link>
              </li>
              <li>
                <button className="p-2 text-red-500 hover:text-black w-full text-left">
                  Log Out
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full md:w-3/4 p-4 md:p-8 ml-auto">
        <h1 className="text-2xl font-semibold">Personal Information</h1>
        <div className="bg-white p-6 rounded shadow mt-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h2 className="text-lg font-bold">
                Sarah Philips <FaCheckCircle className="inline text-green-500" />
              </h2>
              <p className="text-sm text-gray-500">sarah@xyz.com</p>
              <p className="text-xs text-gray-400">Certified Wanderer</p>
            </div>
            <button
              className="bg-slate-800 text-white h-11 w-48 p-5 rounded flex items-center mt-4 md:mt-0 hover:bg-amber-500 hover:text-white"
              onClick={() => setIsEditing(!isEditing)}
            >
              Edit <FaEdit className="ml-2" />
            </button>
          </div>

          <button
            className="mt-6 bg-gray-300 p-2 rounded w-full hover:bg-amber-500 hover:text-white"
            disabled={!isEditing}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </main>
    </div>
  );
}
