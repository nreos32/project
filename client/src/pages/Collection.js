import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../styles/pages/Collection.css";

const Collection = () => {
  const [collection, setCollection] = useState([]);
  const [packCards, setPackCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortByType, setSortByType] = useState(false);
  const [sortByRarity, setSortByRarity] = useState(false);
  const [search, setSearch] = useState("");
  const [modalCard, setModalCard] = useState(null); // For zoom modal
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchCollection = async () => {
      if (!user) return;
      setLoading(true);
      setError(null);
      try {
        // Fetch collection
        const res = await fetch(
          `http://localhost:5000/api/collection?userId=${user.id}`
        );
        const data = await res.json();
        if (res.ok) {
          setCollection(data.cards || []);
        } else {
          setError(data.error || "Failed to fetch collection");
        }
      } catch (err) {
        setError("Failed to fetch collection");
      }
      setLoading(false);
    };
    fetchCollection();
  }, [user]);

  useEffect(() => {
    // Fetch Mewtwo pack card data for assetPath lookup
    const fetchPack = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/collection/pack/mewtwo"
        );
        const data = await res.json();
        if (res.ok) {
          // Assign an id if missing (fall back to index)
          const cardsWithId = data.map((card, index) => ({
            id: card.id !== undefined ? card.id : index + 1,
            ...card,
          }));
          setPackCards(cardsWithId);
        }
      } catch {}
    };
    fetchPack();
  }, []);

  // Rarity label order (lowest to highest)
  const rarityOrder = [
    "Common",
    "Uncommon",
    "Rare",
    "Double Rare",
    "Illustration Rare",
    "Special Art",
    "Immersive Rare",
    "Crown Rare",
    "Crown", // fallback for 'Crown' typo
  ];

  // Helper to normalize rarity for comparison
  const normalizeRarity = (rare) => {
    if (!rare) return "Unknown";
    let r = rare.trim().toLowerCase();
    if (r === "crown") return "crown rare";
    if (
      r === "specialart" ||
      r === "specialart" ||
      r === "specialart" ||
      r === "special art" ||
      r === "specialart "
    )
      return "special art";
    // Remove extra spaces and unify
    return r.replace(/ +/g, " ");
  };

  // Helper to get assetPath, type, name, and rarity for a card id or name
  const getCardInfo = (cardId) => {
    // Try matching by id first, then by name
    const card =
      packCards.find((c) => c.id === cardId) ||
      packCards.find((c) => c.name === cardId);
    if (!card)
      return {
        assetPath: null,
        type: "Unknown",
        rare: "Unknown",
        name: "Unknown",
      };
    let rare = card.rare || "Unknown";
    rare = normalizeRarity(rare);
    rare = rare
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      assetPath: card.assetPath,
      type: card.type || "Unknown",
      rare,
      name: card.name,
    };
  };

  // Optionally sort/group by type or rarity
  let displayCollection = collection;
  if (sortByType && packCards.length > 0) {
    displayCollection = [...collection].sort((a, b) => {
      const typeA = getCardInfo(a.cardId).type;
      const typeB = getCardInfo(b.cardId).type;
      if (typeA < typeB) return -1;
      if (typeA > typeB) return 1;
      return a.cardId - b.cardId;
    });
  } else if (sortByRarity && packCards.length > 0) {
    displayCollection = [...collection].sort((a, b) => {
      const infoA = getCardInfo(a.cardId);
      const infoB = getCardInfo(b.cardId);
      const idxA = rarityOrder
        .map(normalizeRarity)
        .indexOf(normalizeRarity(infoA.rare));
      const idxB = rarityOrder
        .map(normalizeRarity)
        .indexOf(normalizeRarity(infoB.rare));
      if (idxA !== idxB) return idxB - idxA;
      return infoA.name.localeCompare(infoB.name);
    });
  }

  // Modern search: search by name, type, or rarity
  let filteredCollection = displayCollection;
  if (search.trim() !== "") {
    const q = search.trim().toLowerCase();
    filteredCollection = displayCollection.filter((card) => {
      const info = getCardInfo(card.cardId);
      return (
        info.name.toLowerCase().includes(q) ||
        info.type.toLowerCase().includes(q) ||
        info.rare.toLowerCase().includes(q)
      );
    });
  }

  return (
    <div className="collection-container">
      <h1
        style={{
          fontFamily: "Pokemon Solid, Arial Black, sans-serif",
          color: "#fff",
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
          zIndex: 2,
        }}
      >
        Card Collection!
      </h1>
      <div className="collection-controls">
        <button
          className={`sort-btn ${sortByType ? "active" : ""}`}
          onClick={() => {
            setSortByType((prev) => !prev);
            setSortByRarity(false);
          }}
        >
          {sortByType ? "Show Default Order" : "Sort by Card Type"}
        </button>
        <button
          className={`sort-btn rarity ${sortByRarity ? "active" : ""}`}
          onClick={() => {
            setSortByRarity((prev) => !prev);
            setSortByType(false);
          }}
        >
          {sortByRarity ? "Show Default Order" : "Sort by Rarity"}
        </button>
        <input
          className="search-input"
          type="text"
          placeholder="Search by name, type, or rarity..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!loading && !error && (
        <div className="collection-scroll">
          {filteredCollection.length === 0 ? (
            <div>No cards found.</div>
          ) : (
            filteredCollection.map((card) => {
              const info = getCardInfo(card.cardId);
              if (!packCards.find((c) => c.id === card.cardId)) {
                console.warn(`Card id '${card.cardId}' not found in packCards`);
              }
              // Rarity color
              let rarityColor = "#888";
              if (info.rare === "Rare") rarityColor = "#3b4cca";
              if (info.rare === "Double Rare") rarityColor = "#b48c00";
              if (info.rare === "Illustration Rare") rarityColor = "#e67e22";
              if (info.rare === "Special Art") rarityColor = "#d72660";
              if (info.rare === "Crown Rare" || info.rare === "Crown")
                rarityColor = "#a020f0";
              if (info.rare === "Immersive Rare") rarityColor = "#009688";
              if (info.rare === "Uncommon") rarityColor = "#388e3c";
              if (info.rare === "Common") rarityColor = "#666";
              return (
                <div
                  key={card.cardId}
                  className="card-frame"
                  data-rarity={info.rare}
                  style={{ border: `3px solid ${rarityColor}` }}
                  onClick={() => setModalCard(info)}
                >
                  {info.assetPath ? (
                    (() => {
                      let imgSrc;
                      try {
                        imgSrc = require(`../${info.assetPath.replace(
                          "client/src/",
                          ""
                        )}`);
                      } catch {
                        imgSrc = require("../Assets/UI/img.png");
                      }
                      return <img src={imgSrc} alt={info.name} />;
                    })()
                  ) : (
                    <div
                      style={{
                        width: 120,
                        height: 170,
                        background: "#eaeaea",
                        borderRadius: 10,
                        marginBottom: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#bbb",
                        fontWeight: 700,
                        fontSize: 18,
                        border: `2px solid ${rarityColor}`,
                      }}
                    >
                      No Image
                    </div>
                  )}
                  <div className="card-info-overlay">
                    <div className="card-name">{info.name}</div>
                    <div className="card-qty">x{card.quantity}</div>
                    <span className="card-rarity">{info.rare}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
      {/* Modal for card zoom */}
      {modalCard && (
        <div className="modal-overlay" onClick={() => setModalCard(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            {modalCard.assetPath ? (
              (() => {
                let imgSrc;
                try {
                  imgSrc = require(`../${modalCard.assetPath.replace(
                    "client/src/",
                    ""
                  )}`);
                } catch {
                  imgSrc = require("../Assets/UI/img.png");
                }
                return <img src={imgSrc} alt={modalCard.name} />;
              })()
            ) : (
              <div
                style={{
                  width: 320,
                  height: 450,
                  background: "#eaeaea",
                  borderRadius: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#bbb",
                  fontWeight: 700,
                  fontSize: 28,
                  border: "3px solid #3b4cca",
                }}
              >
                No Image
              </div>
            )}
            <div style={{ marginTop: 18, textAlign: "center" }}>
              <div
                style={{
                  fontWeight: 900,
                  fontSize: 28,
                  color: "#222",
                  textShadow: "1px 1px 0 #fff, 0 0 8px #ffcb05aa",
                }}
              >
                {modalCard.name}
              </div>
              <div style={{ fontSize: 20, color: "#3b4cca", fontWeight: 700 }}>
                {modalCard.type}
              </div>
              <div style={{ fontSize: 20, color: "#b48c00", fontWeight: 800 }}>
                {modalCard.rare}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collection;
