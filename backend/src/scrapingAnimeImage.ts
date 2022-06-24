import axios from "axios";
import { JSDOM } from "jsdom";


type OGPImage = {
    "og:image": string
}

export async function scrapingAnimeImage(url: string): Promise<OGPImage> {
    const res = await axios(url, {
        headers: {'User-Agent': 'bot'}
    });

    const html = await res.data;
    const dom = new JSDOM(html);

    const meta = dom.window.document.head.querySelectorAll('meta') as unknown as HTMLMetaElement[];

    const ogp = extractOgp([...meta]);

    return {
        "og:image": ogp["og:image"] ?? ''
    }
}

// HTMLのmetaタグからogpを抽出
function extractOgp(metaElements: HTMLMetaElement[]) {
    const ogp = metaElements
      .filter((element) => element.hasAttribute("property"))
      .reduce((previous: any, current: Element) => {
        const property = current.getAttribute("property")?.trim();
        if (!property) {
            return;
        }

        const content = current.getAttribute("content");
        previous[property] = content;
        
        return previous;
      }, {});
  
    return ogp;
}