import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchPhotos } from '../services/api';
import PhotoCard from './PhotoCard';
import LoadingSpinner from './LoadingSpinner';

const PhotoGrid = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  
  const observer = useRef();
  const lastPhotoRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setLoading(true);
        setError(null);
        const newPhotos = await fetchPhotos(page, 30);
        
        if (newPhotos.length === 0) {
          setHasMore(false);
        } else {
          setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
        }
      } catch (err) {
        setError('Failed to load photos. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, [page]);

  if (error && photos.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-bg">
        <div className="text-center">
          <p className="text-text text-xl mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-accent text-accent-contrast rounded-full hover:opacity-90 transition-opacity font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Section */}
      <div className="mx-4 md:mx-8 lg:mx-16 mt-8 mb-12 p-12 md:p-16 lg:p-24">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-text mb-6 tracking-tight">
          Picsum Photo Gallery
        </h1>
        <p className="text-xl md:text-2xl text-muted font-light max-w-2xl leading-relaxed">
          A carefully selected collection of photography that speaks to the art of visual storytelling
        </p>
      </div>

      {/* Photo Grid */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {photos.map((photo, index) => {
            if (photos.length === index + 1) {
              return (
                <div ref={lastPhotoRef} key={photo.id}>
                  <PhotoCard photo={photo} />
                </div>
              );
            } else {
              return <PhotoCard key={photo.id} photo={photo} />;
            }
          })}
        </div>

        {loading && <LoadingSpinner />}
        
        {!hasMore && photos.length > 0 && (
          <div className="text-center py-12 mt-8">
            <p className="text-muted text-lg font-light">You've reached the end of our collection</p>
          </div>
        )}
        
        {error && photos.length > 0 && (
          <div className="text-center py-12 mt-8">
            <p className="text-text">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGrid;
