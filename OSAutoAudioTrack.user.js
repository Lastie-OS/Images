// ==UserScript==
// @name OS Auto Audio Track [LATEST]
// @version 2025-12-16
// @description Allows for limitless audio customization within the OS sequencer by allowing the use of Audio Tracks to be automatically set upon site load.
// @author Lastie
// @match https://*.onlinesequencer.net/*
// @icon https://www.google.com/s2/favicons?sz=64&domain=onlinesequencer.net
// @grant none
// ==/UserScript==

(function () {
    'use strict';

    async function fetchAndDecodeAudio(audioUrl) {
        try {
            console.log("Trying to fetch URL:", audioUrl);
            const response = await fetch(audioUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const arrayBuffer = await response.arrayBuffer();
            console.log("ArrayBuffer received:", arrayBuffer);

            // Ensure audioSystem is defined before calling
            if (typeof audioSystem !== 'undefined') {
                audioSystem.loadAudioTrack(arrayBuffer);
                $("#wavesurfer_element").toggle();
            } else {
                console.error("audioSystem not found.");
            }
        } catch (error) {
            console.error("Error fetching or decoding audio:", error);
        }
    }

    function initializeTrack() {
        const descriptionBox = document.querySelector('#info-sidebar-description-text');
        if (!descriptionBox) return false; 

        const allDescLinks = descriptionBox.querySelectorAll("a");
        if (allDescLinks.length === 0) return false;

        const trackLink = allDescLinks[allDescLinks.length - 1].href;
        console.log("Found track link:", trackLink);

        showAudioTrackSelect();
        fetchAndDecodeAudio(trackLink);
        
        return true;
    }

    const observer = new MutationObserver((mutations, obs) => {
        const element = document.querySelector('#info-sidebar-description-text');
        
        if (element) {
            const success = initializeTrack();
            if (success === true) {
                obs.disconnect();
            }
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
