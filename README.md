Aplikacja do dzielenia sie niepotrzebnymi rzeczami. 

## Instalacja

Instrukcje krok po kroku, jak zainstalować i uruchomić projekt lokalnie.


https://github.com/Jakubek93/oddajrzeczy.git

 Przejście do katalogu projektu
cd twoje-repozytorium

 Instalacja zależności
npm install
npm install react react-dom react-router-dom styled-components react-hook-form zod @hookform/resolvers @supabase/supabase-js

Uruchomienie projektu
npm start


Struktura plikow :
/oddajrzeczy
├── /node_modules
├── /public
│   ├── love.png
│   └── ...
├── /src
│   ├── /components
│   │   ├── /AboutService
│   │   │   ├── AboutService.jsx
│   │   │   └── AboutServiceStyle.js
│   │   ├── /AddItemModal
│   │   │   ├── AddItemModal.jsx
│   │   │   └── AddItemModalStyle.jsx
│   │   ├── /CommentSection
│   │   │   ├── CommentSection.jsx
│   │   │   └── CommentSectionStyle.jsx
│   │   ├── /EnlargedImage
│   │   │   ├── EnlargedImage.jsx
│   │   │   └── EnlargedImageStyle.jsx
│   │   ├── /Filters
│   │   │   ├── Filters.jsx
│   │   │   └── FiltersStyle.js
│   │   ├── /HomePage
│   │   │   ├── HomePage.jsx
│   │   │   └── HomePageStyle.jsx
│   │   ├── /ItemList
│   │   │   ├── ItemList.jsx
│   │   │   └── ItemListStyle.js
│   │   ├── /NavigationBar
│   │   │   ├── NavigationBar.jsx
│   │   │   └── NavigationBarStyle.js
│   │   ├── /SearchBar
│   │   │   ├── SearchBar.jsx
│   │   │   └── SearchBarStyle.js
│   │   ├── /SortOptions
│   │   │   ├── SortOptions.jsx
│   │   │   └── SortOptionsStyle.js
│   ├── /styles
│   │   ├── GlobalStyle.js
│   ├── /supabase
│   │   ├── supabase.js
│   ├── App.jsx
│   ├── index.js
│   └── ...
├── .gitignore
├── package.json
└── README.md
