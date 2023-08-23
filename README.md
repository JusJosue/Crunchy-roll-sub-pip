# spicyroll - force crunchyroll to use hardsubs

it's named this way because...

hardsub -\> burned-in subs -\> fire -\> spicy

![before and after example showing bocchi the rock played with softsubs
on left and hardsubs on right](./img/example.png)

### warning: using this is _probably_ against Crunchyroll TOS. i also offer no guarantee it will continue to work. you have been warned

I wanted to use picture-in-picture mode to watch anime on Crunchyroll
while doing other stuff. Unfortunately, due to the way Crunchyroll
displays subs on their site, subtitles wouldn't show on the PIP window,
and the Firefox developers have not yet written an adapter for the subs
on Crunchyroll.

When investigating to see how I could work around this, I found the JSON
file that provides the links for a given video stream and its subs.
While my initial plan was to convert CR's provided subfile to WebVTT,
then inject those onto the video player, I noticed a "hardsub" section
on the file. Apparently, this is used to display subs in the mobile
apps. Could I simply tell the player to use the hardsub stream instead
of the regular one, and to ignore softsubs entirely? Yes, yes I could.

I hacked together most of the functionality in a few hours, so a lot of
stuff is _very_ janky. I've never written a browser extension before, so
this was also a fun learning experience for me!

When switching subtitles, Widevine gets triggered (perhaps
unsurprisingly), so the second toggle in the extension popup is to
automatically refresh the page when switching subs. This should work
when logged in, but _does not work when logged out_, from my testing. If
logged out, disable "force hardsub" before switching languages.

I also have not tested this with audio languages other than Japanese. I
have no clue if it will work or not in other cases. This very much was a
hack done to solve a personal problem, not for widespread public usage.
(I'm still probably publishing it in case others may need it, though,
and have close to my exact use case).
