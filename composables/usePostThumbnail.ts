export const usePostThumbnail = () => {
  const hasThumbnail = (post: any): boolean => {
    if (!post) return false;
    // Explicit metadata thumbnail takes precedence
    if (post.thumbnail) return true;
    if (post.image || post.cover) return true;
    if (post.body && post.body.children) {
      if (post.body.children.some((c: any) => c.tag === 'img')) return true;
      if (post.body.children.some((c: any) => c.tag === 'p' && c.children && c.children.some((child: any) => child.tag === 'img'))) return true;
    }
    return false;
  }

  const getThumbnail = (post: any): string => {
    if (!post) return '/face.jpg';
    // Explicit metadata thumbnail takes precedence
    if (post.thumbnail) return post.thumbnail;
    if (post.image) return post.image;
    if (post.cover) return post.cover;
    
    if (post.body && post.body.children) {
      // Look for a direct img tag
      const firstImg = post.body.children.find((c: any) => c.tag === 'img');
      if (firstImg && firstImg.props && firstImg.props.src) return firstImg.props.src;

      // Look for an img tag inside a paragraph (common in markdown)
      const firstParaWithImg = post.body.children.find((c: any) => 
        c.tag === 'p' && c.children && c.children.find((child: any) => child.tag === 'img')
      );
      
      if (firstParaWithImg) {
        const img = firstParaWithImg.children.find((child: any) => child.tag === 'img');
        if (img && img.props && img.props.src) return img.props.src;
      }
    }
    
    return '/face.jpg'; // Fallback
  };

  return {
    hasThumbnail,
    getThumbnail
  }
}
