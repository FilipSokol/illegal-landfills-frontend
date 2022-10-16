import { useEffect, useState } from "react";
import authService from "../services/auth.service";

const MarkerBody = ({
  markerid,
  userid,
  imageurl,
  description,
  deleted,
  updated,
  setModalEditOpen,
  setModalData,
  deleteReportPost,
  trashReportPost,
  reportPost,
}) => {
  const [userOwnMarker, isUserOwnMarker] = useState(false);
  const user = authService.getCurrentUser();

  useEffect(() => {
    if (user) {
      const decodedJwt = authService.parseJwt(user.accessToken);
      if (decodedJwt.userid === userid) {
        isUserOwnMarker(true);
      }
    }
  }, []);

  return (
    <div className="h-markerbox w-markerbox flex justify-start font-montserrat">
      <div className="h-full w-1/2">
        <img
          src={imageurl}
          alt="marker"
          className="object-cover h-full w-full rounded-lg"
        />
      </div>
      <div className="flex flex-col pl-2 text-lightblack w-1/2">
        <div className="h-auto w-full flex flex-col">
          <div className="h-8 w-full text-2xl flex justify-center items-center rounded-t-lg  bg-lightgreen text-white">
            Opis
          </div>
          <div className="h-28 w-full p-2 shadow-md flex justify-start items-start rounded-b-lg break-all">
            {description !== null ? description : "Brak opisu."}
          </div>
        </div>
        <div className="h-auto w-auto flex flex-col mt-3">
          <div className="h-8 w-full text-2xl flex justify-center items-center rounded-t-lg  bg-lightgreen text-white">
            Aktualizacje
          </div>
          <div className="h-16 w-full p-2 shadow-md flex flex-col justify-start items-start rounded-b-lg">
            {deleted === null && updated === null && "Brak aktualizacji."}
            <div>
              {deleted !== null &&
                deleted.substring(0, 10) +
                  " - Post zostanie usunięty. Zgłoszono posprzątanie."}
            </div>
            <div>
              {updated !== null &&
                updated.substring(0, 10) + " - Śmieci nadal tutaj są"}
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full w-full mt-3 justify-around">
          <button
            className="h-10 w-full bg-sky-400	disabled:bg-neutral-700 rounded-lg text-white text-lg shadow-md"
            onClick={(e) => {
              deleteReportPost(markerid);
              e.currentTarget.disabled = true;
            }}
            disabled={deleted !== null}
          >
            Posprzątane
          </button>
          <button
            className=" h-10 w-full bg-yellow-400 disabled:bg-neutral-700 rounded-lg text-white text-lg shadow-md"
            onClick={(e) => {
              trashReportPost(markerid);
              e.currentTarget.disabled = true;
            }}
            disabled={deleted !== null}
          >
            Nadal tutaj są
          </button>

          {userOwnMarker === true ? (
            <button
              className="h-10 w-full bg-violet-500	disabled:bg-neutral-700 rounded-lg text-white text-lg shadow-md"
              onClick={(e) => {
                setModalEditOpen(true);
                setModalData({ markerid, description });
              }}
              disabled={deleted !== null}
            >
              Edytuj Opis
            </button>
          ) : (
            <button
              className="h-10 w-full bg-red-500 disabled:bg-neutral-700 rounded-lg text-white text-lg shadow-md"
              onClick={(e) => {
                reportPost(markerid);
                e.currentTarget.disabled = true;
              }}
              disabled={deleted !== null}
            >
              Zgłoś post
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarkerBody;
