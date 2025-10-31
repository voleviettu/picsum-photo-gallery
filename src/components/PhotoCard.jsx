import { Link } from 'react-router-dom';
import { getThumbnailUrl } from '../services/api';

const PhotoCard = ({ photo }) => {
  return (
    <Link 
      to={`/photos/${photo.id}`}
      className="group block overflow-hidden rounded-3xl hover:shadow-lg transition-all duration-500 bg-surface"
    >
      <div className="relative pb-[125%] overflow-hidden">
        <img
          src={getThumbnailUrl(photo.id, 600, 750)}
          alt={`Photo by ${photo.author}`}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
          loading="lazy"
        />
      </div>
      <div className="p-6 bg-surface">
        <p className="font-light text-base tracking-wide text-text">{photo.author}</p>
      </div>
    </Link>
  );
};

export default PhotoCard;
