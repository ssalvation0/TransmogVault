import React, { useState, useEffect } from 'react';

/**
 * <img> with a fallback chain. Wowhead's model-viewer thumbnails 404 for a
 * subset of set IDs, so a single hardcoded src renders the browser's
 * broken-image icon. This walks `sources` in order (falsy entries skipped)
 * and renders `placeholder` once every candidate has failed.
 *
 * TransmogCard has its own inline version of this logic; this component
 * covers the other thumbnails (detail hero, similar sets, recently viewed).
 */
function FallbackImage({ sources, placeholder = null, alt = '', ...imgProps }) {
  const candidates = (sources || []).filter(Boolean);
  const [index, setIndex] = useState(0);

  // New image set (e.g. navigating between similar sets) → restart the chain.
  const chainKey = candidates.join('|');
  useEffect(() => { setIndex(0); }, [chainKey]);

  if (index >= candidates.length) return placeholder;

  return (
    <img
      src={candidates[index]}
      alt={alt}
      onError={() => setIndex(i => i + 1)}
      {...imgProps}
    />
  );
}

export default FallbackImage;
