import React from "react";

const FeatureCard = ({ Icon, title, description }) => {
  return (
    <div className="text-center p-6 rounded-lg bg-zinc-950 border-[2px] border-zinc-800/70 backdrop-blur-sm hover:bg-zinc-900 transition-all duration-300 hover:scale-102 group">
      <div className="w-16 h-16 bg-zinc-700/50 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-400 group-hover:scale-120 group:hover-rotate-30">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-zinc-400">{description}</p>
    </div>
  );
};

export default FeatureCard;
