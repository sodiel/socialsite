import React, { useState } from "react";
import { Newspaper, Phone, LogOut } from "lucide-react";




const Sidebar: React.FC = () => {
  const onExit = async () => {
    localStorage.clear();
    window.location.href = "/login";
  }
  const [activeTab, setActiveTab] = useState<string>("posts");
  return (
    <div className="flex flex-col h-screen w-64 bg-slate-50 text-slate-400 z-50">
      <div className="flex flex-col p-4 mt-7">
        <div
          className={`flex items-center p-2 cursor-pointer transition-colors duration-200  ${
            activeTab === "posts"
              ? "text-slate-950 bg-slate-100 rounded-lg"
              : "hover:bg-slate-100"
          }`}
          onClick={() => setActiveTab("posts")}
        >
          <Newspaper className="mr-2" />
          <span>Посты</span>
        </div>
        <div
          className={`flex items-center p-2 cursor-pointer transition-colors duration-200  ${
            activeTab === "contacts"
              ? "text-slate-950 bg-slate-100 rounded-lg"
              : "hover:bg-slate-100"
          }`}
          onClick={() => {
            setActiveTab("contacts");
            const windowOptions =
              "width=800,height=600,resizable=yes,scrollbars=yes,status=yes";
            window.open("https://t.me/s/pnzgu", "_blank", windowOptions);
            setActiveTab("posts");
          }}
        >
          <Phone className="mr-2" />
          <span>Контакты</span>
        </div>
      </div>
      <div className="mt-auto p-4 mb-10">
        <div className="flex items-center p-2 hover:bg-slate-100 cursor-pointer transition-colors duration-300 " onClick={() => onExit()}>
          <LogOut className="mr-2" />
          <span>Выйти</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
