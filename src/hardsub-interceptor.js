const wr = browser.webRequest;

const defaultLocale = "en-US";
let locale = defaultLocale;

// because it's substituting the subtitles! get it? get it? get it?
const subSub = (requestDetails) => {
  const url = new URL(requestDetails.url);
  // console.log(url);

  // there's prob a neater way to do this, but this works for now
  if ("locale" in url.searchParams) {
    locale = url.searchParams["locale"];
    // console.log(locale);
  }

  if (
    url.host == "cr-play-service.prd.crunchyrollsvc.com" &&
    url.pathname.endsWith("play") &&
    requestDetails.method == "GET"
  ) {
    // console.log(requestDetails);
    const filter = wr.filterResponseData(requestDetails.requestId);
    const dataArr = [];
    filter.ondata = (event) => {
      dataArr.push(event.data);
    };
    filter.onstop = async () => {
      // console.log(dataArr);
      if (dataArr.length == 0) {
        filter.close();
        return;
      }
      const blob = new Blob(dataArr);
      const info = JSON.parse(await blob.text());
      console.log("captured play info");

      const origUrl = info.url;
      const hardsubInfo =
        locale in info.hardSubs
          ? info.hardSubs[locale]
          : info.hardSubs[defaultLocale];
      const newUrl = hardsubInfo.url;
      console.log(`locale: ${locale}; fallback: ${defaultLocale}`);
      console.log(`changing video url from ${origUrl} to ${newUrl}`);
      info.url = newUrl;
      console.log("stripping subtitle data");
      info.subtitles = {};

      const data = new TextEncoder().encode(JSON.stringify(info));
      filter.write(data);
      filter.close();
    };
  }
};

wr.onBeforeRequest.addListener(
  subSub,
  {
    urls: ["<all_urls>"],
  },
  ["blocking"]
);
