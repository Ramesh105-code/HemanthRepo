import React, { useState } from "react";
import "./Lightbox.css";

interface Image {
  id: number;
  src: string;
  alt: string;
}

interface LightboxProps {
  images: Image[];
}

const Lightbox: React.FC<LightboxProps> = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const selectImage = (index: number) => setCurrentIndex(index);

  return (
    <>
      <div className="grid">
        {images.map((img, idx) => (
          <div key={img.id} className="thumbnail-container" onClick={() => openModal(idx)}>
            <img className="thumbnail" src={img.src} alt={img.alt} />
            <div className="overlay"></div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img className="main-image" src={images[currentIndex].src} alt={images[currentIndex].alt} />
            <div className="thumbnails-bar">
              {images.map((img, idx) => (
                <img
                  key={img.id}
                  className={`thumbnail-modal ${currentIndex === idx ? "active" : ""}`}
                  src={img.src}
                  alt={img.alt}
                  onClick={() => selectImage(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Lightbox;
