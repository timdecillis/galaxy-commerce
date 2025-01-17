import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faCircleChevronRight,
  faCircleChevronLeft,
  faExpand,
  faCircle,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";

import ImageZoom from "./ImageZoom.jsx";

const ImageGallery = ({
  product,
  style,
  activeImageIndex,
  setActiveImageIndex,
  expandedView,
  setExpandedView,
}) => {
  const [photos, setPhotos] = useState([]);
  const [thumbnailRange, setThumbnailRange] = useState([0, 7]);
  const [zoomedMode, setZoomedMode] = useState(false);
  const [currentPhotoURL, setCurrentPhotoURL] = useState("");
  const [bounds, setBounds] = useState({});
  const boundsRef = useRef(null);

  useEffect(() => {
    const handleEscPress = (e) => {
      if (e.key === "Escape" || e.keyCode === 27) {
        setExpandedView(false);
      }
    };

    window.addEventListener("keydown", handleEscPress);
  }, []);

  useEffect(() => {
    if (!!style.photos) {
      setPhotos(style.photos);
    }
  }, [style]);

  useEffect(() => {
    setZoomedMode(false);
    setExpandedView(false);
    setThumbnailRange([0, 7]);
  }, [product]);

  useEffect(() => {
    if (!!style.photos) {
      if (
        !!style.photos[activeImageIndex] &&
        style.photos[activeImageIndex].url !== null
      ) {
        setCurrentPhotoURL(style.photos[activeImageIndex].url);
      } else {
        setCurrentPhotoURL(
          "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
        );
      }
    } else {
      setCurrentPhotoURL(
        "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
      );
    }
  }, [style, product, activeImageIndex]);

  useEffect(() => {
    const handleWindowEvent = () => {
      if (!!boundsRef.current) {
        setBounds(boundsRef.current.getBoundingClientRect());
      }
    };

    window.addEventListener("resize", handleWindowEvent);
    window.addEventListener("scroll", handleWindowEvent);
  }, []);

  useEffect(() => {
    if (!!boundsRef.current) {
      setBounds(boundsRef.current.getBoundingClientRect());
    }
  }, [expandedView, zoomedMode]);

  useEffect(() => {
    if (
      currentPhotoURL ===
      "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
    ) {
      setExpandedView(false);
      setZoomedMode(false);
    }
  }, [currentPhotoURL]);

  const scrollThumbnails = (incrementValue) => {
    var newRange = [
      thumbnailRange[0] + incrementValue,
      thumbnailRange[1] + incrementValue,
    ];
    setThumbnailRange(newRange);
  };

  const selectThumbnail = (index) => {
    if (index !== activeImageIndex) {
      setActiveImageIndex(index);
    }
  };

  const updateActivePhotoIndex = (incrementValue) => {
    var newIndex = activeImageIndex + incrementValue;
    setActiveImageIndex(newIndex);

    if (newIndex < thumbnailRange[0]) {
      setThumbnailRange([newIndex, newIndex + 7]);
    } else if (newIndex > thumbnailRange[1] - 1) {
      setThumbnailRange([newIndex - 6, newIndex + 1]);
    }
  };

  const toggleExpandedView = (e) => {
    if (
      currentPhotoURL ===
      "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
    ) {
      setExpandedView(false);
    } else {
      setExpandedView(!expandedView);
    }
  };

  const toggleZoomedView = () => {
    setZoomedMode(!zoomedMode);
  };

  const getBounds = (e) => {
    return e.currentTarget.getBoundingClientRect();
  };

  if (Array.isArray(photos) && photos.length) {
    if (expandedView === false) {
      return (
        <section
          className="image-gallery"
          id="image-gallery-default"
          style={
            currentPhotoURL ===
            "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
              ? {
                  backgroundImage: `url(${currentPhotoURL})`,
                  cursor: "default",
                }
              : { backgroundImage: `url(${currentPhotoURL})` }
          }
          onClick={(e) => toggleExpandedView(e)}
        >
          <div id="thumbnail-container">
            <div className="thumbnail-chevron-container">
              {thumbnailRange[0] > 0 ? (
                <FontAwesomeIcon
                  icon={faChevronUp}
                  className="ig-nav"
                  size="lg"
                  fixedWidth
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollThumbnails(-1);
                  }}
                />
              ) : (
                <></>
              )}
            </div>
            {photos.map((photo, i) => {
              if (i >= thumbnailRange[0] && i < thumbnailRange[1]) {
                if (i === activeImageIndex) {
                  return (
                    <div
                      key={i}
                      style={{
                        backgroundImage: `url(${photo.thumbnail_url})`,
                        filter:
                          "drop-shadow(0 0 1px rgba(255, 255, 255, 0.1)) brightness(1.1)",
                      }}
                      className="ig-thumbnail"
                      onClick={(e) => {
                        e.stopPropagation();
                        selectThumbnail(i);
                      }}
                    ></div>
                  );
                } else {
                  return (
                    <div
                      key={i}
                      style={{ backgroundImage: `url(${photo.thumbnail_url})` }}
                      className="ig-thumbnail"
                      onClick={(e) => {
                        e.stopPropagation();
                        selectThumbnail(i);
                      }}
                    ></div>
                  );
                }
              }
            })}
            <div className="thumbnail-chevron-container">
              {photos.length > thumbnailRange[1] ? (
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="ig-nav"
                  size="lg"
                  fixedWidth
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollThumbnails(1);
                  }}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
          <div id="image-nav-container">
            <div id="image-nav-expand-container">
              <FontAwesomeIcon
                icon={faExpand}
                className="ig-nav"
                size="lg"
                fixedWidth
              />
            </div>
            <div id="image-nav-chevron-container">
              {activeImageIndex > 0 ? (
                <FontAwesomeIcon
                  icon={faCircleChevronLeft}
                  className="ig-nav"
                  size="lg"
                  fixedWidth
                  onClick={(e) => {
                    e.stopPropagation();
                    updateActivePhotoIndex(-1);
                  }}
                />
              ) : (
                <span></span>
              )}
              {activeImageIndex === photos.length - 1 ? (
                <></>
              ) : (
                <FontAwesomeIcon
                  icon={faCircleChevronRight}
                  className="ig-nav"
                  size="lg"
                  fixedWidth
                  onClick={(e) => {
                    e.stopPropagation();
                    updateActivePhotoIndex(1);
                  }}
                />
              )}
            </div>
            <div></div>
          </div>
        </section>
      );
    } else if (expandedView === true) {
      return (
        <section
          className="image-gallery"
          id="image-gallery-expanded"
          style={{ backgroundImage: `url(${photos[activeImageIndex].url})` }}
          onClick={toggleZoomedView}
          ref={boundsRef}
          onLoad={(e) => setBounds(getBounds(e))}
        >
          {zoomedMode ? (
            <ImageZoom
              photoURL={currentPhotoURL}
              setPhotoURL={setCurrentPhotoURL}
              toggleZoomedView={toggleZoomedView}
              bounds={bounds}
            />
          ) : (
            <>
              <div id="expanded-image-icon-container">
                {photos.map((photo, i) => {
                  if (i === activeImageIndex) {
                    return (
                      <FontAwesomeIcon
                        key={i}
                        icon={faSquare}
                        className="ig-icons"
                        size="xs"
                        style={{ color: "rgba(255, 255, 255, 0.9)" }}
                        fixedWidth
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      />
                    );
                  } else {
                    return (
                      <FontAwesomeIcon
                        key={i}
                        icon={faSquare}
                        className="ig-icons"
                        size="xs"
                        fixedWidth
                        onClick={(e) => {
                          e.stopPropagation();
                          selectThumbnail(i);
                        }}
                      />
                    );
                  }
                })}
              </div>
              <div id="expanded-nav-container">
                <div id="expanded-nav-minimize-container">
                  <FontAwesomeIcon
                    icon={faExpand}
                    className="ig-nav"
                    size="lg"
                    fixedWidth
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpandedView();
                    }}
                  />
                </div>
                <div id="expanded-nav-chevron-container">
                  {activeImageIndex > 0 ? (
                    <FontAwesomeIcon
                      icon={faCircleChevronLeft}
                      className="ig-nav"
                      size="lg"
                      fixedWidth
                      onClick={(e) => {
                        e.stopPropagation();
                        updateActivePhotoIndex(-1);
                      }}
                    />
                  ) : (
                    <span></span>
                  )}
                  {activeImageIndex === photos.length - 1 ? (
                    <></>
                  ) : (
                    <FontAwesomeIcon
                      icon={faCircleChevronRight}
                      className="ig-nav"
                      size="lg"
                      fixedWidth
                      onClick={(e) => {
                        e.stopPropagation();
                        updateActivePhotoIndex(1);
                      }}
                    />
                  )}
                </div>
                <div></div>
              </div>
            </>
          )}
        </section>
      );
    }
  } else {
    return <section className="image-gallery"></section>;
  }
};

export default ImageGallery;
