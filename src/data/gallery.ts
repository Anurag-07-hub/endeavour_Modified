export interface GalleryItem {
  id: string;
  type: 'image' | 'video' | 'empty';
  url: string;
}

export const defaultGallery: GalleryItem[] = [
  { id: "img-0", type: "image", url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=80" },
  { id: "img-1", type: "image", url: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1000&q=80" },
  { id: "img-2", type: "image", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=80" },
  { id: "img-3", type: "image", url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&q=80" },
  { id: "img-4", type: "image", url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1000&q=80" },
  { id: "img-5", type: "image", url: "https://images.unsplash.com/photo-1506765515384-028b60a970df?w=1000&q=80" },
  { id: "img-6", type: "image", url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1000&q=80" },
  { id: "img-7", type: "image", url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1000&q=80" },
  { id: "img-8", type: "image", url: "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?w=1000&q=80" },
  { id: "img-9", type: "image", url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1000&q=80" },
  { id: "img-10", type: "image", url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&q=80" },
  { id: "img-11", type: "image", url: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=1000&q=80" },
  { id: "img-12", type: "image", url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1000&q=80" },
  { id: "img-13", type: "image", url: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1000&q=80" },
  { id: "img-14", type: "image", url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1000&q=80" },
  { id: "img-15", type: "image", url: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=1000&q=80" },
  { id: "img-16", type: "image", url: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1000&q=80" },
  { id: "img-17", type: "image", url: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=1000&q=80" },
  { id: "img-18", type: "image", url: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=1000&q=80" },
  { id: "img-19", type: "image", url: "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=1000&q=80" }
];
