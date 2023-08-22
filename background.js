import subsrt from "subsrt";

const wr = browser.webRequest;

const defaultLocale = "en-US";
let locale = defaultLocale;

const addPipSubs = (subInfo) => { };

const doAThing = (requestDetails) => {
  const url = new URL(requestDetails.url);
  // console.log(url);

  if ("locale" in url.searchParams) {
    locale = url.searchParams["locale"];
    // console.log(locale);
  }

  if (url.pathname.endsWith("play")) {
    // console.log(requestDetails);
    let filter = wr.filterResponseData(requestDetails.requestId);
    let str = "";
    filter.ondata = (event) => {
      const data = event.data;
      str += new TextDecoder().decode(data);
      filter.write(event.data);
    };
    filter.onstop = () => {
      if (str) {
        const playInfo = JSON.parse(str);
        // console.log(playInfo);
        const subInfo =
          locale in playInfo.subtitles
            ? playInfo.subtitles[locale]
            : playInfo.subtitles[defaultLocale];
        addPipSubs(subInfo);
      }
      filter.close();
    };
  }
};

wr.onBeforeRequest.addListener(
  doAThing,
  {
    urls: ["<all_urls>"],
  },
  ["blocking"]
);
