/// <reference types="vite/client" />
/// <reference types="vite-imagetools/client" />

declare module "*?optimize&as=picture" {
  const value: {
    img: { src: string; w: number; h: number };
    sources: Record<string, string>;
  };
  export default value;
}
