import { useState, useEffect } from "react";
import Article from "./article";

export default function GetImages() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(
        `https://api.unsplash.com/photos?client_id=5WKXRgXXJGLDZv5_vJbbvaM7QrG_IVS15-KZap8mBIk`
      );
      const data = await response.json();
      console.log(data);
      setImages(data);
    };

    fetchImages();
  }, []);

  // useEffect(() => {
  //   if (images.length > 0) {
  //     const newImages = [...images]; // Membuat salinan array images
  //     newImages.pop(); // Menghapus elemen terakhir dari array baru
  //     setImages(newImages); // Mengupdate state dengan array baru
  //   }
  // }, [images]);

  return (
    <>
      <div id="Trending" className="container mx-auto px-5 2xl:px-0">
        <h2 className="text-slate-800 font-bold text-center text-2xl md:text-3xl lg:text-4xl my-10 lg:mt-20 lg:mb-14">
          Trending Today
        </h2>

        {!images ? (
          <div>
            <h1>Loading...</h1>
          </div>
        ) : (
          <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 pb-20 lg:container">
            {images.map((image) => (
              <Article key={image.id} {...image} />
            ))}
          </section>
        )}
      </div>
    </>
  );
}
