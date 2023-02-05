const c = new CommandPal({
  hotkey: "ctrl+space",
  commands: [
    {
      name: "Toggle Dark/Light Theme",
      shortcut: "ctrl+1",
      handler: () => {
        const stylecp = document.getElementById("cp-theme-css");
        const styleapp = document.getElementById("app-theme-css");
        const isDark = stylecp.href.includes("dark");
        if (isDark) {
          stylecp.href = "../theme-light.css";
          styleapp.href =
            "https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/light.min.css";
        } else {
          stylecp.href = "../theme-dark.css";
          styleapp.href =
            "https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/dark.min.css";
        }
      },
    },
    {
      name: "> Change Language",
      shortcut: "ctrl+shift+l",
      children: [
        { name: "Abkhaz" },
        { name: "Afar" },
        { name: "Afrikaans" },
        { name: "Akan" },
        { name: "Albanian" },
        { name: "Amharic" },
        { name: "Arabic" },
        { name: "Aragonese" },
        { name: "Armenian" },
        { name: "Assamese" },
        { name: "Avaric" },
        { name: "Avestan" },
        { name: "Aymara" },
        { name: "Azerbaijani" },
        { name: "Bambara" },
        { name: "Bashkir" },
        { name: "Basque" },
        { name: "Belarusian" },
        { name: "Bengali" },
        { name: "Bihari" },
        { name: "Bislama" },
        { name: "Bosnian" },
        { name: "Breton" },
        { name: "Bulgarian" },
        { name: "Burmese" },
        { name: "Catalan; Valencian" },
        { name: "Chamorro" },
        { name: "Chechen" },
        { name: "Chichewa; Chewa; Nyanja" },
        { name: "Chinese" },
        { name: "Chuvash" },
        { name: "Cornish" },
        { name: "Corsican" },
        { name: "Cree" },
        { name: "Croatian" },
        { name: "Czech" },
        { name: "Danish" },
        { name: "Divehi; Dhivehi; Maldivian;" },
        { name: "Dutch" },
        { name: "English" },
        { name: "Esperanto" },
        { name: "Estonian" },
        { name: "Ewe" },
        { name: "Faroese" },
        { name: "Fijian" },
        { name: "Finnish" },
        { name: "French" },
        { name: "Fula; Fulah; Pulaar; Pular" },
        { name: "Galician" },
        { name: "Georgian" },
        { name: "German" },
        { name: "Greek, Modern" },
        { name: "Guaraní" },
        { name: "Gujarati" },
        { name: "Haitian; Haitian Creole" },
        { name: "Hausa" },
        { name: "Hebrew" },
        { name: "Hebrew" },
        { name: "Herero" },
        { name: "Hindi" },
        { name: "Hiri Motu" },
        { name: "Hungarian" },
        { name: "Interlingua" },
        { name: "Indonesian" },
        { name: "Interlingue" },
        { name: "Irish" },
        { name: "Igbo" },
        { name: "Inupiaq" },
        { name: "Ido" },
        { name: "Icelandic" },
        { name: "Italian" },
        { name: "Inuktitut" },
        { name: "Japanese" },
        { name: "Javanese" },
        { name: "Kalaallisut, Greenlandic" },
        { name: "Kannada" },
        { name: "Kanuri" },
        { name: "Kashmiri" },
        { name: "Kazakh" },
        { name: "Khmer" },
        { name: "Kikuyu, Gikuyu" },
        { name: "Kinyarwanda" },
        { name: "Kirghiz, Kyrgyz" },
        { name: "Komi" },
        { name: "Kongo" },
        { name: "Korean" },
        { name: "Kurdish" },
        { name: "Kwanyama, Kuanyama" },
        { name: "Latin" },
        { name: "Luxembourgish, Letzeburgesch" },
        { name: "Luganda" },
        { name: "Limburgish, Limburgan, Limburger" },
        { name: "Lingala" },
        { name: "Lao" },
        { name: "Lithuanian" },
        { name: "Luba-Katanga" },
        { name: "Latvian" },
        { name: "Manx" },
        { name: "Macedonian" },
        { name: "Malagasy" },
        { name: "Malay" },
        { name: "Malayalam" },
        { name: "Maltese" },
        { name: "Māori" },
        { name: "Marathi (Marāṭhī)" },
        { name: "Marshallese" },
        { name: "Mongolian" },
        { name: "Nauru" },
        { name: "Navajo, Navaho" },
        { name: "Norwegian Bokmål" },
        { name: "North Ndebele" },
        { name: "Nepali" },
        { name: "Ndonga" },
        { name: "Norwegian Nynorsk" },
        { name: "Norwegian" },
        { name: "Nuosu" },
        { name: "South Ndebele" },
        { name: "Occitan" },
        { name: "Ojibwe, Ojibwa" },
        {
          name:
            "Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic",
        },
        { name: "Oromo" },
        { name: "Oriya" },
        { name: "Ossetian, Ossetic" },
        { name: "Panjabi, Punjabi" },
        { name: "Pāli" },
        { name: "Persian" },
        { name: "Polish" },
        { name: "Pashto, Pushto" },
        { name: "Portuguese" },
        { name: "Quechua" },
        { name: "Romansh" },
        { name: "Kirundi" },
        { name: "Romanian, Moldavian, Moldovan" },
        { name: "Russian" },
        { name: "Sanskrit (Saṁskṛta)" },
        { name: "Sardinian" },
        { name: "Sindhi" },
        { name: "Northern Sami" },
        { name: "Samoan" },
        { name: "Sango" },
        { name: "Serbian" },
        { name: "Scottish Gaelic; Gaelic" },
        { name: "Shona" },
        { name: "Sinhala, Sinhalese" },
        { name: "Slovak" },
        { name: "Slovene" },
        { name: "Somali" },
        { name: "Southern Sotho" },
        { name: "Spanish; Castilian" },
        { name: "Sundanese" },
        { name: "Swahili" },
        { name: "Swati" },
        { name: "Swedish" },
        { name: "Tamil" },
        { name: "Telugu" },
        { name: "Tajik" },
        { name: "Thai" },
        { name: "Tigrinya" },
        { name: "Tibetan Standard, Tibetan, Central" },
        { name: "Turkmen" },
        { name: "Tagalog" },
        { name: "Tswana" },
        { name: "Tonga (Tonga Islands)" },
        { name: "Turkish" },
        { name: "Tsonga" },
        { name: "Tatar" },
        { name: "Twi" },
        { name: "Tahitian" },
        { name: "Uighur, Uyghur" },
        { name: "Ukrainian" },
        { name: "Urdu" },
        { name: "Uzbek" },
        { name: "Venda" },
        { name: "Vietnamese" },
        { name: "Volapük" },
        { name: "Walloon" },
        { name: "Welsh" },
        { name: "Wolof" },
        { name: "Western Frisian" },
        { name: "Xhosa" },
        { name: "Yiddish" },
        { name: "Yoruba" },
        { name: "Zhuang, Chuang" },
      ],
    },
    {
      name: "Goto About",
      shortcut: "ctrl+d",
      handler: () => (window.location.hash = "about"),
    },
    {
      name: "Destroy Instance",
      handler: () => {
        if (confirm('Shutdown command-pal instance?'))
          c.destroy();
      },
    },
  ],
});
c.start();
c.subscribe("exec", (e) => {
  console.log("exec", { e });
  document.getElementById("output").innerText += "\n" + e.name;
});
c.subscribe("textChanged", (e) => {
  console.log("textChanged", { e });
});
c.subscribe("opened", (e) => console.log("opened", { e }));
c.subscribe("closed", (e) => console.log("closed", { e }));

// AFTER LOAD

const exampleHead = document.getElementById("cp-head").innerHTML;
const exampleCode = document.getElementById("cp-body").innerHTML;

const exampleDoc = `<html>
<head>${exampleHead}</head>
<body>${exampleCode}</body>
</html>`

const highlighted = hljs.highlightAuto(exampleDoc);
console.log({ highlighted });
const codeOutput = document.getElementById("cp-code-show");
codeOutput.innerHTML = highlighted.value;
