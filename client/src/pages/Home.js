import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../styles/pages/Home.css";
import charizardHeader from "../Assets/Packs/charizardheader.png";
import charizardPack from "../Assets/Packs/charizardpack.png";
import mewtwoPack from "../Assets/Packs/mewtwopack.png";
import mewtwoTitle from "../Assets/Packs/mewtwotitle.png";
import pikachuPack from "../Assets/Packs/pikachupack.png";
import pikachuTitle from "../Assets/Packs/pikachutitle.png";
import packheader from "../Assets/Packs/packheader.png";
import holderImage from "../Assets/UI/holder.png";
import wonderpic from "../Assets/UI/wonderPick.png";
import Shop from "../Assets/UI/shop.png";
import giftIcon from "../Assets/UI/gift.png";
import mail from "../Assets/UI/mail.png";
import hourglassholder from "../Assets/UI/hourglassholder.png";
import hourglassbackground from "../Assets/UI/hourglassbackground.png";
import hourglass from "../Assets/UI/hourglass.png";
import pack from "../Assets/UI/pack.png";
import img from "../Assets/UI/img.png";

function weightedRandom(cards, slot) {
  const filtered = cards.filter((card) => card.rarities[slot] > 0);
  const totalWeight = filtered.reduce(
    (sum, card) => sum + card.rarities[slot],
    0
  );
  let r = Math.random() * totalWeight;
  for (const card of filtered) {
    r -= card.rarities[slot];
    if (r <= 0) return card;
  }
  return filtered[filtered.length - 1];
}

const Home = () => {
  const [selectedPack, setSelectedPack] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const [pulledCards, setPulledCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPulledModal, setShowPulledModal] = useState(false);
  const [openingAnim, setOpeningAnim] = useState(false);
  const [currentPullIndex, setCurrentPullIndex] = useState(0);
  const handlePackSelect = (packName) => {
    setSelectedPack(packName);
  };

  const handleOpenPack = () => {
    if (selectedPack !== "mewtwo") {
      alert("Only Mewtwo Pack opening is implemented.");
      return;
    }
    if (!user) {
      alert("You must be logged in.");
      return;
    }

    setOpeningAnim(true);
    setError(null);
    setPulledCards([]);
    setShowPulledModal(false);
    setLoading(true);

    setTimeout(async () => {
      try {
        const resPack = await fetch(
          "http://localhost:5000/api/collection/pack/mewtwo"
        );
        const packList = await resPack.json();
        const pulls = [
          weightedRandom(packList, 1),
          weightedRandom(packList, 2),
          weightedRandom(packList, 3),
          weightedRandom(packList, 4),
          weightedRandom(packList, 5),
        ];
        setPulledCards(pulls);
        await fetch("http://localhost:5000/api/collection/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            cards: pulls.map((card) => ({ cardId: card.id, quantity: 1 })),
          }),
        });
        setShowPulledModal(true);
        setCurrentPullIndex(0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setOpeningAnim(false);
      }
    }, 600);
  };

  const handleClosePulledModal = () => {
    setPulledCards([]);
    setShowPulledModal(false);
  };

  return (
    <div className="home-container">
      <div className="bottom-row">
        <img
          src={charizardHeader}
          alt="Charizard Header"
          className={`charizard-header ${
            selectedPack === "charizard" ? "selected" : ""
          }`}
          onClick={() => handlePackSelect("charizard")}
        />
        <img
          src={packheader}
          alt="Pack Header 1"
          className={`pack-header1 ${
            selectedPack === "charizard" ? "selected" : ""
          }`}
          onClick={() => handlePackSelect("charizard")}
        />

        <img
          src={mewtwoTitle}
          alt="Mewtwo Title"
          className={`mewtwo-title ${
            selectedPack === "mewtwo" ? "selected" : ""
          }`}
          onClick={() => handlePackSelect("mewtwo")}
        />
        <img
          src={packheader}
          alt="Pack Header 2"
          className={`pack-header2 ${
            selectedPack === "mewtwo" ? "selected" : ""
          }`}
          onClick={() => handlePackSelect("mewtwo")}
        />

        <img
          src={pikachuTitle}
          alt="Pikachu Title"
          className={`pikachu-title ${
            selectedPack === "pikachu" ? "selected" : ""
          }`}
          onClick={() => handlePackSelect("pikachu")}
        />
        <img
          src={packheader}
          alt="Pack Header 3"
          className={`pack-header3 ${
            selectedPack === "pikachu" ? "selected" : ""
          }`}
          onClick={() => handlePackSelect("pikachu")}
        />

        <img
          src={charizardPack}
          alt="Charizard Pack"
          className={`charizard-pack ${
            selectedPack === "charizard" ? "selected" : ""
          }`}
          onClick={() => handlePackSelect("charizard")}
        />
        <img
          src={mewtwoPack}
          alt="Mewtwo Pack"
          className={`mewtwo-pack ${
            selectedPack === "mewtwo" ? "selected" : ""
          }`}
          onClick={() => handlePackSelect("mewtwo")}
        />
        <img
          src={pikachuPack}
          alt="Pikachu Pack"
          className={`pikachu-pack ${
            selectedPack === "pikachu" ? "selected" : ""
          }`}
          onClick={() => handlePackSelect("pikachu")}
        />

        <img src={holderImage} alt="Holder 1" className="holder1-image" />
        <img src={holderImage} alt="Holder 2" className="holder2-image" />
        <img src={holderImage} alt="Holder 3" className="holder3-image" />

        <img src={wonderpic} alt="Wonderpic" className="wonderpic-image" />
        <img src={Shop} alt="Shop" className="Shop-image" />
        <img src={giftIcon} alt="Gift" className="gift-image" />
        <img src={mail} alt="Mail" className="mail-image" />
        <img
          src={hourglassholder}
          alt="Hourglass Holder"
          className="hourglass-holder"
        />
        <img
          src={hourglassbackground}
          alt="Hourglass Background"
          className="hourglass-background"
        />
        <img src={hourglass} alt="Hourglass" className="hourglass" />
        <img
          src={pack}
          alt="Pack"
          className={`pack ${
            openingAnim && selectedPack === "mewtwo" ? "opening" : ""
          }`}
        />
        <img src={pack} alt="Pack" className="pack2" />

        <img src={img} alt="" className="gift-background" />
        <img src={img} alt="" className="mail-background" />

        <button
          className="pack-button"
          onClick={handleOpenPack}
          disabled={loading}
        >
          {loading ? "Opening..." : "OPEN PACK"}
        </button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
      {showPulledModal && pulledCards.length > 0 && (
        <div className="modal-overlay" onClick={handleClosePulledModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div
              className="pulled-card-view"
              onClick={() => {
                if (currentPullIndex < pulledCards.length - 1) {
                  setCurrentPullIndex(currentPullIndex + 1);
                } else {
                  handleClosePulledModal();
                }
              }}
            >
              {" "}
              {(() => {
                const card = pulledCards[currentPullIndex];
                // Convert the rarity name to a CSS-friendly class name
                const rarityClass = card.rare?.replace(/\s+/g, "-");
                return (
                  <div className={`pulled-card ${rarityClass}`}>
                    <img
                      src={require(`../${card.assetPath.replace(
                        "client/src/",
                        ""
                      )}`)}
                      alt={card.name}
                    />
                    <div className="card-rarity-banner">{card.rare}</div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
