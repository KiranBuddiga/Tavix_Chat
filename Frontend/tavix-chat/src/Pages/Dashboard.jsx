import React, { useEffect, useState } from "react";
import axios from "axios";
import { LogOut, MessageSquarePlus, X } from "lucide-react";
import { useLoginStore } from "../Store/useLoginStore";
import { useNavigate } from "react-router-dom";

const JSONDATA = [
  {
    id: 1,
    firstName: "Emily",
    lastName: "Johnson",
    username: "emilys",
    email: "emily.johnson@x.dummyjson.com",
    mobile: "+81 965-431-3024",
    image: "https://dummyjson.com/icon/emilys/128",
    about:
      "Frontend developer who enjoys building clean UI components and responsive web applications.",
  },
  {
    id: 2,
    firstName: "Michael",
    lastName: "Williams",
    username: "michaelw",
    email: "michael.williams@x.dummyjson.com",
    mobile: "+49 258-627-6644",
    image: "https://dummyjson.com/icon/michaelw/128",
    about:
      "Backend engineer focused on APIs, database design, and scalable server architecture.",
  },
  {
    id: 3,
    firstName: "Sophia",
    lastName: "Brown",
    username: "sophiab",
    email: "sophia.brown@x.dummyjson.com",
    mobile: "+81 210-652-2785",
    image: "https://dummyjson.com/icon/sophiab/128",
    about:
      "UI/UX designer passionate about accessible interfaces and modern product experiences.",
  },
  {
    id: 4,
    firstName: "James",
    lastName: "Davis",
    username: "jamesd",
    email: "james.davis@x.dummyjson.com",
    mobile: "+49 614-958-9364",
    image: "https://dummyjson.com/icon/jamesd/128",
    about:
      "Full stack developer working with React, Node.js, and MongoDB to build end-to-end solutions.",
  },
  {
    id: 5,
    firstName: "Emma",
    lastName: "Miller",
    username: "emmaj",
    email: "emma.miller@x.dummyjson.com",
    mobile: "+91 759-776-1614",
    image: "https://dummyjson.com/icon/emmaj/128",
    about:
      "Mobile app enthusiast interested in cross-platform development and smooth user experiences.",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { loading, logout } = useLoginStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogout = async () => {
    const res = await logout();
    if (res?.status === 200) {
      setLogoutModalOpen(false);
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-3">
      <div className="border-r border-slate-200 bg-white/50 flex flex-col h-screen">
        <div className="bg-teal-600 shadow-sm">
          <div className="flex justify-between items-center h-full px-4 py-4">
            <p className="text-2xl text-black font-semibold tracking-wide font-Pacifico">
              Travix
            </p>
            <div className="flex items-center gap-4">
              <MessageSquarePlus className="text-black hover:cursor-pointer hover:scale-110 transition" />
              <LogOut
                className="text-black hover:cursor-pointer hover:scale-110 transition"
                onClick={() => setLogoutModalOpen(true)}
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3">
          <input
            type="text"
            className="w-full border border-slate-300 rounded-full px-4 py-2 font-Quicksand font-medium focus:ring-2 focus:ring-teal-500 outline-none"
            placeholder="Search Chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="overflow-y-auto">
          {JSONDATA?.map((chat, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer transition"
            >
              <img
                src={chat?.image}
                className="w-14 h-14 rounded-full object-cover border"
                alt="user"
              />
              <div>
                <p className="font-medium text-slate-800">
                  {chat?.firstName + " " + chat?.lastName}
                </p>
                <p className="text-sm text-slate-500 line-clamp-1">
                  {chat?.about}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-3xl">Hello Welcome to Dashboard</p>
      {logoutModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-semibold text-slate-800 font-Quicksand">
                Logout
              </p>
              <X
                className="w-5 h-5 cursor-pointer text-slate-500 hover:text-black"
                onClick={() => setLogoutModalOpen(false)}
              />
            </div>
            <p className="text-slate-600 mb-6 font-Quicksand">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setLogoutModalOpen(false)}
                className="px-4 py-2 font-Quicksand font-medium rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={loading}
                className="px-4 py-2 font-Quicksand font-medium rounded-lg bg-red-500 text-white hover:bg-red-600 transition disabled:cursor-not-allowed"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
