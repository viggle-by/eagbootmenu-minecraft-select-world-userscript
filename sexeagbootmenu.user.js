// ==UserScript==
// @name         Eaglercraft Boot Menu - Minecraft Select World Theme (Custom Icons)
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  Reskins the Eaglercraft boot menu to look like Minecraft's Select World screen with dirt background, custom icons, and MC buttons.
// @author       You
// @match        https://eaglercraft.com/mc/1.8.8
// @grant        GM_addStyle
// ==/UserScript==

(function () {
    'use strict';

    const mcFont = 'https://fonts.cdnfonts.com/s/21240/Minecraftia.woff';
    const dirtBg = 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/c/c1/Dirt_background_JE2.png/revision/latest?cb=20210507124914';

    const icons = {
        "EaglercraftX 1.8 u53 (site origin)": "https://yt3.googleusercontent.com/gMVVQSSm8EFfBXD1-6L6CgeL0Gg7Cfy8_3dTy2p4DzeTiQn1ACVPG1CJK8--tVPNQC0n4FA7d5k=s900-c-k-c0x00ffffff-no-rj",
        "Import/Export": "https://cdn-icons-png.flaticon.com/512/60/60761.png",
        "Enter Setup": "https://cdn-icons-png.flaticon.com/512/84/84380.png",
        "Ayunclient on /dev/nvme22ayunclient (local storage, signed)": "https://github.com/viggle-by/eagbootmenu-minecraft-select-world-userscript/blob/main/s.png?raw=true"
    };

    GM_addStyle(`
        @font-face {
            font-family: 'Minecraftia';
            src: url('${mcFont}') format('woff');
        }

        html, body {
            background-image: url('${dirtBg}') !important;
            background-repeat: repeat;
            font-family: 'Minecraftia', monospace !important;
            color: #FFFFFF;
            margin: 0; padding: 0;
            height: 100%;
        }

        ._eaglercraftX_boot_menu_content_inner {
            width: 900px;
            margin: 40px auto;
            background-color: rgba(0, 0, 0, 0.6);
            border: 2px solid #555;
            padding: 30px 30px 10px 30px;
            box-shadow: 0 0 20px #000;
        }

        ._eaglercraftX_boot_menu_content_selection {
            display: flex;
            flex-direction: column;
            gap: 6px;
            margin-bottom: 20px;
        }

        ._eaglercraftX_boot_menu_content_item {
            display: flex;
            align-items: center;
            background-color: rgba(50, 50, 50, 0.85);
            border: 2px solid #AAA;
            padding: 10px 14px;
            margin: 2px 0;
            cursor: pointer;
            font-size: 14px;
            color: #FFF !important;
            text-shadow: 1px 1px #000;
            transition: background-color 0.2s;
        }

        ._eaglercraftX_boot_menu_content_item:hover {
            background-color: rgba(100, 100, 100, 0.9);
            color: #FFF !important;
        }

        ._eaglercraftX_boot_menu_content_item_selected {
            border-color: #FFD700;
            background-color: rgba(100, 100, 100, 0.95);
            color: #FFF !important;
        }

        ._eaglercraftX_boot_menu_content_item img {
            width: 32px;
            height: 32px;
            margin-right: 12px;
            image-rendering: pixelated;
            pointer-events: none;
            user-select: none;
        }

        .mc-buttons {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 20px;
        }

        .mc-button {
            background: linear-gradient(#8B8B8B, #4B4B4B);
            border: 2px solid #000;
            color: #FFF !important;
            font-family: 'Minecraftia';
            font-size: 12px;
            padding: 8px 20px;
            cursor: pointer;
            text-shadow: 1px 1px #000;
            transition: background 0.2s;
            user-select: none;
        }

        .mc-button:hover {
            background: linear-gradient(#AAAAAA, #666666);
            color: #FFF !important;
        }
    `);

    const waitForMenu = setInterval(() => {
        const container = document.querySelector('._eaglercraftX_boot_menu_content_inner');
        const items = document.querySelectorAll('p._eaglercraftX_boot_menu_content_item');

        if (container && items.length > 0) {
            clearInterval(waitForMenu);

            items.forEach(item => {
                const text = item.textContent.trim();
                const icon = icons[text];
                if (icon) {
                    if (!item.querySelector('img')) {
                        const iconImg = document.createElement('img');
                        iconImg.src = icon;
                        iconImg.alt = "icon";
                        iconImg.style.width = '32px';
                        iconImg.style.height = '32px';
                        iconImg.style.marginRight = '12px';
                        iconImg.style.imageRendering = 'pixelated';
                        item.prepend(iconImg);
                    }
                }
            });

            if (!document.querySelector('.mc-buttons')) {
                const buttonRow = document.createElement('div');
                buttonRow.className = 'mc-buttons';
                buttonRow.innerHTML = `
                    <button class="mc-button">Boot Selected World</button>
                    <button class="mc-button">Install New World</button>
                    <button class="mc-button">Edit [E]</button>
                    <button class="mc-button">Console [C]</button>
                    <button class="mc-button">Cancel</button>
                `;
                container.appendChild(buttonRow);
            }
        }
    }, 200);
})();
