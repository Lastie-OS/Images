// ==UserScript==
// @name         OS Dropdown iOS Fix
// @version      12.23.25
// @description  A fix to the iOS OS editor dropdowns not working!
// @author       Lastie
// @match        https://*.onlinesequencer.net/*
// @icon         https://www.google.com/s2/favicons?sz=128&domain=onlinesequencer.net
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';
	
	const menuItems = [
		"#save-options",
		"#tools-menu"
	];

    function fixerUpper() {
        menuItems.forEach(selector => {
            // creative name ik
            let saveStuff = document.querySelector(selector);

            if (!saveStuff) {
                // check for element again in 500ms
                setTimeout(fixerUpper, 500);
                return;
            }


            if (saveStuff.getAttribute('data-fix-loaded')) return;

            let arrow = saveStuff.children[0];
            let dropdown = saveStuff.children[1];

            if (arrow && dropdown) {
                arrow.addEventListener("click", (e) => {
					// double trigger preventer thingy (im eating breakfast rn, dont judge me!)
                    e.preventDefault();
                    
                    if (dropdown.style.display !== "block") {
                        dropdown.style.display = "block";
                    } else {
                        dropdown.style.display = "none";
                    }
                });
                saveStuff.setAttribute('data-fix-loaded', 'true');
            }
        });
    }

    fixerUpper();
})();
