import React from "react";

function DisplayCard({ info }) {
  console.log(info);
  return (
    <div className="border-slate-600 border-[2px] rounded-lg px-8 py-4 mx-2 my-4 h-[200px]">
      <h4 className="font-extrabold text-blue-400 mt-4">{`{${info?.owner?.username}}`}</h4>
      {info?.completed ? (
        <h1 className="text-slate-500 text-lg font-bold">
          <s>{info?.title}</s>
        </h1>
      ) : (
        <h1 className="text-slate-800 text-lg font-bold">{info?.title}</h1>
      )}
      <h4 className="text-right font-light text-gray-700 mt-4">{`- ${info?.owner?.name} (${info?.owner?.company})`}</h4>
      <h4 className="text-right font-semibold text-red-700">{`Contact: (${info?.owner?.phone})`}</h4>
    </div>
  );
}

export default DisplayCard;
