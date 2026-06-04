import type { ImgHTMLAttributes } from "react";

type PictureSource = {
  img: { src: string; w?: number; h?: number };
  sources: Record<string, string>;
};

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  picture: PictureSource | string;
  alt: string;
  priority?: boolean;
};

/**
 * Renders <picture> with AVIF/WebP/JPG sources from vite-imagetools `?optimize&as=picture`.
 * Falls back to a plain <img> if a string URL is passed.
 */
export function OptimizedImage({ picture, alt, priority, className, width, height, ...rest }: Props) {
  if (typeof picture === "string") {
    return (
      <img
        src={picture}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={className}
        width={width}
        height={height}
        {...rest}
      />
    );
  }

  return (
    <picture>
      {Object.entries(picture.sources).map(([type, srcSet]) => {
        const mime = type.includes("/") ? type : `image/${type}`;
        return <source key={type} type={mime} srcSet={srcSet} />;
      })}
      <img
        src={picture.img.src}
        width={width ?? picture.img.w}
        height={height ?? picture.img.h}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={className}
        {...rest}
      />
    </picture>
  );
}
