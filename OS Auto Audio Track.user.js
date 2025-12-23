// ==UserScript==
// @name         OS Auto Audio Track
// @namespace    http://tampermonkey.net/
// @version      2025-12-16
// @description  This is a userscript that allows for limitless audio customization within the OS sequencer by allowing the use of Audio Tracks to be automatically set upon site load. DISCLAIMER: IN ORDER FOR THIS TO WORK THE PEOPLE LISTENING WILL NEED T
// @author       Lastie
// @match        https://*.onlinesequencer.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=onlinesequencer.net
// @grant        none
// ==/UserScript==

(function () {
	/**
	 * Fetches an audio file from a URL and feeds the resulting ArrayBuffer
	 * into your decoding function (`this.loadAudioTrack`).
	 */
	async function fetchAndDecodeAudio(audioUrl, onLoad) {
		try {
			const response = await fetch(audioUrl);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const arrayBuffer = await response.arrayBuffer();

			console.log(arrayBuffer);
			audioSystem.loadAudioTrack(
				arrayBuffer);
			$("#wavesurfer_element").toggle();
		} catch (error) {
			console.error("Error fetching or decoding audio:", error);
		}
	}

	let trackLink;

	// Use 'DOMContentLoaded' for the document object
	document.addEventListener("DOMContentLoaded", () => {
		const allDescLinks = document.querySelector('#info-sidebar-description-text').querySelectorAll("a");

		// Check if any elements were actually found to avoid errors
			const trackLink = allDescLinks[allDescLinks.length - 1].href;

			console.log(trackLink);

			showAudioTrackSelect();
			console.log("trackSelectWork");

			fetchAndDecodeAudio(trackLink);
	});
})();
