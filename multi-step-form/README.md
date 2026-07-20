# Multi-step form

Formularz wieloetapowy (Vite + React + Tailwind): Your info → Select plan → Add-ons → Summary,
z walidacją blokującą przejście do kolejnego kroku, dopóki bieżący nie jest poprawnie wypełniony.

## Struktura

```
src/
├── main.jsx / index.css
├── App.jsx                       # stan formularza, nawigacja między krokami, walidacja
├── data/
│   └── content.js                 # etykiety kroków, plany, add-ony
└── components/
    ├── Sidebar.jsx                 # lewy panel z 4 krokami
    ├── steps/
    │   ├── StepYourInfo.jsx        # krok 1: imię, email, telefon
    │   ├── StepSelectPlan.jsx      # krok 2: wybór planu + toggle monthly/yearly
    │   ├── StepAddOns.jsx          # krok 3: opcjonalne dodatki (checkboxy)
    │   └── StepSummary.jsx         # krok 4: podsumowanie + suma
    └── ui/
        ├── FormField.jsx           # input z etykietą i komunikatem błędu
        ├── PlanCard.jsx            # karta pojedynczego planu
        └── AddOnItem.jsx           # wiersz pojedynczego dodatku

```

## Jak działa walidacja (kluczowe miejsce: `App.jsx`, funkcja `validateStep`)

- **Krok 1** — `name`, `email`, `phone` nie mogą być puste; `email` musi pasować do wzorca adresu,
  `phone` musi wyglądać jak numer telefonu (min. 8 znaków, tylko cyfry/spacje/myślniki, może zaczynać się od `+`).
- **Krok 2** — trzeba wybrać jeden z planów (`data.plan` nie może być pusty).
- **Krok 3** — brak walidacji, dodatki są opcjonalne.
- **Krok 4** — przycisk "Confirm" pokazuje ekran z podziękowaniem.

Przycisk **"Next Step"** wywołuje `goNext()`, który najpierw uruchamia `validateStep(step)`.
Jeśli walidacja się nie powiedzie, `setErrors(...)` ustawia komunikaty przy odpowiednich polach
i `setStep(...)` **nie jest wywoływane** — użytkownik zostaje na tym samym kroku.

## Instalacja i uruchomienie

```bash
cd multi-step-form
npm install
npm run dev
```

## Uwagi

- Kolory, plany („Arcade/Advanced/Pro") i dodatki to przykładowe dane — podmień w `src/data/content.js`.
- Dekoracyjne kształty w pasku bocznym są narysowane jako inline SVG w `Sidebar.jsx` (nie ma zależności
  od zewnętrznych plików graficznych).
