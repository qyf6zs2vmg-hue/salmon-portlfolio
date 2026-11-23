import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ResilientImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackBg?: string;
  fallbackTitle?: string;
  loading?: 'eager' | 'lazy';
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackBg = '#EFEAE1',
  fallbackTitle,
  loading = 'eager',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        style={{ backgroundColor: fallbackBg }}
        className={`flex flex-col items-center justify-center p-6 text-center select-none ${className}`}
      >
        <ImageOff className="w-6 h-6 opacity-40 mb-2" aria-hidden="true" />
        <span className="font-display text-sm font-semibold opacity-75">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
