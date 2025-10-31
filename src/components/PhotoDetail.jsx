import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPhotoById, getFullSizeUrl } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const PhotoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPhotoDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const photoData = await fetchPhotoById(id);
        setPhoto(photoData);
      } catch (err) {
        setError('Failed to load photo details. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPhotoDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-bg">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-bg">
        <div className="text-center">
          <p className="text-text text-xl mb-6 font-light">{error}</p>
          <button
            onClick={() => navigate('/photos')}
            className="px-8 py-3 bg-accent text-accent-contrast rounded-full hover:opacity-90 transition-opacity font-medium"
          >
            Back to Gallery
          </button>
        </div>
      </div>
    );
  }

  if (!photo) {
    return null;
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12 max-w-6xl">
        {/* Navigation */}
        <button
          onClick={() => navigate('/photos')}
          className="mb-12 flex items-center text-text hover:text-accent transition-colors group"
        >
          <svg 
            className="w-6 h-6 mr-3 group-hover:-translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          <span className="font-light text-lg">Back to Gallery</span>
        </button>

        {/* Photo Details */}
        <div className="bg-surface rounded-[32px] shadow-soft overflow-hidden">
          <div className="relative">
            <img
              src={getFullSizeUrl(photo.id, 1400, 900)}
              alt={`Photo by ${photo.author}`}
              className="w-full h-auto max-h-[75vh] object-contain bg-bg/30"
            />
          </div>
          
          <div className="p-8 md:p-12 lg:p-16 space-y-10">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-text mb-4 tracking-tight">
                {photo.author}
              </h1>
              <p className="text-muted text-lg font-light">
                Photo ID: {photo.id}
              </p>
            </div>

            <div className="border-t border-text/10 pt-8">
              <h2 className="text-2xl font-light text-text mb-6 tracking-wide">Photo Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-sm text-muted mb-2 uppercase tracking-wider font-light">Author</p>
                  <p className="text-xl font-light text-text">{photo.author}</p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-2 uppercase tracking-wider font-light">Dimensions</p>
                  <p className="text-xl font-light text-text">
                    {photo.width} × {photo.height}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-text/10 pt-8">
              <h2 className="text-2xl font-light text-text mb-6 tracking-wide">Description</h2>
              <p className="text-muted text-lg font-light leading-relaxed max-w-3xl">
                {photo.description || 'A beautiful image from Lorem Picsum, carefully curated to inspire creativity and showcase the art of visual storytelling. Each photograph in our collection represents a unique perspective and moment captured in time.'}
              </p>
            </div>

            <div className="border-t border-text/10 pt-8">
              <h2 className="text-2xl font-light text-text mb-6 tracking-wide">Source</h2>
              <a
                href={photo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80 text-lg font-light transition-colors inline-block"
              >
                View original on Unsplash →
              </a>
            </div>

            <div className="border-t border-text/10 pt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={photo.download_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-accent text-accent-contrast rounded-full hover:opacity-90 transition-opacity font-medium text-center"
              >
                Download Full Size
              </a>
              <button
                onClick={() => navigate('/photos')}
                className="inline-block px-8 py-4 bg-bg border border-text/10 text-text rounded-full hover:bg-text/5 transition-colors font-light text-center"
              >
                View More Photos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetail;
