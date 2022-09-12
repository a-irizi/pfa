import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import emailLogo from "../images/email.svg";
import paperLogo from "../images/paper.svg";

const Profile = ({ currentUser }) => {
  const { researcherId } = useParams();
  const userId = useSelector((store) => store.userId);
  const id = researcherId ? Number(researcherId) : userId;

  const user = useSelector((store) =>
    store.researchers.find((r) => r.id === id)
  );
  const supervisor = useSelector((store) =>
    store.researchers.find((r) => r.id === user.supervisorId)
  );

  const lastWork = useSelector((store) =>
    store.papers.find((p) => p.id === user.lastWorkId)
  );

  const coauthors = useSelector((store) =>
    store.researchers.filter((r) => lastWork.coauthorsId.includes(r.id))
  );

  const coauthorsSection = (
    <div style={{ paddingLeft: "1rem" }}>
      <div
        style={{
          marginBottom: "1rem",

          textTransform: "uppercase",
          fontFamily: "Inter",
          fontWeight: "300",
          fontSize: "1.25rem",
          letterSpacing: ".1rem",
          color: "#476681",
        }}
      >
        coauthors:
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        {coauthors.map((coauthor) => (
          <div
            key={`coauthor-${coauthor.id}`}
            style={{
              display: "flex",
              gap: ".8rem",
              alignItems: "center",
              padding: ".8rem 1.6rem",
              backgroundColor: "#ddebf8",
              border: "none",
              borderRadius: "1rem",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "6.4rem",
                height: "6.4rem",
                border: "none",
                borderRadius: "3.2rem",
                overflow: "hidden",
              }}
            >
              <Link
                to={`/${
                  coauthor.type === "professor" ? "professeurs" : "thesards"
                }/${coauthor.id}`}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  src={coauthor.profile}
                  alt="coauthor profile"
                />
              </Link>
            </div>
            <div
              style={{
                fontWeight: "600",
                textTransform: "capitalize",
                fontSize: "1.3rem",
                color: "#1c3854",
              }}
            >{`${coauthor.firstName} ${coauthor.lastName}`}</div>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <main
      style={{
        display: "flex",
        gap: "5.375rem",
        alignItems: "start",
        paddingTop: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "16.625rem",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "16.625rem",
            height: "16.625rem",
            border: "none",
            borderRadius: "50%",
            overflow: "hidden",
            marginBottom: "2.625rem",
          }}
        >
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
            src={user.profile}
            alt="user profile"
          />
        </div>
        <div
          style={{
            textTransform: "uppercase",
            fontFamily: "Inter",
            fontWeight: "300",
            fontSize: "1.25rem",
            letterSpacing: ".1rem",
            color: "#476681",
          }}
        >
          {user.type === "professor" ? "professeur" : "thésard"}
        </div>
        <div
          style={{
            fontWeight: "700",
            textTransform: "capitalize",
            fontSize: "2.625rem",
            lineHeight: ".875em",
            marginBottom: "1.5rem",
            color: "#1c3854",
            textAlign: "center",
          }}
        >{`${user.firstName} ${user.lastName}`}</div>
        <div
          style={{
            display: "flex",
            gap: ".5rem",
            alignItems: "center",
            alignSelf: "start",
            marginBottom: ".5rem",
          }}
        >
          <div style={{ width: "1.2rem", height: "1.8rem" }}>
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center",
              }}
              src={emailLogo}
              alt="at sign"
            />
          </div>
          <div style={{ color: "black" }}>{user.email}</div>
        </div>
        <div
          style={{
            display: "flex",
            gap: ".5rem",
            alignItems: "center",
            alignSelf: "start",
          }}
        >
          <div style={{ width: "1.2rem", height: "1.8rem" }}>
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center",
              }}
              src={paperLogo}
              alt="at sign"
            />
          </div>
          <Link to={`/?userId=${id}`}>Papiers</Link>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <div
          style={{
            textTransform: "uppercase",
            fontFamily: "Inter",
            fontWeight: "300",
            fontSize: "1.25rem",
            letterSpacing: ".1rem",
            color: "#476681",
          }}
        >
          université hassan II
        </div>
        <div
          style={{
            fontWeight: "700",
            textTransform: "capitalize",
            fontSize: "2.625rem",
            color: "black",
            marginBottom: "1.1rem",
          }}
        >
          faculté des sciences ben m'Sick
        </div>
        <div
          style={{
            fontWeight: "600",
            textTransform: "capitalize",
            fontSize: "1.68rem",
            color: "black",
            marginBottom: "4rem",
          }}
        >
          Laboratoire d’Analyse, Modélisation et Simulation (LAMS)
        </div>
        {supervisor && (
          <>
            <div
              style={{
                textTransform: "uppercase",
                fontFamily: "Inter",
                fontWeight: "300",
                fontSize: "1.375rem",
                letterSpacing: ".1rem",
                color: "#476681",
                marginBottom: ".25rem",
              }}
            >
              Directeur De Thése
            </div>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                padding: "1rem 2rem",
                backgroundColor: "#ddebf8",
                border: "none",
                borderRadius: "1rem",
                marginBottom: "2rem",
              }}
            >
              <div style={{ width: "8rem", height: "8rem" }}>
                <Link to={`/professeurs/${supervisor.id}`}>
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      border: "none",
                      borderRadius: "50%",
                      overflow: "hidden",
                    }}
                    src={supervisor.profile}
                    alt=""
                  />
                </Link>
              </div>
              <div
                style={{
                  fontWeight: "600",
                  textTransform: "capitalize",
                  fontSize: "1.625rem",
                  color: "#1c3854",
                }}
              >{`${supervisor.firstName} ${supervisor.lastName}`}</div>
            </div>
          </>
        )}
        {lastWork && (
          <>
            <div
              style={{
                textTransform: "uppercase",
                fontFamily: "Inter",
                fontWeight: "300",
                fontSize: "1.375rem",
                letterSpacing: ".1rem",
                color: "#476681",
                marginBottom: ".25rem",
              }}
            >
              dernier travail
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                gap: "8rem",
                marginBottom: ".5rem",
              }}
            >
              <div>
                <span
                  style={{
                    fontWeight: "700",
                    textTransform: "capitalize",
                    fontSize: "2rem",
                    color: "black",
                  }}
                >
                  titre:{" "}
                </span>
                <Link
                  to="#"
                  style={{
                    fontSize: "1.625rem",
                    fontFamily: "roboto",
                    textTransform: "capitalize",
                  }}
                >
                  {lastWork.title}
                </Link>
              </div>
              <div>
                <span
                  style={{
                    fontWeight: "700",
                    textTransform: "capitalize",
                    fontSize: "2rem",
                    color: "black",
                  }}
                >
                  type:{" "}
                </span>
                <span
                  style={{
                    fontSize: "1.625rem",
                    fontFamily: "roboto",
                    textTransform: "capitalize",
                  }}
                >
                  {lastWork.type}
                </span>
              </div>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <span
                style={{
                  fontWeight: "700",
                  textTransform: "capitalize",
                  fontSize: "2rem",
                  color: "black",
                }}
              >
                date de publication:
              </span>
              <span
                style={{
                  fontSize: "1.625rem",
                  fontFamily: "roboto",
                  textTransform: "capitalize",
                }}
              >
                {lastWork.releaseDate}
              </span>
            </div>
          </>
        )}
        {coauthors.length !== 0 && coauthorsSection}
      </div>
    </main>
  );
};

export default Profile;
