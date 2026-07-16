# Multi-step form

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
