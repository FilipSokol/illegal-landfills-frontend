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
  setModalReportOpen,
  setModalData,
  deleteReportPost,
  trashReportPost,
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
    <div className="h-markerbox w-full md:w-markerbox flex flex-col md:flex-row justify-start font-montserrat">
      <div className="h-auto w-full mb-2 md:mb-0 md:h-full md:w-1/2">
        <img
          src={"http://localhost:3001/images/" + imageurl}
          alt="marker"
          className="object-cover h-full w-full rounded-lg"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col md:pl-2 text-lightblack">
        <div className="h-auto w-full flex flex-col">
          <div className="h-8 w-full text-2xl flex justify-center items-center rounded-t-lg  bg-lightgreen text-white">
            Opis
          </div>
          <div className="h-auto md:h-28 w-full p-2 shadow-md flex justify-start items-start rounded-b-lg break-all">
            {description !== null ? description : "Brak opisu."}
          </div>
        </div>
        <div className="h-auto w-auto flex flex-col mt-3">
          <div className="h-8 w-full text-2xl flex justify-center items-center rounded-t-lg  bg-lightgreen text-white">
            Aktualizacje
          </div>
          <div className="h-auto md:h-16 w-full p-2 shadow-md flex flex-col justify-start items-start rounded-b-lg">
            {deleted === null && updated === null && "Brak aktualizacji."}
            <div>
              {deleted !== null &&
                deleted.substring(0, 10) +
                  " - Znacznik zostanie usunięty. Zgłoszono posprzątanie."}
            </div>
            <div>
              {updated !== null &&
                updated.substring(0, 10) + " - Śmieci nadal tutaj są"}
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full w-full mt-3 justify-around gap-y-3 md:gap-y-0">
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
              onClick={() => {
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
              onClick={() => {
                setModalReportOpen(true);
                setModalData({ markerid, userid });
              }}
              disabled={deleted !== null}
            >
              Zgłoś znacznik
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarkerBody;
