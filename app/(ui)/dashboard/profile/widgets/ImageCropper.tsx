import { useRef, useState } from "react";
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import setCanvasPreview from "@/app/(ui)/dashboard/profile/utils/setCanvasPreview";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

export default function ImageCropper({ updateAvatar = '', closeModal }: { updateAvatar?: any, closeModal: any }) {
  const imgRef = useRef<any>(null);
  const previewCanvasRef = useRef<any>(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState<any>();
  const [error, setError] = useState("");

  const onSelectFile = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e: any) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150 x 150 pixels.");
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e: any) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const initialCrop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(initialCrop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <>
      <label className="block mb-3 w-fit">
        <span className="sr-only text-lg">Choose profile photo</span>
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="
            block
            w-full
            file:text-base
            text-slate-500
            file:cursor-pointer
            file:mr-4
            file:py-1
            file:px-4
            file:rounded-full
            file:border-0
            file:font-semibold
            file:text-primaryDarkColor
            file:bg-slate-200
            hover:file:text-white
            hover:file:bg-primaryDarkColor
            dark:file:text-sky-300
            dark:file:bg-gray-700
            dark:hover:file:bg-gray-600
          "
        />
      </label>
      {error && <p className="text-red-400 text-lg">{error}</p>}
      {imgSrc && (
        <div className="flex flex-col items-center">
          <ReactCrop
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ maxHeight: "70vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <button
            className="text-white font-mono text-sm py-2 px-4 rounded-2xl mt-4 bg-sky-500 hover:bg-sky-600"
            onClick={() => {
              if (imgRef.current) {
                const pixelCrop = convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height);
                setCanvasPreview(imgRef.current, previewCanvasRef.current, pixelCrop);
              }
              if (!previewCanvasRef.current) return;
              const dataUrl = previewCanvasRef.current.toDataURL();
              updateAvatar(dataUrl);
              closeModal();
            }}
          >
            Crop Image
          </button>
        </div>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}
        />
      )}
    </>
  );
}
