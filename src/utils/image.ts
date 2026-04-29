/**
 * 需要在导出前预加载的资源列表
 */
const IMAGE_PATHS = ["/mockup.png", "/app-icon.png"];
const imageCache: Record<string, string> = {};

/**
 * 预加载所有资源并将其转换为 Base64 Data URL 存入缓存
 * 为了使 html-to-image 正常工作并避免因网络问题导致的导出黑屏
 * @returns {Promise<void>} 
 */
export async function preloadAllImages(): Promise<void> {
  await Promise.all(
    IMAGE_PATHS.map(async (path) => {
      try {
        const resp = await fetch(path);
        const blob = await resp.blob();
        const dataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
        imageCache[path] = dataUrl;
      } catch {
        // 本地缺资源时保留原路径，方便开发时直接看到失败位置。
      }
    })
  );
}

/**
 * 获取图片 URL。优先从缓存中获取 Base64 的 Data URL，失败时使用原路径。
 * @param path 原始路径
 * @returns {string} 缓存 URL 或原路径
 */
export function img(path: string): string {
  return imageCache[path] || path;
}
