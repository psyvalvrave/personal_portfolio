//src/components/Tool/imageModal.jsx
import React from "react";
import ReactDOM from "react-dom";
import Image from "next/image";

const ImageModal = ({ isOpen, onClose, imageSrc }) => {
    if (!isOpen) {
        return null;
    }
    return ReactDOM.createPortal(
        <div
        onClick={onClose}
        className="fixed top-0 left-0 w-full h-full bg-black/80 flex justify-center items-center z-50 pointer-events-auto"
        >
            <div className="relative">
                <div className="relative w-[90vw] h-[90vh] max-w-[90vw] max-h-[90vh]">
                    <Image
                        src={imageSrc}
                        alt="Full Size"
                        fill
                        className="object-contain"
                        priority
                        sizes="90vw"
                    />
                </div>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-transparent border-none text-white text-4xl cursor-pointer hover:text-purple-400 hover:scale-150 transition transform duration-200 ease-in-out"
                >
                    &times;
                </button>
            </div>
        </div>,
        document.body
    );
};

export default ImageModal;
